const prefix = "/pages";
const BanksoalRoutes = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/banksoal/list",
        component: () => import("@/views/admin/banksoal/BanksoalLayout.vue"),
        redirect: `${prefix}/banksoal`,
        children: [
          {
            path: `${prefix}/banksoal`,
            name: "admin.banksoal",
            component: () => import("@/views/admin/banksoal/BanksoalIndex.vue"),
          },
          {
            path: `${prefix}/banksoal/create`,
            name: "admin.banksoal.create",
            component: () =>
              import("@/views/admin/banksoal/BanksoalCreate.vue"),
          },
          {
            path: `${prefix}/banksoal/kategori/layout`,
            component: () =>
              import("@/views/admin/banksoal/BanksoalKategoriLayout.vue"),
            children: [
              {
                path: `${prefix}/banksoal/kategori`,
                name: "admin.banksoal.kategori",
                component: () =>
                  import(
                    "@/views/admin/banksoal/kategori/BanksoalKategoriIndex.vue"
                  ),
              },
              {
                path: `${prefix}/banksoal/kategori/tambah`,
                name: "admin.banksoal.kategori.tambah",
                component: () =>
                  import(
                    "@/views/admin/banksoal/kategori/BanksoalKategoriTambah.vue"
                  ),
              },
              {
                path: `${prefix}/banksoal/kategori/edit/:id`,
                name: "admin.banksoal.kategori.edit",
                component: () =>
                  import(
                    "@/views/admin/banksoal/kategori/BanksoalKategoriEdit.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default BanksoalRoutes;
