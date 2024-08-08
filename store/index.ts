export const state = () => ({
  notes: [],
  auth: { token: null },
});

export const mutations = {
  setNotes: (state: any, payload: any) => (state.notes = payload),
  setToken: (state: any, payload: any) => (state.auth.token = payload),
};

export const actions = {
  loadNotes({ commit }: any, payload: any) {
    commit("setNotes", payload);
  },
  setToken({ commit }: any, payload: any) {
    commit("setToken", payload);
  },
};

export const getters = {
  notes: (state: any) => state.notes,
  token: (state: any) => state.auth.token,
};
