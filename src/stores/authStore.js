/**
 * stores/authStore.js
 */

import { defineStore } from "pinia";
import api from "@/api";
import { setCookie, deleteCookie, getCookie } from "@/utils/cookies";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: getCookie("user_token"),
  }),
  getters: {
    isAuthorized: (state) => {
      return (requiredRoles) =>
        requiredRoles.some((role) =>
          state.user?.roles.some((userRole) => userRole.name === role)
        );
    },
  },
  actions: {
    setToken(token) {
      this.token = token;
      setCookie("user_token", token, { expires: 365, secure: true });
    },
    unsetToken() {
      this.user = null;
      this.token = null;
      deleteCookie("user_token");
      delete api.defaults.headers.common["Authorization"];
    },
    async getUser() {
      try {
        if (!this.token) return;
        const { data } = await api.get("user");
        this.user = data;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async signup(credentials) {
      try {
        const { data } = await api.post("signup", credentials);
        this.setToken(data.token);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async login(credentials) {
      try {
        const { data } = await api.post("login", credentials);
        this.setToken(data.token);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    async logout() {
      if (!this.token) return;
      try {
        await api.post("logout");
        this.unsetToken();
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    redirect(provider) {
      window.location.href = `${
        import.meta.env.VITE_LARAVEL_URL
      }/oauth/${provider}`;
    },
  },
});
