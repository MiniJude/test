<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 10:20:48
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-04 16:35:04
 * @Description: 
 * @FilePath: \rxak-web\src\views\home.vue
-->
<template>
    <div class="page">
        <img style="width: 100%;" src="@/assets/images/home_s.jpg" alt="">
        <div class="btn" @click="handleClick"></div>
    </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function handleClick() {
    router.push('/form')
}

</script>
<style lang="less" scoped>
.page {
    font-size: 0;
    position: relative;
    .btn {
        width: 140px;
        border-radius: 10px;
        height: 48px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 98px;
    }
}
</style>