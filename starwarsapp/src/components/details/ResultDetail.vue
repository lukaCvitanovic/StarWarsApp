<template>
  <div class="result-detail flex-h align-start justify-space-between mb-m">
    <span class="result-detail-name mr-l">{{ formatedDetailName.replace('_', ' ') }}:</span>
    <span class="result-detail-value">{{ detailValue.replace('_', ' ') }}</span>
  </div>
</template>

<script>
export default {
  name: 'ResultDetail',
  props: {
    detailName: {
      type: String,
      required: true
    },
    detailValue: {
      type: String,
      required: true
    }
  },
  computed: {
    formatedDetailName: vm => vm.detailName.charAt(0).toUpperCase() + vm.detailName.slice(1)
  }
}
</script>

<style lang="scss" scoped>
.result-detail {
  width: 100%;

  &-name {
    font-size: var(--fonz-size-s);
  }

  &-value {
    font-size: var(--font-size-s);
    color: var(--color-grey-dimm);
    text-align: right;
  }
}
</style>
