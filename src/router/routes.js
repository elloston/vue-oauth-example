/**
 * router/routes.js
 */

import { useAuthStore } from "@/stores/authStore";
import HomeView from "@/views/HomeView.vue";

const routes = [
  { path: "/", component: HomeView },
  {
    path: "/login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/signup",
    component: () => import("@/views/SignupView.vue"),
  },
  {
    path: "/account",
    component: () => import("@/views/AccountView.vue"),
  },
  {
    path: "/oauth",
    component: { template: "<div>OAuth</div>" },
    beforeEnter: (to) => {
      const authStore = useAuthStore();
      const token = to.query.token;

      if (token) {
        authStore.setToken(token);
        authStore.getUser();
        return { path: "/" };
      }
    },
  },
];

export default routes;
