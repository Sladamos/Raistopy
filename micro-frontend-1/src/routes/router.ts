import * as vR from "vue-router";
import SecurePage from "@pages/SecurePage.vue";
import Pnf from "@pages/NotFoundPage.vue";

const _routes:Array<vR.RouteRecordRaw> = [
{
    path:"/",
    component:SecurePage,
    name:"home"
},
{
    path:"/insecurePage",
    component:()=> import("@pages/InsecurePage.vue"),
    name:"home.insecurePage"
},
{
    path:"/login",
    component:()=> import("@pages/AuthPage.vue"),
    name:"home.auth"
},
{
    path:"/:pathMatch(.*)*",
    component:Pnf,
    name:"home.missing"
},
];

const router = vR.createRouter({
  history: vR.createWebHistory(),
  routes: _routes,
});

export default router;