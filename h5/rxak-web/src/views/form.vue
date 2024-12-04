<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 16:28:34
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-04 17:18:17
 * @Description: 
 * @FilePath: \rxak-web\src\views\form.vue
-->
<template>
    <div class="page">
        <img style="width: 100%;" src="@/assets/images/img_bg1@2x.png" alt="">
        <!-- 以下是绝对定位的元素 -->
        <img class="title_img" src="@/assets/images/img_top1@2x.png" alt="">
        <div class="form_panel">

        </div>
    </div>
</template>

<style lang="less" scoped>
.page {
    font-size: 0;
    position: relative;
    background: url('@/assets/images/img_bg2@2x.png') no-repeat top;
    background-size: 100%;
    height: 1000px;

    .title_img {
        position: absolute;
        top: 19px;
        left: 32px;
        width: 317px;
    }

    .form_panel {
        position: absolute;
        top: 181px;
        width: 343px;
        height: 175px;
        left: 50%;
        transform: translateX(-50%);
        background: #FFFFFF;
        border-radius: 4px 12px 4px 12px;
        border: 1px solid #FFFFFF;
        &::after {
            content: '';
            display: block;
            position: absolute;
            left: 1px;
            top: 1px;
            right: 1px;
            bottom: 1px;
            border-radius: 4px 12px 4px 12px;
            border: 3px solid #83c9f1;
        }
    }
}
</style>