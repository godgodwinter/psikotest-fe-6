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
                        path: `${prefix}/kface/paketsoal/aspek`,
                        name: "admin.kface.paketsoal.aspek",
                        component: () => import("@/views/admin/kface/paketsoal/AspekIndex.vue"),
                    },
                    {
                        path: `${prefix}/kface/paketsoal/soal`,
                        name: "admin.kface.paketsoal.soal",
                        component: () => import("@/views/admin/kface/paketsoal/SoalIndex.vue"),
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
