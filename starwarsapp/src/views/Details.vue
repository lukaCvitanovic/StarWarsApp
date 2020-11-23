<template>
  <div class="details">
    <app-header />
    <div class="content flex-h justify-center my-xl">
      <details-panel
        class="details-panel mt-xl"
        :error-msg="errorMsg"
        :name="name"
        :openingCrawl="openingCrawl"
        :relevant="relevant"
        :item-details="itemDetails" />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import DetailsPanel from '@/components/details/DetialsPanel.vue'
import api from '@/api/search.js'
import lodash from 'lodash'
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE } = searchOptions

const RELEVANT_CHARACTERS_LIMIT = 15
const DATA_SIZE_LIMIT = 20

export default {
  name: 'Details',
  data: () => ({
    name: '',
    openingCrawl: '',
    errorMsg: '',
    relevant: null,
    itemDetails: null
  }),
  methods: {
    async getDetails ({ params, fullPath }) {
      const { type, id } = params
      type === 'films'
        ? await this.getDetailsFilms({ type, id })
        : await this.getDetailsOthers(this.removeDetailsFromUrl(fullPath, type), type)
    },
    apiCall (url) {
      return new Promise((resolve, reject) => {
        api.get(url)
          .then(data => resolve(data))
          .catch(error => {
            this.errorMsg = error
            reject(error)
          })
      })
    },
    apiCallPeople (id) {
      return new Promise((resolve, reject) => {
        api.getPeopleById(id)
          .then(data => resolve(data))
          .catch(error => {
            this.errorMsg = error
            reject(error)
          })
      })
    },
    apiCallMovies (id) {
      return new Promise((resolve, reject) => {
        api.getMoviesById(id)
          .then(data => resolve(data))
          .catch(error => {
            this.errorMsg = error
            reject(error)
          })
      })
    },
    removeDetailsFromUrl (url, type) {
      return url.slice(url.search(type))
    },
    isUrl (string) {
      if (typeof string === 'string') {
        return string.search('http') !== -1
      } else return false
    },
    generatePath (url) {
      return url.slice(url.search('/api') + '/api'.length)
    },
    isFilm (url) {
      return url.search('films') !== -1
    },
    arrayToUrls (object) {
      const urls = []
      for (const item of object) {
        const [, value] = item
        if (typeof item === 'string') urls.push(item)
        else {
          if (typeof value === 'string') urls.push(value)
          else {
            for (const insance of value) urls.push(insance)
          }
        }
      }
      return urls
    },
    onlyArrays (array) {
      return array.reduce((acc, [, element]) => {
        if (typeof element === 'object') acc.push(element)
        return acc
      }, [])
    },
    onlyArraysAndRest (array) {
      const [onlyArray, rest] = array.reduce((acc, curent) => {
        const [onlyArray, rest] = acc
        const [key, element] = curent
        if (element === null) rest.push([key, 'null'])
        else {
          typeof element === 'object' || this.isUrl(element)
            ? onlyArray.push(element)
            : rest.push(curent)
        }
        return acc
      }, [[], []])
      return [lodash.flattenDeep(onlyArray), rest]
    },
    isTheSameUrl (url) {
      return this.generatePath(url) === this.removeDetailsFromUrl(this.$route.fullPath)
    },
    async formatRelevant (relevant) {
      const urls = this.arrayToUrls(relevant)
      return await Promise.all(urls.map(async url => {
        const key = url.search('films') !== -1
          ? 'title'
          : 'name'
        const { data } = await this.apiCall(this.generatePath(url))
        return [data[key], this.generatePath(url)]
      }))
    },
    async getDetailsOthers (path, type) {
      const { data } = await this.apiCall(path)
      if (this.relevant !== null) this.relevant = null
      if (this.itemDetails !== null) this.itemDetails = null
      let array = lodash.toPairs(data)
      array = lodash.dropRight(array, 3)
      let [tempRelevant, [[, name], ...rest]] = this.onlyArraysAndRest(array)
      this.name = name
      this.itemDetails = rest
      tempRelevant = await this.formatRelevant(tempRelevant)
      let relevant = await this.getRelevantForOthers(tempRelevant)
      relevant = lodash.shuffle(relevant)
      this.relevant = lodash.take(relevant, RELEVANT_CHARACTERS_LIMIT)
    },
    async getDetailsFilms ({ type, id }) {
      const { data } = type.toUpperCase() === PEOPLE
        ? await this.apiCallPeople(id)
        : await this.apiCallMovies(id)
      if (this.relevant !== null) this.relevant = null
      if (this.itemDetails !== null) this.itemDetails = null
      this.openingCrawl = data.opening_crawl
      this.$delete(data, 'opening_crawl')
      let array = lodash.toPairs(data)
      array = lodash.dropRight(array, 3)
      let [relevant, [[, name], ...rest]] = this.onlyArraysAndRest(array)
      this.name = name
      this.itemDetails = rest
      relevant = await this.formatRelevant(relevant)
      relevant = lodash.shuffle(relevant)
      this.relevant = lodash.take(relevant, RELEVANT_CHARACTERS_LIMIT)
    },
    async getRelevantForOthers (relevant) {
      let [dontGetRelevant, frstDegCahrs] = await relevant.reduce(async (acc, current) => {
        let tempAcc = await acc
        let [dont, first] = tempAcc
        const [, url] = current
        if (!this.isTheSameUrl(url)) {
          let { data } = await this.apiCall(url)
          data = lodash.flattenDeep(this.onlyArrays(lodash.toPairs(data)))
          if (!data.length) dont.push(current)
          else {
            if (data.length > DATA_SIZE_LIMIT) data = lodash.take(lodash.shuffle(data), DATA_SIZE_LIMIT)
            first = lodash.union(first, data)
          }
        }
        tempAcc = [dont, first]
        return tempAcc
      }, Promise.resolve([[], []]))
      dontGetRelevant = lodash.union(dontGetRelevant, relevant)
      frstDegCahrs = lodash.take(frstDegCahrs, RELEVANT_CHARACTERS_LIMIT)
      let chars = await Promise.all(frstDegCahrs.map(async url => {
        let name
        if (!this.isFilm(url)) {
          const { data } = await this.apiCall(url)
          name = data.name
        } else {
          const { data: { title } } = await this.apiCall(url)
          name = title
        }
        return [name, this.generatePath(url)]
      }))
      chars = lodash.unionWith(chars, dontGetRelevant, lodash.isEqual)
      console.log(chars)
      return chars
    }
  },
  watch: {
    $route: {
      async handler (route) {
        await this.getDetails(route)
        this.$forceUpdate()
      }
    }
  },
  async created () {
    await this.getDetails(this.$route)
  },
  components: {
    AppHeader,
    DetailsPanel
  }
}
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-grey-light);

  .content {
    width: 100%;
    padding-top: var(--header-height);
    padding-left: var(--spc-xl);
    padding-right: var(--spc-xl);

    .details-panel {
      width: 100%;
    }
  }
}
@media (min-width: 54rem) {
  .details .content {
    height: 100vh;
    margin: 0;

    .details-panel {
      width: var(--measure-l);
      min-height: 21.875rem;
      height: min-content;
    }
  }
}
</style>
