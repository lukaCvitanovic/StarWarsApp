<template>
  <div class="search-options flex-v pa-xl justify-center align-start box-shadow">
    <span class="search-options-label">
      What are you searching for?
    </span>
  </div>
</template>

<script>
export default {
  name: 'search-options'
}
</script>

<style lang="scss" scoped>
.search-options {
  width: var(--measure-s);
  background-color: var(--color-white);

  &-label {
    font-size: var(--font-size-s);
  }
}
</style>
