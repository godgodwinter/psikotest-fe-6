const LandingRoutes = [
  {
    path: "/",
    name: "Landing",
    component: () => import("@/layouts/LandingLayout.vue"),
    redirect: "/",
    children: [
      {
        path: "/",
        name: "LandingIndex",
        component: () => import("@/views/landing/LandingLogin.vue"),
      },
      {
        path: "/login",
        name: "LandingLogin",
        component: () => import("@/views/landing/LandingLogin.vue"),
      },
      {
        path: "/404",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue"),
      },
      {
        path: "/locked",
        name: "Locked",
        component: () => import("@/views/Locked.vue"),
      },
      {
        path: "/maintenance",
        name: "Maintenance",
        component: () => import("@/views/Maintenance.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404",
  },
];
export default LandingRoutes;
