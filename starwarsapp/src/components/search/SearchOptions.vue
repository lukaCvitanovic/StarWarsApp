<template>
  <div class="search-options flex-v pa-xl justify-center align-start box-shadow">
    <span class="search-options-label">
      What are you searching for?
    </span>
    <radio-buttons />
  </div>
</template>

<script>
import RadioButtons from './RadionButtons'

export default {
  name: 'search-options',
  components: {
    RadioButtons
  }
}
</script>

<style lang="scss" scoped>
.search-options {
  width: var(--measure-s);
  background-color: var(--color-white);

  &-label {
    font-size: var(--font-size-s);
  }
}
</style>
