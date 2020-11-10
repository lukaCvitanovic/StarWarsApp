<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import '@/assets/stylesheets/main.scss';

#app {
  width: 100%;
}
@media (min-width: 40.125rem) {
  #app {
    height: 100%;
  }
}
</style>
