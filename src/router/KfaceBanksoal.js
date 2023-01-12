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
