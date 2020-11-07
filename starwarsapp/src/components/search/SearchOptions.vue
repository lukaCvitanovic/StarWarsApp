<template>
  <div class="search-options flex-v pa-xl justify-center align-start box-shadow">
    <span class="search-options-label">
      What are you searching for?
    </span>
    <radio-buttons v-model="picked" />
    <search-input v-model="value" :search-type="picked"/>
    <span>{{ value }}</span>
  </div>
</template>

<script>
import RadioButtons from './RadionButtons'
import SearchInput from './SearchInput'

export default {
  name: 'search-options',
  data: () => ({
    picked: 'Movies',
    value: 'asga'
  }),
  components: {
    RadioButtons,
    SearchInput
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
