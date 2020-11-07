<template>
  <div class="search-options flex-v pa-xl justify-center align-start box-shadow">
    <span class="search-options-label">
      What are you searching for?
    </span>
    <radio-buttons v-model="picked" />
    <search-input v-model="value" :search-type="picked"/>
    <base-button class="search-button mt-l" :text="buttonText" />
  </div>
</template>

<script>
import RadioButtons from './RadionButtons'
import SearchInput from './SearchInput'
import BaseButton from '../common/BaseButton'

export default {
  name: 'search-options',
  data: () => ({
    picked: 'Movies',
    value: 'asga',
    buttonText: 'Search'
  }),
  components: {
    RadioButtons,
    SearchInput,
    BaseButton
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

  .search-button{
    width: 100%;
  }
}
</style>
