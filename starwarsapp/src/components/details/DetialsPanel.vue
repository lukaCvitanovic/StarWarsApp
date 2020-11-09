<template>
  <div class="details-panel flex-v align-start justify-space-between box-shadow pa-xl">
    <span class="name">{{ name }}</span>
    <div class="details-panel-content flex-h align-start justify-space-between">
      <result-details class="mt-xl" v-if="itemDetails" :details="itemDetails"/>
      <related-results class="mt-xl" :relevant="relevant" />
    </div>
    <base-button class="px-m mt-m" text="Go Back" @click="$router.push({ name: 'Home' })" />
  </div>
</template>

<script>
import ResultDetails from './ResultDetails'
import RelatedResults from './RelatedResults'
import BaseButton from '../common/BaseButton'

export default {
  name: 'DetailsPanel',
  props: {
    name: {
      type: String,
      required: true
    },
    relevant: {
      type: Array,
      default: () => ([])
    },
    itemDetails: {
      type: Array,
      default: () => ([])
    }
  },
  created () {
    console.log(this.relevant)
  },
  components: {
    ResultDetails,
    RelatedResults,
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.details-panel {
  width: var(--measure-l);
  background-color: var(--color-white);

  &-content {
    width: 100%;
  }

  .name {
    font-size: var(--font-size-l)
  }
}
</style>
