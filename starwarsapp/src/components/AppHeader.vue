<template>
  <header class="app-header flex-v justify-center align-center">
    <span class="header-title">
      SWStarter
    </span>
  </header>
</template>

<script>
export default {
  name: 'app-header'
}
</script>

<style lang="scss" scoped>
.app-header {
  width: 100%;
  height: 3.125rem;
  background-color: var(--color-white);
  box-shadow: 0 0.125rem 0 0 var(--color-grey-shadow);

  .header-title {
    color: var(--color-primary);
    font-size: 1.125rem;
  }
}
</style>
