<template>
  <div class="related-result">
    <router-link :to="to">{{ title }}</router-link>
    <span>, </span>
  </div>
</template>

<script>
export default {
  name: 'RelateResult',
  props: {
    title: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    }
  },
  computed: {
    to: vm => `/details${vm.link}`
  }
}
</script>
