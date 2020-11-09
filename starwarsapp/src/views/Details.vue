<template>
  <div class="details">
    <app-header />
    <div class="content flex-h align-center justify-center my-xl">
      <details-panel
        v-if="relevant"
        :name="name"
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

export default {
  name: 'Details',
  data: () => ({
    name: '',
    relevant: null,
    itemDetails: null
  }),
  methods: {
    async getDetails ({ type, id }) {
      const { data } = type.toUpperCase() === PEOPLE
        ? await api.getPeopleById(id)
        : await api.getMoviesById(id)
      const array = Object.keys(data).map(key => ([key, data[key]])).splice(0, 13)
      const [name, ...rest] = array.slice(0, 8)
      this.name = name[1]
      this.itemDetails = rest
      let relevant = array.slice(8)
      relevant = await this.formatRelevant(relevant)
      let relevantOnceRemoved = await this.getRelevantForPeople(relevant)
      relevantOnceRemoved = shuffle(relevantOnceRemoved)
      this.relevant = relevantOnceRemoved.slice(0, 15)
    },
    generatePath (url) {
      return url.slice(url.search('/api') + '/api'.length)
    },
    isFilmOrPlanet (url) {
      return url.search('films') !== -1 || url.search('planets') !== -1
    },
    async formatRelevant (relevant) {
      const urls = []
      for (const [, value] of relevant) {
        if (typeof value === 'string') urls.push(value)
        else {
          for (const insance of value) urls.push(insance)
        }
      }
      return await Promise.all(urls.map(async url => {
        const key = url.search('films') !== -1
          ? 'title'
          : 'name'
        const { data } = await api.get(this.generatePath(url))
        return [data[key], this.generatePath(url)]
      }))
    },
    async getRelevantForPeople (relevant) {
      const [homeworld, ...rest] = relevant
      const dontGetRelevant = []
      const { data: { residents } } = await api.get(homeworld[1])
      const charUrls = residents.slice(0, 4)
      for (const [name, url] of rest) {
        if (this.isFilmOrPlanet(url)) {
          const { data: { characters } } = await api.get(url)
          let i = 0
          for (const character of characters) {
            if (!charUrls.includes(character) && i < 4) {
              charUrls.push(character)
              i++
            }
          }
        } else dontGetRelevant.push([name, url])
      }
      const chars = await Promise.all(charUrls.map(async charUrl => {
        const { data: { name } } = await api.get(charUrl)
        return [name, this.generatePath(charUrl)]
      }))
      return chars.concat(dontGetRelevant)
    }
  },
  watch: {
    $route: {
      async handler ({ params }) {
        await this.getDetails(params)
        this.$forceUpdate()
      }
    }
  },
  async created () {
    console.log('created')
    await this.getDetails(this.$route.params)
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
