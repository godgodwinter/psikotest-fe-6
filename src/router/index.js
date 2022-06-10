import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// layouts
import LandingLayout from '../layouts/LandingLayout.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
// pages
import NotFound from '../views/NotFound.vue';
import Locked from '../views/Locked.vue';
import Maintenance from '../views/Maintenance.vue';
// import LandingIndex from '../views/landing/LandingIndex.vue';
import LandingLogin from '../views/landing/LandingLogin.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: LandingLayout,
      redirect: '/',
      children: [
        {
          path: '/',
          name: 'LandingIndex',
          component: LandingLogin,
        },
        {
          path: '/login',
          name: 'LandingLogin',
          component: LandingLogin,
        },
        {
          path: '/404',
          name: 'NotFound',
          component: NotFound,
        },
        {
          path: '/locked',
          name: 'Locked',
          component: Locked,
        },
        {
          path: '/maintenance',
          name: 'Maintenance',
          component: Maintenance,
        },
      ],
    },
    {
      path: '/:catchAll(.*)', redirect: '/404',
    },

    {
      path: '/pages/',
      name: 'LandingAdmin',
      component: AdminLayout,
      redirect: '/pages/admin',
      children: [
        {
          path: '/pages/admin',
          name: 'AdminDashboard',
          component: () => import("@/views/admin/DashBoard.vue"),
        },
        {
          path: '/pages/sekolah',
          component: () => import("@/views/admin/sekolah/Index.vue"),
          name: 'AdminSekolah',
        },
        {
          path: '/pages/sekolah/:id',
          component: () => import("@/views/admin/sekolah/Edit.vue"),
          name: 'AdminSekolahEdit',
        },
        {
          path: '/pages/sekolah/:id/detail',
          component: () => import("@/views/admin/sekolah/Detail.vue"),
          name: 'AdminSekolahDetail',
          redirect: 'pages/admin/sekolahdetail/:id/dashboard',
          children: [
            {
              path: '/pages/admin/sekolahdetail/:id/dashboard',
              component: () => import("@/views/admin/sekolah/submenu/SekolahDashboard.vue"),
              name: 'AdminSekolahDetailDashboard',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/siswa',
              component: () => import("@/views/admin/sekolah/submenu/siswa/Index.vue"),
              name: 'AdminSekolahDetailSiswa',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/kelas',
              component: () => import("@/views/admin/sekolah/submenu/kelas/Index.vue"),
              name: 'AdminSekolahDetailKelas',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/walikelas',
              component: () => import("@/views/admin/sekolah/submenu/walikelas/Index.vue"),
              name: 'AdminSekolahDetailWalikelas',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/pengguna',
              component: () => import("@/views/admin/sekolah/submenu/pengguna/Index.vue"),
              name: 'AdminSekolahDetailPengguna',
            },
            // hasil psikologi
            {
              path: '/pages/admin/sekolahdetail/:id/hasilpsikologi',
              component: () => import("@/views/admin/sekolah/submenu/hasilpsikologi/Index.vue"),
              name: 'AdminSekolahDetailHasilpsikologi',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/nilaipsikolgisiswa',
              component: () => import("@/views/admin/sekolah/submenu/nilaipsikolgisiswa/Index.vue"),
              name: 'AdminSekolahDetailNilaipsikolgiSiswa',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/minatbakat',
              component: () => import("@/views/admin/sekolah/submenu/minatbakat/Index.vue"),
              name: 'AdminSekolahDetailMinatbakat',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/penjurusan',
              component: () => import("@/views/admin/sekolah/submenu/penjurusan/Index.vue"),
              name: 'AdminSekolahDetailPenjurusan',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/kasus',
              component: () => import("@/views/admin/sekolah/submenu/kasus/Index.vue"),
              name: 'AdminSekolahDetailKasus',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/pengembangandiri',
              component: () => import("@/views/admin/sekolah/submenu/pengembangandiri/Index.vue"),
              name: 'AdminSekolahDetailPengembangandiri',
            },
            {
              path: '/pages/admin/sekolahdetail/:id/prestasi',
              component: () => import("@/views/admin/sekolah/submenu/prestasi/Index.vue"),
              name: 'AdminSekolahDetailPrestasi',
            },
          ],
        },
        {
          path: '/pages/yayasan',
          component: () => import("@/views/admin/yayasan/Index.vue"),
          name: 'AdminYayasan',
        },
        {
          path: '/pages/yayasan/tambah',
          component: () => import("@/views/admin/yayasan/Tambah.vue"),
          name: 'AdminYayasanTambah',
        },
        {
          path: '/pages/yayasan/:id/edit',
          component: () => import("@/views/admin/yayasan/Edit.vue"),
          name: 'AdminYayasanEdit',
        },
        {
          path: '/pages/yayasan/:id',
          component: () => import("@/views/admin/yayasan/Detail.vue"),
          name: 'AdminYayasanDetail',
        },
        {
          path: '/pages/klasifikasi',
          component: () => import("@/views/admin/klasifikasi/Index.vue"),
          name: 'AdminKlasifikasi',
        },
        {
          path: '/pages/klasifikasi/tambah',
          component: () => import("@/views/admin/klasifikasi/Tambah.vue"),
          name: 'AdminKlasifikasiTambah',
        },
        {
          path: '/pages/klasifikasi/:id/edit',
          component: () => import("@/views/admin/klasifikasi/Edit.vue"),
          name: 'AdminKlasifikasiEdit',
        },
        {
          path: '/pages/referensi',
          component: () => import("@/views/admin/referensi/Index.vue"),
          name: 'AdminReferensi',
        },
        {
          path: '/pages/referensi/tambah',
          component: () => import("@/views/admin/referensi/Tambah.vue"),
          name: 'AdminReferensiTambah',
        },
        {
          path: '/pages/referensi/:id/edit',
          component: () => import("@/views/admin/referensi/Edit.vue"),
          name: 'AdminReferensiEdit',
        },
        {
          path: '/pages/buletin',
          component: () => import("@/views/admin/buletin/Index.vue"),
          name: 'AdminBuletin',
        },
        {
          path: '/pages/buletin/tambah',
          component: () => import("@/views/admin/buletin/Tambah.vue"),
          name: 'AdminBuletinTambah',
        },
        {
          path: '/pages/buletin/:id/edit',
          component: () => import("@/views/admin/buletin/Edit.vue"),
          name: 'AdminBuletinEdit',
        },
        {
          path: '/pages/terapis',
          component: () => import("@/views/admin/terapis/Index.vue"),
          name: 'AdminTerapis',
        },
        {
          path: '/pages/terapis/tambah',
          component: () => import("@/views/admin/terapis/Tambah.vue"),
          name: 'AdminTerapisTambah',
        },
        {
          path: '/pages/terapis/:id/edit',
          component: () => import("@/views/admin/terapis/Edit.vue"),
          name: 'AdminTerapisEdit',
        },
        {
          path: '/pages/penanganan',
          component: () => import("@/views/admin/penanganan/Index.vue"),
          name: 'AdminPenanganan',
        },
        {
          path: '/pages/penanganan/:id/detail',
          component: () => import("@/views/admin/penanganan/Detail.vue"),
          name: 'AdminPenangananDetail',
        },
        {
          path: '/pages/katabijak',
          component: () => import("@/views/admin/katabijak/Index.vue"),
          name: 'AdminKatabijak',
        },
        {
          path: '/pages/katabijak/tambah',
          component: () => import("@/views/admin/katabijak/Tambah.vue"),
          name: 'AdminKatabijakTambah',
        },
        {
          path: '/pages/katabijak/:id/edit',
          component: () => import("@/views/admin/katabijak/Edit.vue"),
          name: 'AdminKatabijakEdit',
        },
        {
          path: '/pages/katabijak/:id/detail',
          component: () => import("@/views/admin/katabijak/Detail.vue"),
          name: 'AdminKatabijakDetail',
        },
        {
          path: '/pages/katabijak/:id/detail/tambah',
          component: () => import("@/views/admin/katabijak/DetailTambah.vue"),
          name: 'AdminKatabijakDetailTambah',
        },
        {
          path: '/pages/katabijak/:id/detail/:id2/edit',
          component: () => import("@/views/admin/katabijak/DetailEdit.vue"),
          name: 'AdminKatabijakDetailEdit',
        },
        {
          path: '/pages/owner',
          component: () => import("@/views/admin/owner/Index.vue"),
          name: 'AdminOwner',
        },
        {
          path: '/pages/owner/tambah',
          component: () => import("@/views/admin/owner/Tambah.vue"),
          name: 'AdminOwnerTambah',
        },
        {
          path: '/pages/owner/:id/edit',
          component: () => import("@/views/admin/owner/Edit.vue"),
          name: 'AdminOwnerEdit',
        },
      ],
    },
  ],
});

export default router;
