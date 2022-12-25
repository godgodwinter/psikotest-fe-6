const prefix = "/pages";
const SkolastikBanksoalRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/skolastik/list",
        component: () => import("@/views/admin/skolastik/banksoal/Layout.vue"),
        redirect: `${prefix}/skolastik/banksoal/aspek`,
        children: [
          {
            path: `${prefix}/skolastik/banksoal/aspek`,
            name: "admin.skolastik.banksoal.aspek",
            component: () => import("@/views/admin/skolastik/banksoal/AspekIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/aspek_sub`,
            name: "admin.skolastik.banksoal.aspek_sub",
            component: () => import("@/views/admin/skolastik/banksoal/AspekSubIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/soal/create/:aspek_id?`,
            name: "admin.skolastik.banksoal.soal.create",
            component: () => import("@/views/admin/skolastik/banksoal/SoalCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/soal/index/:aspek_id`,
            name: "admin.skolastik.banksoal.soal.index",
            component: () => import("@/views/admin/skolastik/banksoal/SoalIndex.vue"),
          },
        ],
      },
      // {
      //   path: "/pages/skolastik/aspek/list",
      //   component: () => import("@/views/admin/skolastik/aspek/Layout.vue"),
      //   redirect: `${prefix}/skolastik/aspek`,
      //   children: [
      //     {
      //       path: `${prefix}/skolastik/aspek`,
      //       name: "admin.skolastik.aspek",
      //       component: () => import("@/views/admin/skolastik/aspek/Index.vue"),
      //     },
      //   ],
      // },
    ],
  },
];

export default SkolastikBanksoalRoutes;
