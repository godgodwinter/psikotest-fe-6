const prefix = "/pages";
const BanksoalRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: `${prefix}/banksoal`,
        name: "admin-banksoal",
        component: () => import("@/views/admin/banksoal/BanksoalIndex.vue"),
      },
    ],
  },
];

export default BanksoalRoutes;
