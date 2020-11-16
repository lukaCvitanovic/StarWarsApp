<template>
  <div class="related-results flex-v align-start">
    <span class="related-results-description mb-l">Related items:</span>
    <div class="error flex-v justify-center" v-if="errorMsg">
      <span>{{ errorMsg }}</span>
    </div>
    <div v-else-if="!relevant" class="related-results-box flex-h flex-wrap">
      <related-result
        class="mr-s"
        v-for="[name, url] in relevant"
        :key="url"
        :title="name"
        :link="url" />
    </div>
    <div class="loading flex-v justify-center" v-else>
      <span>Loading...</span>
    </div>
  </div>
</template>

<script>
import RelatedResult from './RelatedResult'

export default {
  name: 'RelatedResults',
  props: {
    relevant: {
      type: Array,
      default: null
    },
    errorMsg: {
      type: String,
      default: ''
    }
  },
  created () {
    console.log(this.errorMsg)
  },
  components: {
    RelatedResult
  }
}
</script>

<style lang="scss" scoped>
.related-results {
  width: 100%;

  &-box {
    text-align: justify;
  }

  .loading {
    width: 100%;
    height: 100%;

    span {
      color: var(--color-grey-dimm);
    }
  }

  .error {
    width: 100%;
    margin: 55% 0;

    span {
      color: red;
    }
  }
}
@media (min-width: 43.75rem) {
  .related-results {
    width: 15rem;
  }
}
</style>
