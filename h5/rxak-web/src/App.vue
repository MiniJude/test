<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 08:38:38
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-04 11:44:04
 * @Description: 
 * @FilePath: \rxak-web\src\App.vue
-->
<template>
  <router-view v-slot="{ Component }">
    <transition>
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
</script>

<style lang="less" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;

  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }

  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
