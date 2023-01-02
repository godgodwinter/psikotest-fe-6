const prefix = "/pages";
const SkolastikPaketsoal = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/paketsoal/list",
        component: () => import("@/views/admin/skolastik/paketsoal/Layout.vue"),
        redirect: `${prefix}/paketsoal`,
        children: [
          {
            path: `${prefix}/skolastik/paketsoal`,
            name: "admin.skolastik.paketsoal",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/create`,
            name: "admin.skolastik.paketsoal.create",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/edit/:paketsoal_id`,
            name: "admin.skolastik.paketsoal.edit",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalEdit.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/aspek/:paketsoal_id`,
            name: "admin.skolastik.paketsoal.aspek",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalAspek.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/aspek/:paketsoal_id/create`,
            name: "admin.skolastik.paketsoal.aspek.create",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalAspekCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/aspek/:paketsoal_id/edit/:aspek_id`,
            name: "admin.skolastik.paketsoal.aspek.edit",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalAspekEdit.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/aspek/:paketsoal_id/soal/:aspek_id`,
            name: "admin.skolastik.paketsoal.aspek.soal",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalAspekSoal.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/aspek/:paketsoal_id/soal/:aspek_id/add/:banksoal_aspek_id`,
            name: "admin.skolastik.paketsoal.aspek.soal.add",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalAspekSoalAdd.vue"),
          },
        ],
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
];

export default SkolastikPaketsoal;
