<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 16:28:34
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-06 11:42:01
 * @Description: 
 * @FilePath: \rxak-web\src\views\form.vue
-->
<template>
    <div class="page">
        <img class="title_img" src="@/assets/images/img_top1@2x.png" alt="">
        <Modal class="form_panel form_panel_1" title="被保险人信息">
            <template #icon>
                <img class="form_icon" src="@/assets/svg/icon_tit1.svg" alt="">
            </template>
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
        </Modal>
        <Modal class="form_panel form_panel_2" title="投保信息">
            <template #icon>
                <img class="form_icon" src="@/assets/svg/icon_tit2.svg" alt="">
            </template>
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
            <div class="form_item form_item--number">
                <div class="form_item_label">基本保险金额</div>
                <div class="money_ipt">
                    <div class="mins_btn">
                        <img v-if="formData.ji_ben_bao_xian_jin_e <= MIN_MONEY" src="@/assets/svg/icon_mins.svg" alt="">
                        <img v-else src="@/assets/svg/icon_mins2.svg" alt=""
                            @click="formData.ji_ben_bao_xian_jin_e -= 1000">
                    </div>
                    <div>
                        <input type="number" style="width: 86px;" placeholder="请输入金额"
                            v-model="formData.ji_ben_bao_xian_jin_e">
                    </div>
                    <div class="pluss_btn">
                        <img src="@/assets/svg/icon_pluss2.svg" alt="" @click="formData.ji_ben_bao_xian_jin_e += 1000">
                    </div>
                </div>
            </div>
        </Modal>
        <div class="btn_group">
            <div class="btn_s">投保须知</div>
            <div class="btn_s">产品条款</div>
        </div>
        <div class="btn_b">生成建议书</div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Modal from '@/components/Modal.vue';

// 最低保险金额
const MIN_MONEY = 100000

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
    ji_ben_bao_xian_jin_e: MIN_MONEY
})


</script>

<style lang="less" scoped>
@import '@/styles/mixins.less';

.page {
    height: 100%;
    font-size: 0;
    position: relative;
    background: url('@/assets/images/img_bg1@2x.png') no-repeat top,
        url('@/assets/images/img_bg2@2x.png') no-repeat top,
        url('@/assets/images/img_bg2@2x.png') no-repeat bottom;
    background-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 17px;

    .title_img {
        left: 32px;
        width: 317px;
        margin-top: 19px;
    }

    .form_panel {

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
        margin-top: 115px;
    }

    .form_panel_2 {
        margin-top: 16px;
    }
}

.money_ipt {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
        text-align: center;

        &::placeholder {
            text-align: center;
        }
    }
}

.form_item--number {
    &::before {
        content: '元';
        position: absolute;
        right: 8px;
    }
}

.btn_group {
    margin-top: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;

    .btn_s {
        width: 164px;
        height: 45px;
        font-size: 18px;
        line-height: 18px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:first-child {
            background: url('@/assets/images/btn_nu1@2x.png') no-repeat center / 100%;
            color: #2897E2;
            text-shadow: 0px 1px 1px #FFFFFF;
        }

        &:last-child {
            background: url('@/assets/images/btn_nu2@2x.png') no-repeat center / 100%;
            color: #FFFFFF;
            text-shadow: 0px 1px 1px #084387;
        }
    }
}

.btn_b {
    margin-top: 13px;
    width: 345px;
    height: 45px;
    background: url('@/assets/images/btn_nu3@2x.png') no-repeat center / 100%;
    color: #FFFFFF;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 1px;
    text-shadow: 0px 1px 1px #874508;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>