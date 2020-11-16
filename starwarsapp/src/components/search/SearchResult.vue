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
import searchResults from '@/config/searchResults'
const { PEOPLE, FILMS } = searchResults

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
      this.$router.push({ path: this.url })
    }
  },
  computed: {
    url () {
      const isPeople = this.link.search(PEOPLE)
      const partialUrl = isPeople !== -1
        ? this.link.slice(isPeople, this.link.length)
        : this.link.slice(this.link.search(FILMS), this.link.length)
      return `details/${partialUrl}`
    }
  },
  components: {
    BaseButton
  }
}
</script>

<style lang="scss" scoped>
.search-result {
  text-align: left;
}
</style>
