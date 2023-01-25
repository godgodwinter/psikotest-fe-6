const prefix = "/pages";
const ApiprobkRoutes = [
    {
        component: () => import("@/layouts/AdminLayout.vue"),
        children: [
            {
                path: "/pages/apiprobkv2/list",
                component: () => import("@/views/admin/apiprobkv2/Layout.vue"),
                redirect: `${prefix}/apiprobkv2/aspek`,
                children: [
                    {
                        path: `${prefix}/apiprobkv2/index`,
                        name: "admin.apiprobkv2",
                        component: () => import("@/views/admin/apiprobkv2/ApiprobkIndex.vue"),
                    },
                ],
            },
        ],
    },
];

export default ApiprobkRoutes;
