<template>
  <div class="search-result flex-h align-center justify-space-between mt-m">
    <span class="search-result-name">{{ name }}</span>
    <base-button class="go-to-details px-m" text="Details"/>
  </div>
</template>

<script>
import BaseButton from '../common/BaseButton'

export default {
  name: 'search-result',
  props: {
    name: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  computed: {
    url () {
      const place = this.link.search('people')
      return place !== -1
        ? this.link.slice('people'.length + 1, this.link.length)
        : this.link.slice('moveis'.length + 1, this.link.length)
    }
  },
  components: {
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  &-name {
    font-size: var(--font-size-l);
  }
}
</style>
