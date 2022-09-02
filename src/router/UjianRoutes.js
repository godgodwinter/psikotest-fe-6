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
            path: `${prefix}/index/:ujian_proses_id`,
            name: "admin.ujian.kelas",
            component: () => import("@/views/admin/ujian/UjianKelas.vue"),
          },
          {
            path: `${prefix}/index/:ujian_proses_id/kelas/:proses_kelas_id`,
            name: "admin.ujian.kelas.detail",
            component: () => import("@/views/admin/ujian/UjianKelasDetail.vue"),
          },
          {
            path: `${prefix}/index/:ujian_proses_id/kelas/:proses_kelas_id/siswa/:siswa_id`,
            name: "admin.ujian.kelas.detail.siswa",
            component: () => import("@/views/admin/ujian/UjianKelasDetailSiswa.vue"),
          },
          {
            path: `${prefix}/index/:ujian_proses_id/kelas/:proses_kelas_id/siswa/:siswa_id/kategori/:kategori_id`,
            name: "admin.ujian.kelas.detail.siswa.kategori",
            component: () => import("@/views/admin/ujian/UjianKelasDetailSiswaKategori.vue"),
          },
          {
            path: `${prefix}/index/:ujian_proses_id/create`,
            name: "admin.ujian.kelas.create",
            component: () => import("@/views/admin/ujian/UjianKelasCreate.vue"),
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
            path: `${prefix}/paketsoal/:paketsoal_id?/kategori`,
            name: "admin.ujian.paketsoal.kategori",
            component: () =>
              import("@/views/admin/ujian/paketsoal/PaketSoalKategori.vue"),
          },
          {
            path: `${prefix}/paketsoal/:paketsoal_id?/kategori/create`,
            name: "admin.ujian.paketsoal.kategori.create",
            component: () =>
              import(
                "@/views/admin/ujian/paketsoal/PaketSoalKategoriCreate.vue"
              ),
          },
          {
            path: `${prefix}/paketsoal/:paketsoal_id?/kategori/detail/:kategori_id`,
            name: "admin.ujian.paketsoal.kategori.detail",
            component: () =>
              import(
                "@/views/admin/ujian/paketsoal/PaketSoalKategoriDetail.vue"
              ),
          },
          {
            path: `${prefix}/paketsoal/:paketsoal_id?/kategori/detail/:kategori_id/create/:ujian_kategori_id`,
            name: "admin.ujian.paketsoal.kategori.detail.create",
            component: () =>
              import(
                "@/views/admin/ujian/paketsoal/PaketSoalKategoriDetailCreate.vue"
              ),
          },
        ],
      },
    ],
  },
];

export default BanksoalRoutes;
