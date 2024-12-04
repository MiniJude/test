/*
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 10:17:43
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-04 16:30:28
 * @Description:
 * @FilePath: \rxak-web\src\router\index.ts
 */
import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/form",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/home.vue"),
  },
  {
    path: "/form",
    name: "form",
    component: () => import("@/views/form.vue"),
  },
  {
    path: "/result",
    name: "result",
    component: () => import("@/views/result.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
