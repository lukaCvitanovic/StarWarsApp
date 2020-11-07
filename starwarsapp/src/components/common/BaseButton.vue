<template>
  <button class="base-button" v-bind="$attrs">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'base-button',
  props: {
    text: {
      type: String,
      required: true
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

  span {
    font-family: var(--font-family);
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    color: var(--color-white);
    text-transform: uppercase;
  }
}
</style>
