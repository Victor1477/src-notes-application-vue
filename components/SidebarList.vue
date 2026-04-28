<template>
  <aside>
    <input name="search" v-model="searchInput" placeholder="Search" />
    <ul>
      <li v-for="item in notes" @click="onClick(item.id)">
        {{ item.name }}
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import Vue from "vue";
import Note from "~/utils/models/notes.model";

export default Vue.extend({
  data() {
    return {
      searchInput: "",
    };
  },
  mounted() {
    const token = this.$store.getters.token;
    const params = { headers: { Authorization: token } };
    this.$axios.$get("/notes", params).then((response: Note[]) => {
      this.$store.dispatch("loadNotes", response);
    });
  },
  computed: {
    notes() {
      let tempNotes = this.$store.getters.notes.filter((note: Note) => {
        if (note.name) {
          return note.name.toLowerCase().includes(this.searchInput.toLowerCase());
        }
        //Remove when note name become required.
        return true;
      });
      return tempNotes;
    },
  },
  methods: {
    onClick(noteId: string) {
      const note = this.notes.find((note: Note) => note.id === noteId);
      this.$emit("currentNote", note);
    },
  },
});
</script>

<style lang="scss" scoped>
@import "~/assets/css/mixins";

aside {
  text-align: center;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 1;

  @include scrollbar;

  input {
    @include input-modern;
    margin: 1.5rem 1rem;
    font-size: 1rem;
    padding: 0.75rem 1rem;
    min-width: calc(100% - 2rem);
    border-radius: var(--border-radius-lg);
    text-align: center;
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  ul {
    list-style: none;
    overflow-y: scroll;
    max-height: 75vh;
    padding: 0 0.75rem 0.75rem;

    li {
      padding: 1.2rem 1rem;
      width: 100%;
      text-align: left;
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.05);
      margin-bottom: 0.75rem;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      border-radius: var(--border-radius-md);
      transition: all var(--transition-normal);
      border: 1px solid rgba(255, 255, 255, 0.05);
      position: relative;
      overflow: hidden;
      letter-spacing: 0.3px;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: linear-gradient(180deg, var(--accent-purple), var(--accent-pink));
        transform: scaleY(0);
        transition: transform var(--transition-normal);
      }

      &:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateX(5px);
        border-color: rgba(255, 255, 255, 0.15);
        box-shadow: var(--shadow-md);

        &::before {
          transform: scaleY(1);
        }
      }

      &:active {
        transform: translateX(3px);
      }
    }
  }
}
</style>
