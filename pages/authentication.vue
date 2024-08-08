<template>
  <div class="form-container">
    <form @submit.prevent="onSubmit()">
      <div class="form-group">
        <label for="register-application-username">Username</label>
        <input @change="onChange($event)" type="text" name="notes-application-username" v-model="form.username" />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input @change="onChange($event)" type="password" name="password" v-model="form.password" />
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
        .catch(() => {})
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
@mixin active() {
  label {
    z-index: 1;
    position: absolute;
    translate: -0.5rem -0.7rem;
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

  form {
    margin-top: 25vh;
    display: grid;
    grid-template-rows: repeat(2, 3.7rem) 2.5rem;
    gap: 1rem;
    width: 15rem;

    .form-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 1rem;
      border: 1px solid black;
      position: relative;
      border-radius: 0.2rem;

      label {
        transition: all 200ms;
        font-weight: bold;
      }

      input {
        position: absolute;
        background-color: inherit;
        outline: none;
        border: none;
        font-size: 1rem;
        opacity: 0;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
      }

      &.active {
        @include active();
      }

      &:focus-within {
        @include active();
      }
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: bold;
      border: none;
      color: white;
      font-size: 1rem;
      background: linear-gradient(90deg, #00aaf0, #000000, #00aaf0);
      border-radius: 0.3rem;

      &:hover {
        font-size: 1.1rem;
        background: linear-gradient(90deg, #00aaff, #141414, #00aaff);
      }
    }
  }
}
</style>
