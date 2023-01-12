import { createRouter, createWebHistory } from "vue-router";
import LandingRoutes from "./LandingRoutes";
import AdminRoutes from "./AdminRoutes";
import BanksoalRoutes from "./BanksoalRoutes";
import UjianRoutes from "./UjianRoutes";
import SkolastikBanksoalRoutes from "./SkolastikBanksoalRoutes";
import SkolastikPaketsoal from "./SkolastikPaketsoal";
import KfaceBanksoal from "./KfaceBanksoal";
import KfacePaketsoal from "./KfacePaketsoal";

const routes = [];

routes.push(
  ...LandingRoutes,
  ...AdminRoutes,
  ...BanksoalRoutes,
  ...SkolastikBanksoalRoutes,
  ...SkolastikPaketsoal,
  ...UjianRoutes,
  ...KfaceBanksoal,
  ...KfacePaketsoal,
);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
