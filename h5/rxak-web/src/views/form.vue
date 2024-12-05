<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 16:28:34
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-05 17:18:36
 * @Description: 
 * @FilePath: \rxak-web\src\views\form.vue
-->
<template>
    <div class="page">
        <img style="width: 100%;" src="@/assets/images/img_bg1@2x.png" alt="">
        <!-- 以下是绝对定位的元素 -->
        <img class="title_img" src="@/assets/images/img_top1@2x.png" alt="">
        <div class="form_panel form_panel_1">
            <div class="form_title">
                <img class="form_icon" src="@/assets/svg/icon_tit1.svg" alt="">
                <div class="form_title_cha">被保险人信息</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">姓名</div>
                <input type="text" placeholder="请输入姓名" v-model="formData.user_name" />
            </div>
            <div class="form_item">
                <div class="form_item_label">性别</div>
                <div class="radio_wrapper">
                    <input type="radio" value="M" name="sex" v-model="formData.sex"> <label for="sex">男</label>
                    <input type="radio" value="F" name="sex" v-model="formData.sex"> <label for="sex"
                        style="margin-right: 7px;">女</label>
                </div>
            </div>
            <div class="form_item form_item--select">
                <div class="form_item_label">年龄</div>
                <select style="flex: 1;" name="age" required v-model="formData.age">
                    <option disabled selected hidden value="">请选择年龄</option>
                    <option v-for="i in 61" :value="i - 1">{{ i - 1 }}岁</option>
                </select>
            </div>
        </div>
        <div class="form_panel form_panel_2">
            <div class="form_title">
                <img class="form_icon" src="@/assets/svg/icon_tit2.svg" alt="">
                <div class="form_title_cha">投保信息</div>
            </div>
            <div class="form_item form_item--select">
                <div class="form_item_label">保险期间</div>
                <select style="flex: 1;" required v-model="formData.bao_xian_qi_jian">
                    <option value="终身">终身</option>
                    <option value="至80周岁">至80周岁</option>
                </select>
            </div>
            <div class="form_item form_item--select">
                <div class="form_item_label">交费期间</div>
                <select style="flex: 1;" required v-model="formData.jiao_fei_qi_jian">
                    <option v-for="i in PERIOD" :value="i">{{ i }}年</option>
                </select>
            </div>
            <div class="form_item form_item--select">
                <div class="form_item_label">身故保险金</div>
                <select style="flex: 1;" required v-model="formData.shen_gu_bao_xian_jin">
                    <option value="方式一">方式一</option>
                    <option value="方式二">方式二</option>
                </select>
            </div>
            <div class="form_item">
                <div class="form_item_label">基本保险金额</div>
                <div>
                    <input type="number" placeholder="请输入金额">
                    元
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

// 不同的交费期间对应的最大年龄限制（前提是终身投保，否则最大30岁）
// 如：选择终身投保且交费期间为5年，则投保年龄最大为60岁
const AGE_LIMIT_BY_PERIOD = {
    5: 60,
    10: 55,
    15: 50,
    20: 45,
    30: 35
}

// 交费期间
const PERIOD = Object.keys(AGE_LIMIT_BY_PERIOD)

// 基本保险金的规则：x >= 10000 && x % 10000 == 0




const formData = reactive({
    user_name: '',
    age: -1,
    sex: 'M',
    // 保险期间
    bao_xian_qi_jian: '终身',
    // 交费期间
    jiao_fei_qi_jian: 5,
    // 身故保险金
    shen_gu_bao_xian_jin: '方式一',
    // 基本保险金额
    ji_ben_bao_xian_jin_e: 0
})


</script>

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
        width: 343px;
        left: 50%;
        transform: translateX(-50%);
        background: #FFFFFF;
        border-radius: 4px 12px 4px 12px;
        border: 1px solid #FFFFFF;
        padding: 10px 10px 16px;
        font-size: 13px;

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
            pointer-events: none;
        }

        .form_title {
            height: 26px;
            display: flex;
            align-items: center;
            // line-height: 40px;
            gap: 6px;
            padding-left: 2px;

            .form_icon {
                width: 20px;
            }

            .form_title_cha {
                font-size: 16px;
                font-weight: bold;
                color: #2999E5;
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    display: block;
                    width: calc(100% + 12px);
                    height: 40%;
                    bottom: 2px;
                    background-color: #def1ff;
                    z-index: -1;
                }
            }
        }

        .form_item {
            height: 40px;
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: space-between;
            padding-right: 30px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                height: 1px;
                width: 100%;
                background-image: linear-gradient(to right, #B1DDF8 0%, #B1DDF8 60%, transparent 60%);
                background-size: 12px 100%;
                background-repeat: repeat-x;
            }

            &.form_item--select {
                background: url('@/assets/svg/icon_more.svg') no-repeat right 2px center;
                background-size: 20px 20px;
            }

            .form_item_label {
                color: #231815;
                font-weight: bold;
                padding-left: 1px;
            }

            .radio_wrapper {
                display: flex;
                align-items: center;

                input {
                    width: 16px;
                    height: 16px;
                    margin: 0;
                    margin-left: 29px;
                }

                label {
                    font-size: 13px;
                    line-height: 14px;
                    margin-left: 7px;
                }
            }


        }
    }

    .form_panel_1 {
        top: 181px;
    }

    .form_panel_2 {
        top: 372px;
    }
}
</style>