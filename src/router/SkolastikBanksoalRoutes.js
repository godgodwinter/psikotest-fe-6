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
            path: `${prefix}/skolastik/banksoal/aspek/create`,
            name: "admin.skolastik.banksoal.aspek.create",
            component: () => import("@/views/admin/skolastik/banksoal/AspekCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/aspek/edit/:aspek_id`,
            name: "admin.skolastik.banksoal.aspek.edit",
            component: () => import("@/views/admin/skolastik/banksoal/AspekEdit.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/aspek_sub`,
            name: "admin.skolastik.banksoal.aspek_sub",
            component: () => import("@/views/admin/skolastik/banksoal/AspekSubIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/aspek_sub/create`,
            name: "admin.skolastik.banksoal.aspek_sub.create",
            component: () => import("@/views/admin/skolastik/banksoal/AspekSubCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/aspek_sub/edit/:aspek_sub_id`,
            name: "admin.skolastik.banksoal.aspek_sub.edit",
            component: () => import("@/views/admin/skolastik/banksoal/AspekSubEdit.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/soal/index/:aspek_id`,
            name: "admin.skolastik.banksoal.soal.index",
            component: () => import("@/views/admin/skolastik/banksoal/SoalIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/soal/create/:aspek_id?`,
            name: "admin.skolastik.banksoal.soal.create",
            component: () => import("@/views/admin/skolastik/banksoal/SoalCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/banksoal/soal/edit/:aspek_id?/soal/:soal_id`,
            name: "admin.skolastik.banksoal.soal.edit",
            component: () => import("@/views/admin/skolastik/banksoal/SoalEdit.vue"),
          },
          {
            path: "/pages/skolastik/sekolah/:id/detail",
            component: () => import("@/views/admin/sekolah/Detail.vue"),
            name: "admin.skolastik.submenu.layout",
            redirect: "pages/admin/skolastik/submenu/:id/skolastik",
            children: [
              {
                path: "/pages/admin/skolastik/submenu/:id/sekolastik/kelas/:kelas_id?",
                component: () =>
                  import("@/views/admin/skolastik/submenu/SkolastikProsesIndex.vue"),
                  name: "admin.skolastik.submenu.proses",
              },
            ]
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
