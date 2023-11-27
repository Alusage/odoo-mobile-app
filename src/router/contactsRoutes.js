const contactsRoutes = [
  {
    path: "/contacts",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Contacts",
        component: () => import("src/pages/contacts/ContactsPage.vue")
      }
    ]

  },
];

export default contactsRoutes;

