<template>
  <div class="details">
    <app-header />
    <div class="content flex-h align-center justify-center my-xl">
      <details-panel />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import DetailsPanel from '@/components/details/DetialsPanel.vue'

export default {
  name: 'Details',
  components: {
    AppHeader,
    DetailsPanel
  }
}
</script>

<style lang="scss" scoped>
.details {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: var(--color-grey-light);

  .content {
    width: 100%;
  }
}
</style>
