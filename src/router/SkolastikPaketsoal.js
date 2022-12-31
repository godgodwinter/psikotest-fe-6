const prefix = "/pages";
const SkolastikPaketsoal = [
  {
    component: () => import("@/layouts/AdminLayout.vue"),
    children: [
      {
        path: "/pages/paketsoal/list",
        component: () => import("@/views/admin/skolastik/paketsoal/Layout.vue"),
        redirect: `${prefix}/paketsoal`,
        children: [
          {
            path: `${prefix}/skolastik/paketsoal`,
            name: "admin.skolastik.paketsoal",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalIndex.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/create`,
            name: "admin.skolastik.paketsoal.create",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalCreate.vue"),
          },
          {
            path: `${prefix}/skolastik/paketsoal/edit/:paketsoal_id`,
            name: "admin.skolastik.paketsoal.edit",
            component: () => import("@/views/admin/skolastik/paketsoal/PaketsoalEdit.vue"),
          },
        ],
      },
    ],
  },
];

export default SkolastikPaketsoal;
