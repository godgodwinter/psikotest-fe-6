const prefix = "/pages";
const KfacePaketsoal = [
    {
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
            {
                path: "/pages/kface/list",
                component: () => import("@/views/admin/kface/paketsoal/Layout.vue"),
                redirect: `${prefix}/kface/paketsoal/aspek`,
                children: [
                    {
                        path: `${prefix}/kface/paketsoal/index`,
                        name: "admin.kface.paketsoal",
                        component: () => import("@/views/admin/kface/paketsoal/PaketIndex.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/create`,
                        name: "admin.kface.paketsoal.create",
                        component: () => import("@/views/admin/kface/paketsoal/PaketCreate.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/edit/:paketsoal_id`,
                        name: "admin.kface.paketsoal.edit",
                        component: () => import("@/views/admin/kface/paketsoal/PaketEdit.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/detail/:paketsoal_id/aspek`,
                        name: "admin.kface.paketsoal.aspek",
                        component: () => import("@/views/admin/kface/paketsoal/PaketDetailAspek.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/detail/:paketsoal_id/aspek/add`,
                        name: "admin.kface.paketsoal.aspek.add",
                        component: () => import("@/views/admin/kface/paketsoal/PaketDetailAspekAdd.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/detail/:paketsoal_id/soal`,
                        name: "admin.kface.paketsoal.soal",
                        component: () => import("@/views/admin/kface/paketsoal/PaketDetailSoal.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/detail/:paketsoal_id/soal/add`,
                        name: "admin.kface.paketsoal.soal.add",
                        component: () => import("@/views/admin/kface/paketsoal/PaketDetailSoalAdd.vue"),
                    },
                ],
            },
            {
                path: "/pages/kface/sekolah/:id/detail",
                component: () => import("@/views/admin/sekolah/Detail.vue"),
                name: "admin.kface.submenu.layout",
                redirect: "pages/admin/kface/submenu/:id/kface",
                children: [
                    {
                        path: "/pages/admin/kface/submenu/:id/kface/kelas/:kelas_id?",
                        component: () =>
                            import("@/views/admin/kface/submenu/KfaceProsesIndex.vue"),
                        name: "admin.kface.submenu.proses",
                    },
                    {
                        path: "/pages/admin/kface/submenu/:id/kface/kelas/:kelas_id/siswa/:siswa_id",
                        component: () =>
                            import("@/views/admin/kface/submenu/KfaceProsesDetail.vue"),
                        name: "admin.kface.submenu.proses.detail",
                    },
                    // {
                    //     path: "/pages/admin/kface/submenu/:id/sekolastik/kelas/:kelas_id/siswa/:siswa_id?",
                    //     component: () =>
                    //         import("@/views/admin/kface/submenu/kfaceProsesSiswa.vue"),
                    //     name: "admin.kface.submenu.proses.siswa",
                    // },
                ]
            },
        ],
    },
];

export default KfacePaketsoal;
