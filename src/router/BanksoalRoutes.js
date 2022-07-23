const prefix = "/pages";
const BanksoalRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/banksoal/list",
        component: () => import("@/views/admin/banksoal/BanksoalLayout.vue"),
        redirect: `${prefix}/banksoal`,
        children: [
          {
            path: `${prefix}/banksoal`,
            name: "admin.banksoal",
            component: () => import("@/views/admin/banksoal/BanksoalIndex.vue"),
          },
          {
            path: `${prefix}/banksoal/create`,
            name: "admin.banksoal.create",
            component: () =>
              import("@/views/admin/banksoal/BanksoalCreate.vue"),
          },
          {
            path: `${prefix}/banksoal/kategori`,
            name: "admin.banksoal.kategori",
            component: () =>
              import("@/views/admin/banksoal/BanksoalKategori.vue"),
          },
        ],
      },
    ],
  },
];

export default BanksoalRoutes;
