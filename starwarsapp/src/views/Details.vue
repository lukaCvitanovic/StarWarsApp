<template>
  <div class="details">
    <app-header />
    <div class="content flex-h align-center justify-center my-xl">
      <details-panel
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
import shuffle from 'lodash.shuffle'
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE } = searchOptions

const RELEVANT_CHARACTERS_LIMIT = 15
const DATA_SIZE_LIMIT = 20

export default {
  name: 'Details',
  data: () => ({
    name: '',
    openingCrawl: '',
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
    removeDetailsFromUrl (url, type) {
      return url.slice(url.search(type))
    },
    isUrl (string) {
      if (typeof string === 'string') {
        return string.search('http') !== -1
      } else return false
    },
    findReleventLimit (array) {
      let i = 0
      for (const [, value] of array) {
        if (typeof value === 'object' || this.isUrl(value)) return i
        i++
      }
      return array.length - 1
    },
    generatePath (url) {
      return url.slice(url.search('/api') + '/api'.length)
    },
    isFilm (url) {
      return url.search('films') !== -1
    },
    isFilmOrPlanet (url) {
      return this.isFilm(url) || url.search('planets') !== -1
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
        const [, element] = curent
        typeof element === 'object' || this.isUrl(element)
          ? onlyArray.push(element)
          : rest.push(curent)
        return acc
      }, [[], []])
      return [this.singleDepthArray(onlyArray), rest]
    },
    singleDepthArray (array) {
      return array.reduce((acc, curent) => {
        return acc.concat(curent)
      }, [])
    },
    checkForTheSame (checkArray, array) {
      const a = array.reduce((acc, curent) => {
        if (checkArray.includes(curent)) return acc
        else {
          acc.push(curent)
          return acc
        }
      }, [])
      return a
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
        const { data } = await api.get(this.generatePath(url))
        return [data[key], this.generatePath(url)]
      }))
    },
    async getDetailsOthers (path, type) {
      const { data } = await api.get(path)
      if (this.relevant !== null) this.relevant = null
      if (this.itemDetails !== null) this.itemDetails = null
      let array = Object.keys(data).map(key => ([key, data[key]]))
      array = array.slice(0, array.length - 3)
      let [tempRelevant, [[, name], ...rest]] = this.onlyArraysAndRest(array)
      this.name = name
      this.itemDetails = rest
      tempRelevant = await this.formatRelevant(tempRelevant)
      let relevant = await this.getRelevantForOthers(tempRelevant)
      relevant = shuffle(relevant)
      this.relevant = relevant.slice(0, RELEVANT_CHARACTERS_LIMIT)
    },
    async getDetailsFilms ({ type, id }) {
      const { data } = type.toUpperCase() === PEOPLE
        ? await api.getPeopleById(id)
        : await api.getMoviesById(id)
      if (this.relevant !== null) this.relevant = null
      if (this.itemDetails !== null) this.itemDetails = null
      this.openingCrawl = data.opening_crawl
      this.$delete(data, 'opening_crawl')
      let array = Object.keys(data).map(key => ([key, data[key]]))
      array = array.slice(0, array.length - 3)
      const limit = this.findReleventLimit(array)
      const [[, name], ...rest] = array.slice(0, limit)
      this.name = name
      this.itemDetails = rest
      let relevant = array.slice(limit)
      relevant = await this.formatRelevant(relevant)
      relevant = shuffle(relevant)
      this.relevant = relevant.slice(0, RELEVANT_CHARACTERS_LIMIT)
    },
    async getRelevantForOthers (relevant) {
      let dontGetRelevant = []
      let frstDegCahrs = []
      for (const item of relevant) {
        const [, url] = item
        if (!this.isTheSameUrl(url)) {
          let { data } = await api.get(url)
          data = this.singleDepthArray(this.onlyArrays(Object.entries(data)))
          if (!data.length) dontGetRelevant.push(item)
          else {
            if (data.length > DATA_SIZE_LIMIT) {
              data = shuffle(data).slice(0, DATA_SIZE_LIMIT)
            }
            frstDegCahrs = this.checkForTheSame(frstDegCahrs, data)
          }
        }
      }
      dontGetRelevant = this.checkForTheSame(dontGetRelevant, relevant)
      frstDegCahrs = frstDegCahrs.slice(0, RELEVANT_CHARACTERS_LIMIT)
      const chars = await Promise.all(frstDegCahrs.map(async url => {
        let name
        if (!this.isFilm(url)) {
          const { data } = await api.get(url)
          name = data.name
        } else {
          const { data: { title } } = await api.get(url)
          name = title
        }
        return [name, this.generatePath(url)]
      }))
      return this.checkForTheSame(chars, dontGetRelevant)
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
  }
}
</style>
