// store/index.js
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: localStorage.getItem('token') || '',
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    clearAuth(state) {
      state.user = null;
      state.token = '';
      localStorage.removeItem('token');
    },
  },
  actions: {
    async login({ commit }, userData) {
      const response = await axios.post('http://localhost:5000/api/user/login', userData);
      commit('setToken', response.data.token);
      localStorage.setItem('token', response.data.token);
    },
    async logout({ commit }) {
      commit('clearAuth');
    },
  },
  modules: {},
});
