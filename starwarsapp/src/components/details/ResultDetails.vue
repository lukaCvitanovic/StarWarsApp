<template>
  <div class="result-details flex-v align-start justify-center">
    <span class="details-panel-content-description mb-l">Details:</span>
    <result-detail
      v-for="[name, value] in detailsWithoutName"
      :key="value"
      :detailName="name"
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
  .name {
    font-size: var(--font-size-l);
  }
}
</style>
