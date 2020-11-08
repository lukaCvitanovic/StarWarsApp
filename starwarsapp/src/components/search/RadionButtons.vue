<template>
  <div class="radio-buttons flex-h">
    <div class="radio-button flex-h align-center">
      <input
        id="people"
        type="radio"
        :value="PEOPLE"
        v-model="picked"
        @change="onChange" >
      <label class="radio-button-label ml-m" for="people">
        People
      </label>
    </div>
    <div class="radio-button flex-h align-center ml-xl">
      <input
        id="movies"
        type="radio"
        :value="MOVIES"
        v-model="picked"
        @change="onChange" >
      <label class="radio-button-label ml-m" for="movies">
        Movies
      </label>
    </div>
  </div>
</template>

<script>
import searchOptions from '@/config/searchOptions.js'
const { PEOPLE, MOVIES } = searchOptions

export default {
  name: 'radio-buttons',
  model: {
    prop: 'value',
    event: 'changed'
  },
  data: () => ({
    picked: '',
    PEOPLE: PEOPLE,
    MOVIES: MOVIES
  }),
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onChange () {
      this.$emit('changed', this.picked)
    }
  },
  created () {
    this.picked = this.value
  }
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
