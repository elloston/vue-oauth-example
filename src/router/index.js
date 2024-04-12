/**
 * router/index.js
 */

import routes from "./routes";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  base: "/oauthexample",
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
