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
    border: 3px solid rgba(255, 255, 255, 0.1);
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: var(--accent-purple);
      animation: spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    }
    
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-bottom-color: var(--accent-pink);
      animation: spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
    }
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
