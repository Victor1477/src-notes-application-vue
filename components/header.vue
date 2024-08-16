<template>
  <header>
    <nav><button @click="$emit('newNote')">New</button></nav>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: end;
  align-items: center;
  grid-column: span 2;
  background-color: rgb(30, 30, 30);
  padding: 0 1rem;

  button {
    padding: 0.5rem 3rem;
    background-color: rgb(70, 70, 70);
    border: none;
    border-bottom: 2px solid white;
    color: white;
    border-radius: 0.2rem;
    font-size: 1.1rem;
    transition: all 50ms linear;

    &:active {
      font-size: 1rem;
    }

    &:hover {
      background-color: rgb(90, 90, 90);
    }
  }
}
</style>
