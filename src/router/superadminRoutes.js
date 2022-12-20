const superadminRoutes = [
  {
    path: "/superadmin",
    name: "superadmin",
    component: () => import("@/layouts/AdminLayout.vue"),
    redirect: "/superadmin/index",
    children: [
      {
        path: "/superadmin/index",
        name: "superadmin.index",
        component: () => import("@/views/admin/superadmin/SuperadminIndex.vue"),
      },
    ],
  },
];
export default superadminRoutes;
