const contactRoutes = [
  {
    path: "/contact",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Contact",
        component: () => import("src/pages/contact/ContactPage.vue")
      }
    ]

  },
];

export default contactRoutes;

