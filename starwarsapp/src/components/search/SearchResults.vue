<template>
  <div class="search-results flex-v align-start box-shadow pa-xl">
    <span class="search-results-label">Results</span>
    <hr class="mt-m"/>
    <div class="search-results-field flex-v align-center justify-center">
      <div v-if="!results.length" class="no-results">
        <span>
          There are zero matches.
        </span>
        <br/>
        <span>
          Use the form to search for People of Movies.
        </span>
      </div>
      <div v-else class="results-wrapper">
        <div class="results" v-if="!isFilm">
          <search-result
            v-for="{ name, url } in results"
            :key="name"
            :name="name"
            :link="url" />
        </div>
        <div class="results" v-else>
          <search-result
            v-for="{ title, url } in results"
            :key="title"
            :name="title"
            :link="url" />
      </div>
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
    },
    isFilm: {
      type: Boolean,
      default: false
    }
  },
  components: {
    SearchResult
  }
}
</script>

<style lang="scss" scoped>
.search-results {
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

    .results-wrapper {
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
