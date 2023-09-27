// const routes = [
//   {
//     path: "/",
//     component: () => import("layouts/MainLayout.vue"),
//     children: [
//       { path: "", component: () => import("pages/IndexPage.vue") },

//       {
//         path: "/dashboard",

//         component: () => import("pages/Dashboard.vue"),
//       },
//     ],
//   },
//   {
//     path: "/:catchAll(.*)*",
//     component: () => import("pages/ErrorNotFound.vue"),
//   },
// ];

// export default routes;

   import coreRoutes from './coreRoutes'


   const routes = [
     ...coreRoutes,


   ]

   export default routes
