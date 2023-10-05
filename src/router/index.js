// Composables
import { createRouter, createWebHistory } from 'vue-router'


const routes = [

  {
    path: '/',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Register.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: 'facturacion',
        name: 'Facturacion',
        component: () => import(/* webpackChunkName: "home" */ '@/components/Facturacion.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
