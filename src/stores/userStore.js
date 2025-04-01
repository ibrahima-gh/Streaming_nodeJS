import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  const setUser = (newUser) => {
    user.value = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    user.value = null;
    localStorage.removeItem('user');
  };

  return {
    user,
    setUser,
    logout,
  };
});