export const state = () => ({
  notes: [],
  currentNote: null,
});

export const mutations = {
  setNotes: (state: any, payload: any) => (state.notes = payload),
  setCurrentNote: (state: any, payload: any) => (state.currentNote = payload),
};

export const actions = {
  loadNotes({ commit }: any, payload: any) {
    commit("setNotes", payload);
  },
  setCurrentNote({ commit }: any, payload: any) {
    commit("setCurrentNote", payload);
  },
};

export const getters = {
  notes: (state: any) => state.notes,
  currentNote: (state: any) => state.currentNote,
};
