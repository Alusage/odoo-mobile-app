const coreRoutes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", component: () => import("pages/core/IndexPage.vue") },


    ],
  },
  {
    path: "/*",
    component: () => import("layouts/MainLayout.vue"),
    children: [


      {
        path: "/dashboard",

        component: () => import("pages/core/DashboardPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/core/ErrorNotFound.vue"),
  },
];

export default coreRoutes;

