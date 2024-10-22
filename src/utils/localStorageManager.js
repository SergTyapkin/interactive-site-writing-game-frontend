import {FragmentModel, UserModel} from "~/models";
import validateModel from "@sergtyapkin/models-validator";

const _PropertyNames = {
  user: 'user',
  selectedFragment: 'selected-fragment',
}


export default class LocalStorageManager {
  userData = {isLogined: false};

  // ---- User Data ----
  saveUser(userData) {
    localStorage.setItem(_PropertyNames.user, JSON.stringify(userData));
    userData = validateModel(UserModel, userData)
    this.userData.id = userData.id;
    this.userData.username = userData.username;
    this.userData.isAdmin = userData.isAdmin;
    this.userData.isLogined = true;
  }
  loadUser() {
    const user = localStorage.getItem(_PropertyNames.user);
    if (user === null) {
      return null;
    }
    const userData = validateModel(UserModel, user);
    this.userData.id = userData.id;
    this.userData.username = userData.username;
    this.userData.isAdmin = userData.isAdmin;
    this.userData.isLogined = true;
    return userData;
  }
  removeUser() {
    delete this.userData.id;
    delete this.userData.username;
    delete this.userData.isAdmin;
    this.userData.isLogined = false;
    localStorage.removeItem(_PropertyNames.user);
  }


  // ---- Selected Fragment ----
  saveSelectedFragment(fragmentData) {
    localStorage.setItem(_PropertyNames.selectedFragment, JSON.stringify(validateModel(FragmentModel, fragmentData)));
  }
  loadSelectedFragment() {
    const fragment = localStorage.getItem(_PropertyNames.selectedFragment);
    if (fragment === null) {
      return null;
    }
    return validateModel(FragmentModel, fragment);
  }
  removeSelectedFragment() {
    localStorage.removeItem(_PropertyNames.selectedFragment);
  }
}
