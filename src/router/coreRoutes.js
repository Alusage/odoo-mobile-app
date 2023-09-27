const coreRoutes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/core/IndexPage.vue") },

      {
        path: "/dashboard",

        component: () => import("pages/core/Dashboard.vue"),
      },
    ],
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/core/ErrorNotFound.vue"),
  },
];

export default coreRoutes;

