// const prefix = "/pages/sekolah";
const AdminSekolahRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/sekolah",
        component: () => import("@/views/admin/sekolah/Index.vue"),
        name: "AdminSekolah",
      },
      {
        path: "/pages/sekolah/:id",
        component: () => import("@/views/admin/sekolah/Edit.vue"),
        name: "AdminSekolahEdit",
      },
      {
        path: "/pages/sekolah/:id/detail",
        component: () => import("@/views/admin/sekolah/Detail.vue"),
        name: "AdminSekolahDetail",
        redirect: "pages/admin/sekolahdetail/:id/dashboard",
        children: [
          {
            path: "/pages/admin/sekolahdetail/:id/dashboard",
            component: () =>
              import("@/views/admin/sekolah/submenu/SekolahDashboard.vue"),
            name: "AdminSekolahDetailDashboard",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/siswa/:kelas_id?",
            component: () =>
              import("@/views/admin/sekolah/submenu/siswa/Index.vue"),
            name: "AdminSekolahDetailSiswa",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/generate",
            component: () =>
              import("@/views/admin/sekolah/submenu/siswa/Generate.vue"),
            name: "AdminSekolahDetailSiswaGenerate",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kelas",
            component: () =>
              import("@/views/admin/sekolah/submenu/kelas/Index.vue"),
            name: "AdminSekolahDetailKelas",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kelas/:id2/edit",
            component: () =>
              import("@/views/admin/sekolah/submenu/kelas/Edit.vue"),
            name: "AdminSekolahDetailKelasEdit",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/walikelas",
            component: () =>
              import("@/views/admin/sekolah/submenu/walikelas/Index.vue"),
            name: "AdminSekolahDetailWalikelas",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/walikelas/:id2/edit",
            component: () =>
              import("@/views/admin/sekolah/submenu/walikelas/Edit.vue"),
            name: "AdminSekolahDetailWalikelasEdit",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/bk",
            component: () =>
              import("@/views/admin/sekolah/submenu/bk/Index.vue"),
            name: "AdminSekolahDetailBk",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/bk/:id2/edit",
            component: () =>
              import("@/views/admin/sekolah/submenu/bk/Edit.vue"),
            name: "AdminSekolahDetailBkEdit",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengguna",
            component: () =>
              import("@/views/admin/sekolah/submenu/pengguna/Index.vue"),
            name: "AdminSekolahDetailPengguna",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengguna/tambah",
            component: () =>
              import("@/views/admin/sekolah/submenu/pengguna/Tambah.vue"),
            name: "AdminSekolahDetailPenggunaTambah",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengguna/:id/edit",
            component: () =>
              import("@/views/admin/sekolah/submenu/pengguna/Edit.vue"),
            name: "AdminSekolahDetailPenggunaEdit",
          },
          // hasil psikologi
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi",
            component: () =>
              import("@/views/admin/sekolah/submenu/hasilpsikologi/Index.vue"),
            name: "AdminSekolahDetailHasilpsikologi",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:kelas_id?",
            component: () =>
              import("@/views/admin/sekolah/submenu/hasilpsikologi/Index.vue"),
            name: "AdminHasilPsikologi",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/deteksi",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/Deteksi.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiDeteksi",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/deteksisq",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/DeteksiSq.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiDeteksiSq",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/penanganan",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/Penanganan.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiPenanganan",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/sertifikat",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/Sertifikat.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiSertifikat",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/kecerdasanmajemuk",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/KecerdasanMajemuk.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiKecerdasanMajemuk",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasilpsikologi/:id2/terapis",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/hasilpsikologi/Terapis.vue"
              ),
            name: "AdminSekolahDetailHasilpsikologiTerapis",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/nilaipsikolgisiswa/:kelas_id?",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/nilaipsikolgisiswa/Index.vue"
              ),
            name: "AdminSekolahDetailNilaipsikolgiSiswa",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/minatbakat/:kelas_id?",
            component: () =>
              import("@/views/admin/sekolah/submenu/minatbakat/Index.vue"),
            name: "AdminSekolahDetailMinatbakat",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/penjurusan/:kelas_id?",
            component: () =>
              import("@/views/admin/sekolah/submenu/penjurusan/Index.vue"),
            name: "AdminSekolahDetailPenjurusan",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/hasil_ujian/:kelas_id?",
            component: () =>
              import("@/views/admin/sekolah/submenu/hasil_ujian/Index.vue"),
            name: "AdminSekolahDetail.hasil_ujian",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kasus",
            component: () =>
              import("@/views/admin/sekolah/submenu/kasus/Index.vue"),
            name: "AdminSekolahDetailKasus",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kasus/:id2/detail",
            component: () =>
              import("@/views/admin/sekolah/submenu/kasus/Detail.vue"),
            name: "AdminSekolahDetailKasusDetail",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kasus/:id2/detail/tambah",
            component: () =>
              import("@/views/admin/sekolah/submenu/kasus/DetailTambah.vue"),
            name: "AdminSekolahDetailKasusDetailTambah",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/kasus/:id2/detail/edit/:id3",
            component: () =>
              import("@/views/admin/sekolah/submenu/kasus/DetailEdit.vue"),
            name: "AdminSekolahDetailKasusDetailEdit",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengembangandiri",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/pengembangandiri/Index.vue"
              ),
            name: "AdminSekolahDetailPengembangandiri",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengembangandiri/:id2/detail",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/pengembangandiri/Detail.vue"
              ),
            name: "AdminSekolahDetailPengembangandiriDetail",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengembangandiri/:id2/detail/tambah",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/pengembangandiri/DetailTambah.vue"
              ),
            name: "AdminSekolahDetailPengembangandiriDetailTambah",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/pengembangandiri/:id2/detail/edit/:id3",
            component: () =>
              import(
                "@/views/admin/sekolah/submenu/pengembangandiri/DetailEdit.vue"
              ),
            name: "AdminSekolahDetailPengembangandiriDetailEdit",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/prestasi",
            component: () =>
              import("@/views/admin/sekolah/submenu/prestasi/Index.vue"),
            name: "AdminSekolahDetailPrestasi",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/prestasi/detail/:id2",
            component: () =>
              import("@/views/admin/sekolah/submenu/prestasi/Detail.vue"),
            name: "AdminSekolahDetailPrestasiDetail",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/prestasi/detail/:id2/tambah",
            component: () =>
              import("@/views/admin/sekolah/submenu/prestasi/DetailTambah.vue"),
            name: "AdminSekolahDetailPrestasiDetailTambah",
          },
          {
            path: "/pages/admin/sekolahdetail/:id/prestasi/detail/:id2/edit/:id3",
            component: () =>
              import("@/views/admin/sekolah/submenu/prestasi/DetailEdit.vue"),
            name: "AdminSekolahDetailPrestasiDetailEdit",
          },
        ],
      },
    ],
  },
];

export default AdminSekolahRoutes;
