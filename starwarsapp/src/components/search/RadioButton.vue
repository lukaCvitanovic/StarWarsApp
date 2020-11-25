<template>
  <div class="radio-button flex-h align-center">
    <input
      v-bind="$attrs"
      :id="lowerCase"
      type="radio"
      :value="radioValue"
    />
    <label class="radio-button-label ml-m" :for="lowerCase">
      {{ lowerCase }}
    </label>
  </div>
</template>

<script>
export default {
  name: 'RadioButton',
  inheritAttrs: false,
  props: {
    radioValue: {
      type: String,
      required: true
    }
  },
  computed: {
    lowerCase: vm => vm.radioValue.toLowerCase()
  }
}
</script>

<style lang="scss" scoped>
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
</style>
