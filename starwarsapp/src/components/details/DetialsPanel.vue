<template>
  <div class="details-panel flex-v align-start justify-space-between box-shadow pa-xl">
    <span class="name">{{ name }}</span>
    <div v-if="notFilm" class="details-panel-content flex-h align-start justify-space-between">
      <result-details class="mt-xl" v-if="itemDetails" :details="itemDetails"/>
      <related-results class="mt-xl" :relevant="relevant" />
    </div>
    <div v-else class="details-film-panel flex-v algin-center">
      <span v-if="openingCrawl" class="opening-crawl mt-l">{{ openingCrawl }}</span>
      <div class="details-film-panel-content flex-h align-start justify-space-between">
        <result-details class="mt-xl" v-if="itemDetails" :details="itemDetails"/>
        <related-results class="mt-xl" :relevant="relevant" />
      </div>
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
    openingCrawl: {
      type: String,
      default: ''
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
  computed: {
    notFilm: vm => vm.$route.params.type !== 'films'
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

  .details-film-panel {
    .opening-crawl {
      color: var(--color-grey-dimm);
      text-align: initial;
    }
  }

  .name {
    font-size: var(--font-size-l)
  }
}
</style>
