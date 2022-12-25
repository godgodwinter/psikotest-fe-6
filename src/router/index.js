import { createRouter, createWebHistory } from "vue-router";
import LandingRoutes from "./LandingRoutes";
import AdminRoutes from "./AdminRoutes";
import BanksoalRoutes from "./BanksoalRoutes";
import UjianRoutes from "./UjianRoutes";
import SkolastikBanksoalRoutes from "./SkolastikBanksoalRoutes";
import SkolastikUjian from "./SkolastikUjian";

const routes = [];

routes.push(
  ...LandingRoutes,
  ...AdminRoutes,
  ...BanksoalRoutes,
  ...SkolastikBanksoalRoutes,
  ...SkolastikUjian,
  ...UjianRoutes
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
