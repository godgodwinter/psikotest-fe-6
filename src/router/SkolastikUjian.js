const prefix = "/pages";
const SkolastikUjian = [
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
            name: "admin.skolastik.ujian",
            component: () => import("@/views/admin/banksoal/BanksoalIndex.vue"),
          },
        ],
      },
    ],
  },
];

export default SkolastikUjian;
