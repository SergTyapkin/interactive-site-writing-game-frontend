const _PropertyNames = {
  user: 'user',
  selectedFragment: 'selected-fragment',
}


export default class LocalStorageManager {
  // ---- User Data ----
  saveUser(userData) {
    localStorage.setItem(_PropertyNames.user, JSON.stringify(userData));
  }
  loadUser() {
    const user = localStorage.getItem(_PropertyNames.user);
    if (user === null) {
      return null;
    }
    return user;
  }
  removeUser() {
    localStorage.removeItem(_PropertyNames.user);
  }


  // ---- Selected Fragment ----
  saveSelectedFragment(fragmentData) {
    localStorage.setItem(_PropertyNames.selectedFragment, JSON.stringify(fragmentData));
  }
  loadSelectedFragment() {
    return localStorage.getItem(_PropertyNames.selectedFragment);
  }
  removeSelectedFragment() {
    localStorage.removeItem(_PropertyNames.selectedFragment);
  }
}
