import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from "../views/Main.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Main
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
