<template>
  <div class="related-results flex-v align-start">
    <span class="related-results-description mb-l">Related items:</span>
    <div class="related-results-box flex-h flex-wrap">
      <related-result
        v-for="[name, url] in relevant"
        :key="url"
        :title="name"
        :link="url" />
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
      required: true
    }
  },
  components: {
    RelatedResult
  }
}
</script>

<style lang="scss" scoped>
.related-results-box {
  width: 15rem;
  text-align: justify;
}
</style>
