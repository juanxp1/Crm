import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
  {
    path: "/dashboard",
    component: () => import("@/views/Dashboard.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true }, 
      },
      {
        path: "facturacion",
        name: "Facturacion",
        component: () => import("@/components/Facturacion.vue"),
        meta: { requiresAuth: true }, 
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Verificar si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    // Verificar si el usuario tiene un token válido en el localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redireccionar al inicio de sesión
      next("/");
    } else {
      // Si hay token, permitir el acceso a la ruta
      next();
    }
  } else {
    // Si la ruta no requiere autenticación, permitir el acceso
    next();
  }
});

export default router;
