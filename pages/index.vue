<template>
  <div class="page-container">
    <Header @newNote="newNote()" @toggleMobileNav="toggleMobileNav()"></Header>
    <div v-if="showSidebarMobile" class="sidebar-mobile-container" @click="toggleMobileNav()"></div>
    <SidebarList v-if="showSidebarMobile" id="sidebar-mobile" @currentNote="onCurrentNote"></SidebarList>
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
      showSidebarMobile: false,
    };
  },
  mounted() {
    if (!this.$store.getters.token) {
      this.$router.push("/authentication");
    }
  },
  methods: {
    newNote() {
      this.showEditor = true;
      setTimeout(() => {
        this.currentNote = new Note();
      }, 10);
    },
    toggleMobileNav() {
      this.showSidebarMobile = !this.showSidebarMobile;
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
  margin-top: 20%;
  font-size: 1.5rem;
  color: var(--text-secondary);
  font-weight: 400;
  letter-spacing: 0.3px;
  line-height: 2rem;
  padding: 0 2rem;
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.page-container {
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 3.5rem auto;
  position: relative;
  z-index: 1;
}

.sidebar-mobile-container {
  position: fixed;
  top: 3.5rem;
  z-index: 100;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  animation: fadeIn 0.3s ease-out;
}

#sidebar-mobile {
  position: fixed;
  z-index: 200;
  top: 3.5rem;
  width: 70%;
  height: 100%;
  animation: slideInLeft 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
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
