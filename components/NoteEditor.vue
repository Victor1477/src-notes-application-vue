<template>
  <main>
    <input name="noteName" v-model="currentNote.name" placeholder="Name" />
    <div class="action-buttons">
      <button class="red" @click="showConfirmDeletionPopup = true">Delete</button>
      <button class="green" @click="onSave()">Save</button>
    </div>
    <textarea name="notes" id="notes" v-model="currentNote.notes" spellcheck="false"></textarea>
    <ConfirmDeletionPopup
      v-if="showConfirmDeletionPopup"
      @confirm="onDelete()"
      @close="showConfirmDeletionPopup = false"
      :notesName="current.name"
    ></ConfirmDeletionPopup>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Note from "~/utils/models/notes.model";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup.vue";

export default Vue.extend({
  props: {
    current: {
      type: Object,
      default: new Note(),
    },
  },
  data() {
    return {
      currentNote: new Note(),
      showConfirmDeletionPopup: false,
    };
  },
  watch: {
    current(value: any) {
      this.currentNote = { ...value };
    },
  },
  methods: {
    onSave() {
      try {
        this.currentNote.name = this.formatName(this.currentNote.name);
      } catch (e) {}
      const token = this.$store.getters.token;
      const params = { headers: { Authorization: token } };
      this.$axios.$post("/notes", this.currentNote, params).then((response) => {
        this.currentNote = response;
        this.$axios.$get("/notes", params).then((response: Note[]) => {
          this.$store.dispatch("loadNotes", response);
        });
      });
    },
    onDelete() {
      const token = this.$store.getters.token;
      const params = { headers: { Authorization: token } };
      this.$axios
        .$delete("/notes/" + this.currentNote.id, params)
        .then(() => {
          this.$axios.$get("/notes", params).then((response: Note[]) => {
            this.$store.dispatch("loadNotes", response);
          });
        })
        .finally(() => {
          this.showConfirmDeletionPopup = false;
        });
    },
    formatName(value: string): string {
      let temp = value.split("");
      temp[0] = temp[0].toUpperCase();
      return temp.join("");
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/mixins";

main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3.5rem auto;
  position: relative;

  @include scrollbar;

  input {
    outline: none;
    border: none;
    width: 75%;
    justify-self: end;
    align-self: center;
    border-radius: 1rem;
    text-align: center;
    font-size: 1rem;
    padding: 0.3rem;
  }

  .action-buttons {
    justify-self: end;
    align-self: center;
    margin-right: 1rem;

    button {
      padding: 0.5rem 3rem;
      border: none;
      border-bottom: 2px solid black;
      color: white;
      border-radius: 0.2rem;
      font-size: 1.1rem;
      transition: all 50ms linear;

      &:active {
        font-size: 1rem;
      }

      &.red {
        background-color: rgb(200, 50, 50);

        &:hover {
          background-color: rgb(230, 50, 50);
        }
      }

      &.green {
        background-color: rgb(50, 200, 50);

        &:hover {
          background-color: rgb(50, 230, 50);
        }
      }
    }
  }

  textarea {
    border: 1px solid black;
    outline: none;
    padding: 0.5rem;
    font-size: 1rem;
    resize: none;
    grid-column: span 2;
  }
}
</style>
