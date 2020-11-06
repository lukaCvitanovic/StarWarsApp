<template>
  <div id="app">
    <app-header />
    <div class="content flex-h align-center my-xl">
      <search-options />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import SearchOptions from './components/search/SearchOptions'

export default {
  name: 'app',
  components: {
    AppHeader,
    SearchOptions
  }
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/main.scss';

#app {
  width: 100%;
  height: 100%;
  font-family: Montserrat;
  text-align: center;
  background-color: var(--color-grey-light);

  .content {
    width: 100%;
  }
}
</style>
