import * as vR from "vue-router";
import { useAuthStore } from '../@Stores/authStore';
import Home from '@pages/home.vue';
import Register from '@pages/register.vue';
import Login from '@pages/login.vue';
import Logout from '@pages/logout.vue';
import Stops from '@pages/stops.vue';
import StopDetails from '@pages/stopDetails.vue';

const _routes: Array<vR.RouteRecordRaw> = [
    {
      path: '/',
      component: Home,
      name: "home",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/stops',
      component: Stops,
      name: "home.stops",
    },
    {
      path: '/stops/:id',
      name: 'StopDetails',
      component: StopDetails,
      props: true,
    },
    {
      path: '/register',
      component: Register,
      name: "home.insecurePage",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      component: Login,
      name: "home.auth",
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/logout',
      component: Logout,
      name: "home.missing",
      meta: {
        requiresAuth: true
      }
    },
];

const router = vR.createRouter({
  history: vR.createWebHistory(),
  routes: _routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
      next('/login'); // Redirect to login if not authenticated
    } else {
      next();
    }
  });

export default router;