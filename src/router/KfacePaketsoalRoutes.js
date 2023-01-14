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

export default KfacePaketsoal;
