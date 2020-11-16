<template>
  <button class="base-button" v-bind="$attrs" v-on="$listeners">
    <slot><span class="button-span">{{ text }}</span></slot>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    text: {
      type: String,
      default: ''
    },
    disable: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.base-button {
  outline: none;
  border: none;
  border-radius: 1.0625rem;
  height: 2.125rem;
  background-color: var(--color-primary);
  cursor: pointer;

  &:disabled {
    background-color: var(--color-grey);
  }
}
</style>
