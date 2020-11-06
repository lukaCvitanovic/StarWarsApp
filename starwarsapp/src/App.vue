<template>
  <div id="app">
    <app-header />
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'

export default {
  name: 'app',
  components: {
    AppHeader
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
}
</style>
