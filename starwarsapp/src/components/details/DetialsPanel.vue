<template>
  <div class="details-panel flex-v align-start justify-space-between box-shadow pa-xl">
    <span class="name">{{ name }}</span>
    <div v-if="notFilm" class="details-panel-content justify-space-between">
      <result-details class="content-data" v-if="itemDetails" :details="itemDetails"/>
      <related-results class="content-data" :relevant="relevant" />
    </div>
    <div v-else class="details-film-panel flex-v algin-center">
      <span v-if="openingCrawl" class="opening-crawl mt-l">{{ openingCrawl }}</span>
      <div class="details-film-panel-content justify-space-between">
        <result-details class="content-data" v-if="itemDetails" :details="itemDetails"/>
        <related-results class="content-data content-data-results" :relevant="relevant" />
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
  background-color: var(--color-white);
  min-width: var(--min-width);

  &-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .content-data {
      margin-top: var(--spc-xl);
    }
  }

  .details-film-panel {
    &-content {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .content-data {
      margin-top: var(--spc-xl);

      &-results {
        margin-bottom: var(--spc-l);
      }
    }

    .opening-crawl {
      color: var(--color-grey-dimm);
      text-align: initial;
    }
  }

  .name {
    font-size: var(--font-size-l)
  }
}
@media (min-width: 43.75rem) {
  .details-panel {
    .details-panel-content,
    .details-film-panel .details-film-panel-content {
      flex-direction: row;
      align-items: flex-start;
    }
  }
}
</style>
