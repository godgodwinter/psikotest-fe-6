const prefix = "/pages";
const KfaceBanksoal = [
    {
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
            {
                path: "/pages/kface/list",
                component: () => import("@/views/admin/kface/banksoal/Layout.vue"),
                redirect: `${prefix}/kface/banksoal/aspek`,
                children: [
                    {
                        path: `${prefix}/kface/banksoal/aspek`,
                        name: "admin.kface.banksoal.aspek",
                        component: () => import("@/views/admin/kface/banksoal/AspekIndex.vue"),
                    },
                    {
                        path: `${prefix}/kface/banksoal/aspek/create`,
                        name: "admin.kface.banksoal.aspek.create",
                        component: () => import("@/views/admin/kface/banksoal/AspekCreate.vue"),
                    },
                    {
                        path: `${prefix}/kface/banksoal/aspek/edit/:aspek_id`,
                        name: "admin.kface.banksoal.aspek.edit",
                        component: () => import("@/views/admin/kface/banksoal/AspekEdit.vue"),
                    },
                    {
                        path: `${prefix}/kface/banksoal/soal`,
                        name: "admin.kface.banksoal.soal",
                        component: () => import("@/views/admin/kface/banksoal/SoalIndex.vue"),
                    },
                    {
                        path: `${prefix}/kface/banksoal/soal/create`,
                        name: "admin.kface.banksoal.soal.create",
                        component: () => import("@/views/admin/kface/banksoal/SoalCreate.vue"),
                    },
                    {
                        path: `${prefix}/kface/banksoal/soal/edit/:soal_id`,
                        name: "admin.kface.banksoal.soal.edit",
                        component: () => import("@/views/admin/kface/banksoal/SoalEdit.vue"),
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

export default KfaceBanksoal;
