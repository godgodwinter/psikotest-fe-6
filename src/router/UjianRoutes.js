const prefix = "/pages/ujian";
const BanksoalRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: `${prefix}/list`,
        component: () => import("@/views/admin/ujian/UjianLayout.vue"),
        redirect: `${prefix}/index`,
        children: [
          {
            path: `${prefix}/index`,
            name: "admin.ujian",
            component: () => import("@/views/admin/ujian/UjianIndex.vue"),
          },
          {
            path: `${prefix}/create`,
            name: "admin.ujian.create",
            component: () => import("@/views/admin/ujian/UjianCreate.vue"),
          },
          {
            path: `${prefix}/paketsoal`,
            name: "admin.ujian.paketsoal",
            component: () =>
              import("@/views/admin/ujian/paketsoal/PaketSoalIndex.vue"),
          },
          {
            path: `${prefix}/paketsoal/create`,
            name: "admin.ujian.paketsoal.create",
            component: () =>
              import("@/views/admin/ujian/paketsoal/PaketSoalCreate.vue"),
          },
          {
            path: `${prefix}/paketsoal/kategori`,
            name: "admin.ujian.paketsoal.kategori",
            component: () =>
              import("@/views/admin/ujian/paketsoal/PaketSoalKategori.vue"),
          },
          {
            path: `${prefix}/paketsoal/kategori/create`,
            name: "admin.ujian.paketsoal.kategori.create",
            component: () =>
              import(
                "@/views/admin/ujian/paketsoal/PaketSoalKategoriCreate.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default BanksoalRoutes;
