/*
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 08:38:38
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-04 11:41:40
 * @Description: 
 * @FilePath: \rxak-web\src\main.ts
 */
import { createApp } from "vue";
// import "reset-css";
import "./style.css";
import router from './router';
import App from "./App.vue";
import Vant from 'vant';
import 'vant/lib/index.css';

createApp(App).use(router).use(Vant).mount("#app");
