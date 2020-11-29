<template>
  <div class="radio-buttons flex-h">
    <div
      v-for="(option, index) in options"
      :key="option"
      :class="['radio-button flex-h align-center', { 'ml-xl': index }]" >
      <input
        :id="option.toLowerCase()"
        type="radio"
        :value="option"
        v-model="picked"
        @change="onChange"
      />
      <label class="radio-button-label ml-m" :for="option.toLowerCase()">
        {{ option.toLowerCase() }}
      </label>
    </div>
  </div>
</template>

<script>
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
      text-transform: capitalize;
    }
  }
}
</style>
