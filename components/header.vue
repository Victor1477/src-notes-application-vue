<template>
  <header>
    <div class="mobile-nav" @click="$emit('toggleMobileNav')">
      <div class="mobile-nav__bar"></div>
      <div class="mobile-nav__bar"></div>
      <div class="mobile-nav__bar"></div>
    </div>
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
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0 1.5rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 10;

  button {
    padding: 0.7rem 2.5rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border: none;
    color: white;
    border-radius: var(--border-radius-md);
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all var(--transition-normal);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent);
      opacity: 0;
      transition: opacity var(--transition-fast);
    }

    &:hover::before {
      opacity: 1;
    }

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    &:active {
      transform: translateY(0);
      box-shadow: var(--shadow-sm);
    }
  }

  .mobile-nav {
    display: none;
    flex-direction: column;
    gap: 0.4rem;
    width: 2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: var(--border-radius-sm);
    transition: all var(--transition-normal);

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    &__bar {
      background: linear-gradient(90deg, var(--accent-purple), var(--accent-pink));
      border: none;
      border-radius: 3px;
      width: 100%;
      height: 0.3rem;
      transition: all var(--transition-normal);
    }

    &:hover &__bar {
      background: linear-gradient(90deg, var(--accent-blue), var(--accent-green));
    }
  }

  @media (max-width: 60rem) {
    justify-content: space-between;

    .mobile-nav {
      display: flex;
    }
  }
}
</style>
