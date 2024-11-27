import { defineStore } from 'pinia';
import authService from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: authService.isAuthenticated(),
    user: null as null | { id: string,  email: string },
  }),

  actions: {
    async login(email: string, password: string) {
      try {
        const id = await authService.login({ email, password });
        this.isLoggedIn = true;
        this.user = { id: id, email: email };
      } catch (error) {
        console.error('Login failed:', error);
        throw error;
      }
    },

    async signup(id: string, email: string, password: string, passwordConfirm: string) {
      try {
        await authService.signup({ id, email, password, passwordConfirm });
      } catch (error) {
        console.error('Signup failed:', error);
        throw error;
      }
    },

    logout() {
      authService.logout();
      this.isLoggedIn = false;
      this.user = null;
    },

    getUserId() {
      return this.user?.id || authService.userId();
    }
  },
}); 