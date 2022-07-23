import { createRouter, createWebHistory } from "vue-router";
import LandingRoutes from "./LandingRoutes";
import AdminRoutes from "./AdminRoutes";
import BanksoalRoutes from "./BanksoalRoutes";

const routes = [];

routes.push(...LandingRoutes, ...AdminRoutes, ...BanksoalRoutes);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
