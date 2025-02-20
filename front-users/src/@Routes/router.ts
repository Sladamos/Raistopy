import * as vR from "vue-router";
import { useAuthStore } from '../@Stores/authStore';
import Home from '@pages/Home.vue';
import Register from '@pages/Register.vue';
import Login from '@pages/Login.vue';
import Logout from '@pages/Logout.vue';
import Stops from '@pages/Stops.vue';
import UserStops from '@pages/UserStops.vue';
import StopDetails from '@pages/StopDetails.vue';

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
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/userStops',
      component: UserStops,
      name: "home.userstops",
      meta: {
        requiresAuth: true
      }
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
      next('/login');
    } else {
      next();
    }
  });

export default router;