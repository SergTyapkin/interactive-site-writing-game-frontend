import Vuex from 'vuex'
import validateModel from "@sergtyapkin/models-validator";
import {UserModel} from "~/models";
import LocalStorageManager from "~/utils/localStorageManager";

const localStorageManager = new LocalStorageManager();

const Storage = new Vuex.Store({
  state: {
    user: {
      id: String(),
      username: String(),
      isAdmin: Boolean(),

      isSignedIn: false,
    },
  },
  mutations: {
    SET_USER(state, userData) {
      localStorageManager.saveUser(userData);

      userData = validateModel(UserModel, userData)
      state.user.id = String(userData.id);
      state.user.username = String(userData.username);
      state.user.isAdmin = Boolean(userData.isAdmin);

      state.user.isSignedIn = true;
    },
    DELETE_USER(state) {
      localStorageManager.removeUser()
      state.user.isSignedIn = false;
    },
    LOAD_USER(state) {
      let userData = localStorageManager.loadUser()

      if (!userData) {
        state.user.isSignedIn = false;
        return;
      }
      userData = validateModel(UserModel, userData)
      state.user.id = String(userData.id);
      state.user.username = String(userData.username);
      state.user.isAdmin = Boolean(userData.isAdmin);

      state.user.isSignedIn = true;
    },
  },
  actions: {
    SET_USER(state, userData) {
      state.commit('SET_USER', userData);
    },
    DELETE_USER(state) {
      state.commit('DELETE_USER');
    },
    LOAD_USER(state) {
      state.commit('LOAD_USER');
    }
  }
});

export default Storage;
