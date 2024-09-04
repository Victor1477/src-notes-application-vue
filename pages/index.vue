<template>
  <div class="page-container">
    <Header @newNote="newNote()"></Header>
    <SidebarList id="sidebar" @currentNote="onCurrentNote"></SidebarList>
    <NoteEditor v-if="showEditor" :current="currentNote" @close="showEditor = false"></NoteEditor>
    <h3 v-else>Please select a note to edit/visualize or click on 'New' to create a new one.</h3>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "~/components/header.vue";
import NoteEditor from "~/components/NoteEditor.vue";
import SidebarList from "~/components/SidebarList.vue";
import Note from "~/utils/models/notes.model";

export default Vue.extend({
  data() {
    return {
      currentNote: new Note(),
      showEditor: false,
    };
  },
  mounted() {
    if (!this.$store.getters.token) {
      this.$router.push("/");
    }
  },
  methods: {
    newNote() {
      this.showEditor = true;
      setTimeout(() => {
        this.currentNote = new Note();
      }, 10);
    },
    onCurrentNote(note: Note) {
      this.showEditor = true;
      setTimeout(() => {
        this.currentNote = note;
      }, 10);
    },
  },
});
</script>

<style lang="scss" scoped>
h3 {
  text-align: center;
  margin-top: 25%;
  font-size: 1.35rem;
}

.page-container {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 3.5rem auto;
}

@media (max-width: 60rem) {
  .page-container {
    display: grid;
    height: 100vh;
    grid-template-columns: 100%;
    grid-template-rows: 3.5rem auto;
  }

  #sidebar {
    display: none;
  }
}
</style>
