<template>
  <div class="radio-buttons flex-h mt-l">
    <div class="radio-button flex-h align-center">
      <input id="people" type="radio" value="People" v-model="picked" >
      <label class="radio-button-label ml-m" for="people">People</label>
    </div>
    <div class="radio-button flex-h align-center ml-xl">
      <input id="movies" type="radio" value="Movies" v-model="picked" >
      <label class="radio-button-label ml-m" for="movies">Movies</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radio-buttons',
  data: () => ({
    picked: 'People'
  })
}
</script>

<style lang="scss" scoped>
.radio-buttons {
  width: 100%;

  .radio-button {
    input {
      width: 1rem;
      height: 1rem;
    }

    &-label {
      font-size: var(--font-size-s);
    }
  }
}
</style>
