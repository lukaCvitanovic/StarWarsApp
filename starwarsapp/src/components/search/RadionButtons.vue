<template>
  <div class="radio-buttons flex-h">
    <radio-button
      v-for="option in options"
      :key="option"
      :radioValue="option"
      v-model="picked" />
  </div>
</template>

<script>
import RadioButton from './RadioButton'

export default {
  name: 'radio-buttons',
  model: {
    prop: 'value',
    event: 'changed'
  },
  data: () => ({
    picked: ''
  }),
  props: {
    value: {
      type: String,
      required: true
    },
    options: {
      type: Array,
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
  },
  components: {
    RadioButton
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
