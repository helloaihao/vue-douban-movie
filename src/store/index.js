import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    listCountMax: 10,
    myMovie: [],
  },

  mutations: {
    addWantSee: (state, movie) => {
      movie.seeState = 1;
      state.myMovie.push(movie);
    },
    addHasSee: (state, movie) => {
      movie.seeState = 2;
      state.myMovie.push(movie);
    },
    removeMovie: (state, movie) => (
      state.myMovie = state.myMovie.filter(m => m.id !== movie.id)
    ),
  },

  getters: {
    findWantSee: state => state.myMovie.filter(m => (m.seeState === 1)),
    findHasSee: state => state.myMovie.filter(m => (m.seeState === 2)),
  },
});
