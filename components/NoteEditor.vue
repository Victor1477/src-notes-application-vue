<template>
  <main>
    <input name="noteName" v-model="currentNote.name" placeholder="Name" autocomplete="off" />
    <div class="action-buttons">
      <button class="red" @click="showConfirmDeletionPopup = true">Delete</button>
      <button class="green" @click="onSave()">Save</button>
    </div>
    <textarea name="notes" id="notes" v-model="currentNote.notes" spellcheck="false"></textarea>
    <ConfirmDeletionPopup
      v-if="showConfirmDeletionPopup"
      @confirm="onDelete()"
      @close="showConfirmDeletionPopup = false"
      :notesName="currentNote.name"
    ></ConfirmDeletionPopup>
  </main>
</template>

<script lang="ts">
import Vue from "vue";
import Note from "~/utils/models/notes.model";
import ConfirmDeletionPopup from "./ConfirmDeletionPopup.vue";
import Popup from "~/utils/service/popup.service";

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
      this.showConfirmDeletionPopup = false;
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
      this.$axios
        .$post("/notes", this.currentNote, params)
        .then((response) => {
          this.currentNote = response;
          this.$axios.$get("/notes", params).then((response: Note[]) => {
            this.$store.dispatch("loadNotes", response);
          });
          new Popup("Saved");
        })
        .catch(() => {
          new Popup("Failed on Save", true);
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
            new Popup("Deleted");
          });
        })
        .catch(() => {
          new Popup("Failed on Delete", true);
        })
        .finally(() => {
          this.showConfirmDeletionPopup = false;
          this.$emit("close");
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
  grid-template-rows: 4rem auto;
  position: relative;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 1;

  @include scrollbar;

  input {
    @include input-modern;
    width: 75%;
    justify-self: end;
    align-self: center;
    border-radius: var(--border-radius-lg);
    text-align: center;
    font-size: 1.05rem;
    padding: 0.75rem 1.25rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    margin-right: 1rem;
  }

  .action-buttons {
    justify-self: start;
    align-self: center;
    margin-left: 1.5rem;
    display: flex;
    gap: 0.75rem;

    button {
      padding: 0.75rem 2rem;
      border: none;
      color: white;
      border-radius: var(--border-radius-md);
      font-size: 0.95rem;
      font-weight: 600;
      letter-spacing: 0.5px;
      transition: all var(--transition-normal);
      cursor: pointer;
      position: relative;
      overflow: hidden;
      box-shadow: var(--shadow-sm);

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

      &.red {
        background: linear-gradient(135deg, #fa709a 0%, #ff6b6b 100%);
      }

      &.green {
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
      }
    }
  }

  textarea {
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-primary);
    letter-spacing: 0.5px;
    outline: none;
    padding: 1.5rem;
    font-size: 1rem;
    line-height: 1.6rem;
    resize: none;
    grid-column: span 2;
    background: rgba(255, 255, 255, 0.03);
    transition: all var(--transition-normal);
    border-radius: var(--border-radius-md);
    margin: 0 1rem 1rem;

    &:focus {
      background: rgba(255, 255, 255, 0.05);
      border-color: var(--accent-purple);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
}

@media (max-width: 60rem) {
  main {
    grid-template-columns: 100%;
    grid-template-rows: 4rem 4rem auto;
  }

  .action-buttons {
    grid-row: 1 / 2;
    justify-self: center !important;
    margin-left: 0 !important;
  }

  input {
    grid-row: 2 / 3;
    justify-self: center !important;
    margin-right: 0 !important;
  }

  textarea {
    grid-row: 3 / 4;
  }
}
</style>
