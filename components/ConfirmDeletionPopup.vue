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
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 100;

  .popup-box {
    position: relative;
    width: 24rem;
    height: 12rem;
    background: white;
    border-radius: 1rem;

    h3 {
      margin-top: 1rem;
      text-align: center;
      p {
        margin-top: 0.3rem;
        font-weight: normal;
      }
    }

    .action-buttons {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      gap: 1rem;

      button {
        padding: 0.5rem 1rem;
        border: none;
        color: white;
        font-size: 1rem;
        border-radius: 0.5rem;

        &:active {
          font-size: 0.9rem;
        }
      }

      .confirm-btn {
        background-color: rgb(200, 50, 50);
        &:hover {
          background-color: rgb(230, 50, 50);
        }
      }

      .cancel-btn {
        background-color: rgb(50, 50, 200);
        &:hover {
          background-color: rgb(50, 50, 240);
        }
      }
    }
  }
}
</style>
