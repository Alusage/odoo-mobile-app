const contactRoutes = [
  {
    path: "/task",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "task",
        component: () => import("src/pages/task/TaskPage.vue")
      }
    ]

  },
];

export default contactRoutes;

