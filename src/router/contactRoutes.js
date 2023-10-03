const contactRoutes = [
  {
    path: "/contact",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "contact",
        component: () => import("src/pages/core/ContactPage.vue")
      }
    ]

  },
];

export default contactRoutes;

