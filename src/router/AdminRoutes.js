import AdminSekolahRoutes from "./AdminSekolahRoutes";
// const prefix = "/pages";
const AdminRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/admin",
        name: "AdminDashboard",
        component: () => import("@/views/admin/DashBoard.vue"),
      },
      {
        path: "/pages/settings/profile",
        name: "AdminSettingsProfile",
        component: () => import("@/views/admin/settings/MyProfile.vue"),
      },
      {
        path: "/pages/apiprobk",
        component: () => import("@/views/admin/apiprobk/Index.vue"),
        name: "AdminApiprobk",
      },
      {
        path: "/pages/yayasan",
        component: () => import("@/views/admin/yayasan/Index.vue"),
        name: "AdminYayasan",
      },
      {
        path: "/pages/yayasan/tambah",
        component: () => import("@/views/admin/yayasan/Tambah.vue"),
        name: "AdminYayasanTambah",
      },
      {
        path: "/pages/yayasan/:id/edit",
        component: () => import("@/views/admin/yayasan/Edit.vue"),
        name: "AdminYayasanEdit",
      },
      {
        path: "/pages/yayasan/:id",
        component: () => import("@/views/admin/yayasan/Detail.vue"),
        name: "AdminYayasanDetail",
      },
      {
        path: "/pages/klasifikasi",
        component: () => import("@/views/admin/klasifikasi/Index.vue"),
        name: "AdminKlasifikasi",
      },
      {
        path: "/pages/klasifikasi/tambah",
        component: () => import("@/views/admin/klasifikasi/Tambah.vue"),
        name: "AdminKlasifikasiTambah",
      },
      {
        path: "/pages/klasifikasi/:id/edit",
        component: () => import("@/views/admin/klasifikasi/Edit.vue"),
        name: "AdminKlasifikasiEdit",
      },
      {
        path: "/pages/referensi",
        component: () => import("@/views/admin/referensi/Index.vue"),
        name: "AdminReferensi",
      },
      {
        path: "/pages/referensi/tambah",
        component: () => import("@/views/admin/referensi/Tambah.vue"),
        name: "AdminReferensiTambah",
      },
      {
        path: "/pages/referensi/:id/edit",
        component: () => import("@/views/admin/referensi/Edit.vue"),
        name: "AdminReferensiEdit",
      },
      {
        path: "/pages/buletin",
        component: () => import("@/views/admin/buletin/Index.vue"),
        name: "AdminBuletin",
      },
      {
        path: "/pages/buletin/tambah",
        component: () => import("@/views/admin/buletin/Tambah.vue"),
        name: "AdminBuletinTambah",
      },
      {
        path: "/pages/buletin/:id/edit",
        component: () => import("@/views/admin/buletin/Edit.vue"),
        name: "AdminBuletinEdit",
      },
      {
        path: "/pages/terapis",
        component: () => import("@/views/admin/terapis/Index.vue"),
        name: "AdminTerapis",
      },
      {
        path: "/pages/terapis/tambah",
        component: () => import("@/views/admin/terapis/Tambah.vue"),
        name: "AdminTerapisTambah",
      },
      {
        path: "/pages/terapis/:id/edit",
        component: () => import("@/views/admin/terapis/Edit.vue"),
        name: "AdminTerapisEdit",
      },
      {
        path: "/pages/penanganan",
        component: () => import("@/views/admin/penanganan/Index.vue"),
        name: "AdminPenanganan",
      },
      {
        path: "/pages/penanganan/:id/detail",
        component: () => import("@/views/admin/penanganan/Detail.vue"),
        name: "AdminPenangananDetail",
      },
      {
        path: "/pages/katabijak",
        component: () => import("@/views/admin/katabijak/Index.vue"),
        name: "AdminKatabijak",
      },
      {
        path: "/pages/katabijak/tambah",
        component: () => import("@/views/admin/katabijak/Tambah.vue"),
        name: "AdminKatabijakTambah",
      },
      {
        path: "/pages/katabijak/:id/edit",
        component: () => import("@/views/admin/katabijak/Edit.vue"),
        name: "AdminKatabijakEdit",
      },
      {
        path: "/pages/katabijak/:id/detail",
        component: () => import("@/views/admin/katabijak/Detail.vue"),
        name: "AdminKatabijakDetail",
      },
      {
        path: "/pages/katabijak/:id/detail/tambah",
        component: () => import("@/views/admin/katabijak/DetailTambah.vue"),
        name: "AdminKatabijakDetailTambah",
      },
      {
        path: "/pages/katabijak/:id/detail/:id2/edit",
        component: () => import("@/views/admin/katabijak/DetailEdit.vue"),
        name: "AdminKatabijakDetailEdit",
      },

      {
        path: "/pages/kecerdasanmajemuk",
        component: () => import("@/views/admin/kecerdasanmajemuk/Index.vue"),
        name: "AdminKecerdasanMajemuk",
      },
      {
        path: "/pages/kecerdasanmajemuk/tambah",
        component: () => import("@/views/admin/kecerdasanmajemuk/Tambah.vue"),
        name: "AdminKecerdasanMajemukTambah",
      },
      {
        path: "/pages/kecerdasanmajemuk/:id/edit",
        component: () => import("@/views/admin/kecerdasanmajemuk/Edit.vue"),
        name: "AdminKecerdasanMajemukEdit",
      },
      {
        path: "/pages/owner",
        component: () => import("@/views/admin/owner/Index.vue"),
        name: "AdminOwner",
      },
      {
        path: "/pages/owner/tambah",
        component: () => import("@/views/admin/owner/Tambah.vue"),
        name: "AdminOwnerTambah",
      },
      {
        path: "/pages/owner/:id/edit",
        component: () => import("@/views/admin/owner/Edit.vue"),
        name: "AdminOwnerEdit",
      },


      {
        path: "/pages/rekappenilaian",
        component: () => import("@/views/admin/rekappenilaian/Index.vue"),
        name: "admin.rekappenilaian",
      },
      {
        path: "/pages/rekappenilaian/tambah",
        component: () => import("@/views/admin/rekappenilaian/Tambah.vue"),
        name: "admin.rekappenilaian.tambah",
      },
      {
        path: "/pages/rekappenilaian/:id/edit",
        component: () => import("@/views/admin/rekappenilaian/Edit.vue"),
        name: "admin.rekappenilaian.edit",
      },
    ],
  },
];

// push
AdminRoutes.push(...AdminSekolahRoutes);
export default AdminRoutes;
