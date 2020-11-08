<template>
  <div class="search-results flex-v align-start box-shadow pa-xl">
    <span class="search-results-label">Results</span>
    <hr class="mt-m"/>
    <div class="search-results-field flex-v align-center justify-center">
      <div v-if="hasResults" class="no-results">
        <span>
          There are zero matches.
        </span>
        <br/>
        <span>
          Use the form to search for People of Movies.
        </span>
      </div>
      <div class="results" v-if="!hasResults">
        <search-result
          v-for="{ name, url } in results"
          :key="name"
          :name="name"
          :link="url" />
      </div>
    </div>
  </div>
</template>

<script>
import SearchResult from './SearchResult'

export default {
  name: 'search-results',
  props: {
    results: {
      type: Array,
      required: true
    }
  },
  computed: {
    hasResults: vm => !vm.results.length
  },
  components: {
    SearchResult
  }
}
</script>

<style lang="scss" scoped>
.search-results {
  width: var(--measure-m);
  height: var(--measure-m);
  background-color: var(--color-white);

  &-label {
    font-size: var(--font-size-l);
  }

  &-field {
    width: 100%;
    height: 100%;

    .no-results {
      span {
        color: var(--color-grey);
      }
    }

    .results {
      width: 100%;
      height: 100%;
    }
  }

  hr {
    width: 100%;
    height: 0.0625rem;
    background-color: var(--color-grey);
  }
}
</style>
