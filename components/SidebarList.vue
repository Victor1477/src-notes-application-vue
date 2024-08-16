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
  background-color: rgb(40, 40, 40);
  border-right: 1px solid black;

  @include scrollbar;

  input {
    background-color: rgb(120, 120, 120);
    outline: none;
    border: none;
    margin: 1rem;
    font-size: 1.1rem;
    padding: 0.3rem;
    min-width: 70%;
    border-radius: 1rem;
    text-align: center;

    &::placeholder {
      color: black;
    }
  }

  ul {
    list-style: none;
    overflow-y: scroll;
    max-height: 75vh;

    li {
      padding: 1rem;
      width: 100%;
      text-align: center;
      color: white;
      background-color: rgb(60, 60, 60);
      margin-bottom: 0.3rem;
      font-size: 1rem;
      cursor: pointer;
      transition: all 100ms linear;

      &:hover {
        background-color: rgb(120, 120, 120);
        font-size: 1.1rem;
        font-weight: bold;
      }
    }
  }
}
</style>
