<template>
  <div id="home">
    <app-header />
    <div class="content flex-h align-start justify-center my-xl">
      <search-options class="mr-xl" @search="search" :button-text="searchButtonText" />
      <search-results :results="results" :isFilm="isFilm" />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import SearchOptions from '@/components/search/SearchOptions'
import SearchResults from '@/components/search/SearchResults'
import api from '@/api/search'
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE } = searchOptions

export default {
  name: 'Home',
  data: () => ({
    results: [],
    isFilm: false,
    searchButtonText: 'Search'
  }),
  methods: {
    async search ({ picked: type, value: name }) {
      this.searchButtonText = 'Searching...'
      if (type === PEOPLE) {
        const { data: { results } } = await api.getPeopleByName(name)
        this.isFilm = false
        this.results = results
      } else {
        const { data: { results } } = await api.getMoviesByName(name)
        this.isFilm = true
        this.results = results
      }
      this.searchButtonText = 'Search'
    }
  },
  components: {
    AppHeader,
    SearchOptions,
    SearchResults
  }
}
</script>

<style lang="scss">
#home {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-grey-light);

  .content {
    width: 100%;
  }
}
</style>
