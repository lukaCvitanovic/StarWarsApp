<template>
  <div id="home">
    <app-header />
    <div class="content align-start justify-center">
      <search-options class="search-options mt-xl"
        @search="search"
        :error="error"
        :button-text="searchButtonText" />
      <search-results
        class="search-results mt-xl"
        :results="results"
        :isFilm="isFilm"
        :error-msg="error" />
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
    searchButtonText: 'Search',
    error: ''
  }),
  methods: {
    async search ({ picked: type, value: name }) {
      this.searchButtonText = 'Searching...'
      if (type === PEOPLE) {
        try {
          const { data: { results } } = await api.callPeopleByName(name)
          this.isFilm = false
          this.results = results
        } catch (error) {
          this.error = error
        }
      } else {
        try {
          const { data: { results } } = await api.callMoviesByName(name)
          this.isFilm = true
          this.results = results
        } catch (error) {
          this.error = error
        }
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
  min-width: var(--min-width);
  text-align: center;
  background-color: var(--color-grey-light);
  overflow-y: auto;

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: var(--spc-xl);
    padding-right: var(--spc-xl);

    .search-options, .search-results {
      width: 100%;
    }
  }
}

@media (min-width: 40.125rem) {
  #home .content {
    .search-options {
      width: var(--measure-m);
      margin-left: auto;
      margin-right: auto;
    }

    .search-results {
      width: var(--measure-m);
      margin-left: auto;
      margin-right: auto;
    }
  }
}
@media (min-width: 67.625rem) {
  #home {
    align-items: center;

    .content {
      width: min-content;
      height: 100%;
      padding-top: var(--header-height);
      margin: 0 auto;
      flex-direction: row;

      .search-options {
        width: var(--measure-s);
        margin-right: var(--spc-xl);
        margin-left: 0;
      }
    }
  }
}
</style>
