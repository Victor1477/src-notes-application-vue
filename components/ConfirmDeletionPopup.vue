<template>
  <div class="container">
    <div class="popup-box">
      <h3>
        Confirm deletion
        <p>{{ notesName }}</p>
      </h3>
      <div class="action-buttons">
        <button class="confirm-btn" @click="confirm()">Confirm</button>
        <button class="cancel-btn" @click="close()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    notesName: {
      type: String,
    },
  },
  methods: {
    confirm() {
      this.$emit("confirm");
    },
    close() {
      this.$emit("close");
    },
  },
});
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 100;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .popup-box {
    position: relative;
    width: 28rem;
    min-height: 14rem;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-xl);
    padding: 2rem;
    border: 1px solid rgba(255, 255, 255, 0.2);
    animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(30px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    h3 {
      margin-top: 0.5rem;
      text-align: center;
      font-size: 1.5rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 700;
      letter-spacing: 0.3px;
      
      p {
        margin-top: 1rem;
        font-weight: 600;
        font-size: 1.1rem;
        color: #333;
        background: linear-gradient(135deg, #fa709a, #f5576c);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        padding: 0.5rem;
        border-radius: var(--border-radius-sm);
      }
    }

    .action-buttons {
      position: absolute;
      bottom: 2rem;
      right: 2rem;
      display: flex;
      gap: 1rem;

      button {
        padding: 0.75rem 1.75rem;
        border: none;
        color: white;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: var(--border-radius-md);
        cursor: pointer;
        transition: all var(--transition-normal);
        box-shadow: var(--shadow-sm);
        letter-spacing: 0.3px;
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

      .confirm-btn {
        background: linear-gradient(135deg, #fa709a 0%, #ff6b6b 100%);
      }

      .cancel-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
    }
  }

  @media (max-width: 40rem) {
    .popup-box {
      width: 90%;
      padding: 1.5rem;

      .action-buttons {
        position: static;
        margin-top: 2rem;
        justify-content: center;
      }
    }
  }
}
</style>
