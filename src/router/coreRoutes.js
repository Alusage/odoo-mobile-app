const coreRoutes = [
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "", name: "Login", component: () => import("pages/core/IndexPage.vue") },


    ],
  },
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [


      {
        path: "dashboard",
name: "Dashboard",
        component: () => import("pages/core/DashboardPage.vue"),
      },
      {
        path: "notification",
name: "Notification",
        component: () => import("pages/core/NotificationPage.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/core/ErrorNotFound.vue"),
  },
];

export default coreRoutes;

