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
          path: '/pages/referensi',
          component: () => import("@/views/admin/referensi/Index.vue"),
          name: 'AdminReferensi',
        },
        {
          path: '/pages/buletin',
          component: () => import("@/views/admin/buletin/Index.vue"),
          name: 'AdminBuletin',
        },
        {
          path: '/pages/terapis',
          component: () => import("@/views/admin/terapis/Index.vue"),
          name: 'AdminTerapis',
        },
        {
          path: '/pages/penanganan',
          component: () => import("@/views/admin/penanganan/Index.vue"),
          name: 'AdminPenanganan',
        },
        {
          path: '/pages/katabijak',
          component: () => import("@/views/admin/katabijak/Index.vue"),
          name: 'AdminKatabijak',
        },
        {
          path: '/pages/owner',
          component: () => import("@/views/admin/owner/Index.vue"),
          name: 'AdminOwner',
        },
      ],
    },
  ],
});

export default router;
