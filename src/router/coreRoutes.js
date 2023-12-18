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
    
    meta: {
      requiresAuth: true,
    },
    children: [


      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("pages/core/DashboardPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "notification",
        name: "Notification",
        component: () => import("pages/core/NotificationPage.vue"),
        meta: {
          requiresAuth: true,
        },
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/core/ErrorNotFound.vue"),
  },
];

export default coreRoutes;

