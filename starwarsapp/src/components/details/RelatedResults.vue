<template>
  <div class="related-results flex-v align-start">
    <span class="related-results-description mb-l">Related items:</span>
    <div v-if="relevant" class="related-results-box flex-h flex-wrap">
      <related-result
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
    }
  },
  components: {
    RelatedResult
  }
}
</script>

<style lang="scss" scoped>
.related-results {
  width: 15rem;

  &-box {
    text-align: justify;
  }

  .loading {
    width: 100%;
    height: 10.625rem;
  }
}
</style>
