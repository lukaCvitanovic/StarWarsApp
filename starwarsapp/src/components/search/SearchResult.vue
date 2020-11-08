<template>
  <div class="search-result flex-h align-center justify-space-between mt-m">
    <span class="search-result-name">{{ name }}</span>
    <base-button
     class="go-to-details px-m"
     text="Details"
     @click="onClick" />
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
  methods: {
    onClick () {
      this.$router.push({ path: `details/${this.url}` })
    }
  },
  computed: {
    url () {
      const place = this.link.search('people')
      return place !== -1
        ? this.link.slice(place, this.link.length)
        : this.link.slice(place, this.link.length)
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
