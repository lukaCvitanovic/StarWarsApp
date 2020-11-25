<template>
  <div class="search-options flex-v justify-center align-start box-shadow pa-xl">
    <span class="search-options-label"> What are you searching for? </span>
    <radio-buttons class="mt-l" v-model="picked" :options="options" />
    <span>{{ picked }}</span>
    <search-input class="mt-l px-m" v-model="value" @submit="doSearch" :search-type="picked" />
    <base-button
      class="search-button mt-l"
      :text="buttonText"
      :disabled="disabled"
      @click="doSearch"
    />
  </div>
</template>

<script>
import RadioButtons from './RadionButtons'
import SearchInput from './SearchInput'
import BaseButton from '../common/BaseButton'
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE, MOVIES } = searchOptions

export default {
  name: 'search-options',
  data: () => ({
    picked: PEOPLE,
    options: [PEOPLE, MOVIES],
    value: ''
  }),
  props: {
    buttonText: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ''
    }
  },
  methods: {
    doSearch () { this.$emit('search', { picked: this.picked, value: this.value }) }
  },
  computed: {
    disabled: vm => !vm.value || !!vm.error
  },
  components: {
    RadioButtons,
    SearchInput,
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.search-options {
  background-color: var(--color-white);

  &-label {
    color: var(--color-grey-dark);
    font-size: var(--font-size-s);
  }

  .search-button {
    width: 100%;
  }
}
</style>
