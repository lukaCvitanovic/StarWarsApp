<template>
  <div id="app">
    <app-header />
    <div class="content flex-h align-start justify-center my-xl">
      <search-options class="mr-xl" />
      <search-results :results="resutls" />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import SearchOptions from './components/search/SearchOptions'
import SearchResults from './components/search/SearchResults'

export default {
  name: 'app',
  data: () => ({
    resutls: []
  }),
  components: {
    AppHeader,
    SearchOptions,
    SearchResults
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/main.scss';

#app {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-grey-light);

  .content {
    width: 100%;
  }
}
</style>
