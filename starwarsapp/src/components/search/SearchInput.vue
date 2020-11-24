<template>
  <input
    autofocus
    class="search-input"
    @input="$emit('input', $event.target.value)"
    @keyup.enter="$emit('submit')"
    :placeholder="plh"
    :value="value" >
</template>

<script>
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE } = searchOptions

export default {
  name: 'search-input',
  data: () => ({
    plh: '',
    plhPeople: 'e.g. Ahsoka Tano, Luke Skywalker, Bendu',
    plhrMovies: 'e.g. Star Wars: The New Hope'
  }),
  props: {
    value: {
      type: String,
      default: ''
    },
    searchType: {
      type: String,
      required: true
    }
  },
  watch: {
    searchType: {
      immediate: true,
      handler () {
        this.plh = this.searchType === PEOPLE ? this.plhPeople : this.plhrMovies
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-input {
  width: 100%;
  height: 2.5rem;
  border: solid 0.0625rem var(--color-grey);
  color: var(--color-grey-dark);
  border-radius: 0.25rem;
  background-color: var(--color-white);
  box-shadow: inset 0 0.0625rem 0.1875rem 0 var(--color-grey-dimm-75);
  font-family: var(--font-family);
  font-size: var(--font-size-s);

  &:focus {
    outline: none;
    border: solid 0.0625rem var(--color-grey-dark);
  }
}
</style>
