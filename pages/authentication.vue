<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit()">
      <div class="form-group">
        <label for="register-application-username">Username</label>
        <input
          @change="onChange($event)"
          type="text"
          name="notes-application-username"
          v-model="form.username"
          autocomplete="off"
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input @change="onChange($event)" type="password" name="password" v-model="form.password" autocomplete="off" />
      </div>
      <button type="submit">
        <LoadingSpinner v-if="isLoading" size="1.5rem"></LoadingSpinner>
        <p v-else>Login</p>
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Popup from "~/utils/service/popup.service";

export default Vue.extend({
  data() {
    return {
      isLoading: false,
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    onSubmit() {
      this.isLoading = true;
      this.$axios
        .post("/login", this.form)
        .then(({ data }) => {
          if (data) {
            this.$store.dispatch("setToken", data.token);
            this.$router.push("/");
          }
        })
        .catch(() => {
          new Popup("Authentication Failed", true);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    onChange(event: any) {
      if (event.target.value !== "") {
        event.target.parentNode.classList.add("active");
      } else {
        event.target.parentNode.classList.remove("active");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/mixins";

@mixin active() {
  label {
    z-index: 1;
    position: absolute;
    translate: -0.5rem -0.7rem;
    font-size: 0.75rem;
    color: var(--accent-purple);
    background: var(--bg-primary);
    padding: 0 0.5rem;
  }

  input {
    position: relative;
    top: 0.6rem;
    opacity: 100;
  }
}

.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  z-index: 1;

  form {
    display: grid;
    grid-template-rows: repeat(2, 4.2rem) 3rem;
    gap: 1.5rem;
    width: 22rem;
    padding: 3rem;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: var(--border-radius-xl);
    box-shadow: var(--shadow-xl);
    animation: fadeInUp 0.6s ease-out;

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      border: 1.5px solid rgba(255, 255, 255, 0.15);
      position: relative;
      border-radius: var(--border-radius-md);
      transition: all var(--transition-normal);
      background: rgba(255, 255, 255, 0.05);

      label {
        transition: all var(--transition-normal);
        font-weight: 600;
        color: var(--text-secondary);
        letter-spacing: 0.3px;
      }

      input {
        position: absolute;
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 1rem;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 1rem;
        color: var(--text-primary);
        transition: all var(--transition-normal);

        // Remove autofill background color
        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
          -webkit-text-fill-color: var(--text-primary) !important;
          transition: background-color 5000s ease-in-out 0s;
        }
      }

      &.active {
        @include active();
        border-color: var(--accent-purple);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      &:focus-within {
        @include active();
        border-color: var(--accent-purple);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        background: rgba(255, 255, 255, 0.08);
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 600;
      border: none;
      color: white;
      font-size: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: var(--border-radius-md);
      position: relative;
      overflow: hidden;
      cursor: pointer;
      transition: all var(--transition-normal);
      box-shadow: var(--shadow-md);
      letter-spacing: 0.5px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s;
      }

      &:hover::before {
        left: 100%;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-lg);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }
}
</style>
