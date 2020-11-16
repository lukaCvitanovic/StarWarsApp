<template>
  <div class="result-details flex-v align-start justify-center">
    <span class="details-panel-content-description mb-l">Details:</span>
    <result-detail
      v-for="[key, value] in detailsWithoutName"
      :key="key+value"
      :detailName="key"
      :detailValue="value" />
  </div>
</template>

<script>
import ResultDetail from './ResultDetail'

export default {
  name: 'ResultDetails',
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  computed: {
    detailsWithoutName: vm => vm.details.slice(1)
  },
  components: {
    ResultDetail
  }
}
</script>

<style lang="scss" scoped>
.result-details {
  width: 100%;
}
@media (min-width: 43.75rem) {
  .result-details {
    max-width: 50%;
  }
}
</style>
