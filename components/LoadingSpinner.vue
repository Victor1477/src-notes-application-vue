<template>
  <div class="spinner-container">
    <div class="spinner" :style="`height:${size}; width:${size};`"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    size: {
      default: "1rem",
      type: String,
    },
  },
});
</script>

<style lang="scss" scoped>
.spinner-container {
  .spinner {
    border: 2px solid white;
    border-top: none;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
