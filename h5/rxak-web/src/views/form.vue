<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-04 16:28:34
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-25 14:19:23
 * @Description: 
 * @FilePath: \rxak-web\src\views\form.vue
-->
<template>
    <div class="page">
        <img class="title_img" src="@/assets/images/img_top1@2x.png" alt="">
        <Modal class="form_panel form_panel_1" title="被保险人信息">
            <template #icon>
                <img class="modal_icon" src="@/assets/svg/icon_tit1.svg" alt="">
            </template>
            <div class="form_item">
                <div class="form_item_label">姓名</div>
                <div class="ipt_wrapper">
                    <input style="flex: 1;" type="text" v-model="formData.user_name" />
                    <span class="my_placeholder" v-if="!formData.user_name">请输入姓名</span>
                </div>
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
                <div class="ipt_wrapper">
                    <select style="flex: 1;" name="age" required v-model="formData.age">
                        <option disabled selected hidden value="">请选择年龄</option>
                        <option v-for="i in 61" :value="i - 1">{{ i - 1 }}周岁</option>
                    </select>
                    <span class="my_placeholder" v-if="formData.age < 0">请选择年龄</span>
                </div>
            </div>
        </Modal>
        <Modal class="form_panel form_panel_2" title="投保信息">
            <template #icon>
                <img class="modal_icon" src="@/assets/svg/icon_tit2.svg" alt="">
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
            <div class="btn_s" @click="showToubaoxuzhiModal = true">投保须知</div>
            <div class="btn_s" @click="downloadPDF">产品条款</div>
        </div>
        <div class="btn_b" @click="submit">生成建议书</div>
        <van-overlay :show="showToubaoxuzhiModal" :lock-scroll="false">
            <div class="modal-wrapper">
                <Modal title="投保须知" closable @close="showToubaoxuzhiModal = false">
                    <template #icon>
                        <img class="modal_icon" src="@/assets/images/icon_tit4@2x.png" alt="">
                    </template>
                    <Toubaoxuzhi></Toubaoxuzhi>
                </Modal>
            </div>
        </van-overlay>
    </div>

</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import Modal from '@/components/Modal.vue';
import Toubaoxuzhi from '@/views/toubaoxuzhi.vue';
import { useRouter } from 'vue-router';
import { showToast } from 'vant';
import { InsuranceType } from '@/types';

const router = useRouter()

// 最低保险金额
const MIN_MONEY = 100000

// 表单
const formData = reactive<InsuranceType>({
    user_name: '',
    age: -1,
    sex: 'M',
    bao_xian_qi_jian: '终身',
    jiao_fei_qi_jian: 5,
    shen_gu_bao_xian_jin: '方式一',
    ji_ben_bao_xian_jin_e: MIN_MONEY,
    jian_kang_deng_ji: 'A',
    jiao_fei_fang_shi: '年交',
})



// 验证姓名
const nameCheckPromiseFn = () => new Promise((resolve, reject) => {
    if (!formData.user_name) {
        reject('请输入姓名')
        return
    }
    resolve('')
})

// 验证年龄
// 不同的交费期间对应的最大年龄限制（前提是终身投保，否则最大30岁）
// 如：选择终身投保且交费期间为5年，则投保年龄最大为60岁
const AGE_LIMIT_BY_PERIOD = {
    5: 60,
    10: 55,
    15: 50,
    20: 45,
    30: 35
}
const ageCheckPromiseFn = () => new Promise((resolve, reject) => {
    const err_msg = '不符合投保年龄要求'
    if (formData.age < 0) {
        reject('请选择年龄')
        return
    }

    if (formData.bao_xian_qi_jian !== '终身' && formData.age > 30) {
        // reject('非终身投保，年龄不能超过30岁')
        reject(err_msg)
        return
    }
    if (formData.bao_xian_qi_jian === '终身' && formData.jiao_fei_qi_jian && formData.age > AGE_LIMIT_BY_PERIOD[formData.jiao_fei_qi_jian]) {
        // reject(`终身投保，交费期间为${formData.jiao_fei_qi_jian}年，年龄不能超过${AGE_LIMIT_BY_PERIOD[formData.jiao_fei_qi_jian]}岁`)
        reject(err_msg)
        return
    }
    resolve('')
})

const moneyCheckPromiseFn = () => new Promise((resolve, reject) => {
    // const err_msg = '基本保险金额不符合要求'
    if (formData.ji_ben_bao_xian_jin_e < MIN_MONEY) {
        reject('最低基本保险金额100000元')
        return
    }
    // 必须是1000的倍数
    if (formData.ji_ben_bao_xian_jin_e % 1000 !== 0) {
        reject('需为1000元的整数倍')
        return
    }
    resolve('')
})

// 交费期间
const PERIOD = Object.keys(AGE_LIMIT_BY_PERIOD)

// 投保须知模态框
const showToubaoxuzhiModal = ref(false)

// 产品条款下载
function downloadPDF() {
    // PDF 文件的相对路径
    const pdfUrl = import.meta.env.VITE_PUBLICK_BASE_URL + '/《建信人寿瑞享安康重大疾病保险》保险条款.pdf'; // 这里是相对于 public 目录的路径
    // 创建一个临时的 <a> 标签来触发下载
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.click(); // 模拟点击，触发下载
}

function submit() {
    const checkPromiseList = [nameCheckPromiseFn(), ageCheckPromiseFn(), moneyCheckPromiseFn()]
    Promise.all(checkPromiseList).then(() => {
        router.push({
            path: '/result',
            query: formData
        })
    }).catch(err => {
        showToast(err)
    })
}

</script>

<style lang="less" scoped>
select {
    direction: rtl; /* 兼容iphone文字方向 */
}
.page {
    height: 100%;
    min-height: 724px;
    font-size: 0;
    position: relative;
    background: url('@/assets/images/img_bg1@2x.png') no-repeat top,
        url('@/assets/images/img_bg2@2x.png') no-repeat top,
        #2B9CEA;
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
        height: 42px;
        border: 2px solid #FFFFFF;
        border-radius: 8px;
        font-size: 18px;
        line-height: 18px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 2px 1px 0px rgba(29, 83, 116, 0.42);

        &:first-child {
            background: linear-gradient(180deg, #9FD8FF 0%, #FFFFFF 100%);
            color: #2897E2;
            text-shadow: 0px 1px 1px #FFFFFF;
        }

        &:last-child {
            background: linear-gradient(180deg, #2999E5 0%, #D0EDFF 100%);
            color: #FFFFFF;
            text-shadow: 0px 1px 1px #084387;
        }
    }
}

.btn_b {
    margin-top: 13px;
    width: 345px;
    height: 42px;
    border: 2px solid #FFFFFF;
    border-radius: 8px;
    background: linear-gradient(180deg, #F1A738 0%, #FFEEB9 100%);
    box-shadow: 0px 2px 1px 0px rgba(29, 83, 116, 0.42);
    color: #FFFFFF;
    font-size: 18px;
    line-height: 18px;
    letter-spacing: 1px;
    text-shadow: 0px 1px 1px #874508;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.ipt_wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .my_placeholder {
        position: absolute;
        right: 0;
        color: rgba(45, 45, 45, 0.40);
        font-size: 13px;
        padding-right: 2px;
        pointer-events: none;
    }
}
</style>