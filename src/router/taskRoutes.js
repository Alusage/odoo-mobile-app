const contactsRoutes = [
  {
    path: "/task",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Task",
        component: () => import("src/pages/task/TaskPage.vue"),
        meta: {
          requiresAuth: true,
        },
      }
    ]

  },
];

export default contactsRoutes;

