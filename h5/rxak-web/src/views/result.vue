<template>
    <div class="page">
        <img class="title_img" src="@/assets/images/img_top1@2x.png" alt="">
        <Modal class="form_panel form_panel_1" title="尊敬的 xxx 女士">
            <template #icon>
                <img class="modal_icon" src="@/assets/svg/icon_head1.svg" alt="">
            </template>
            <div class="form_item">
                <div class="form_item_label">年交保险费</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">交费期间</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">身故保险金</div>
                <div class="form_item_value">方式X</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">基本保险金额</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">保险期间</div>
                <div class="form_item_value">xx</div>
            </div>
        </Modal>
        <div class="btn_group">
            <div class="btn_s" @click="showToubaoxuzhiModal = true">投保须知</div>
            <div class="btn_s" @click="downloadPDF">产品条款</div>
        </div>
        <Modal class="form_panel form_panel_2" title="投保利益演示">
            <template #icon>
                <img class="modal_icon" src="@/assets/images/icon_tit3@2x.png" alt="">
            </template>
            <div class="age_tip">被保险人年末年龄为 XX 周岁时（即第XX保单年度）</div>

            <div class="form_item">
                <div class="form_item_label">已交保险费（累计）</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">重大疾病保险金</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">身故保险金</div>
                <div class="form_item_value">xx元</div>
            </div>
            <div class="form_item">
                <div class="form_item_label">保单年度末现金价值</div>
                <div class="form_item_value">xx元</div>
            </div>
            <Slider :min="0" :max="60"></Slider>
            <div class="tip_message">
                <img class="tip_message_icon" src="@/assets/svg/info-circle.svg" alt="">
                <div>1. 上述利益演示中的现金价值为保单年度末的值。</div>
                <div>2. 建信人寿仅承担本合同重大疾病保险金和身故保险金两
                    项给付责任中的一项。</div>
            </div>
        </Modal>
        <div class="btn_b">查看利益演示表</div>
        <div class="btn_group">
            <div class="btn_s">重新试算</div>
            <div class="btn_s submit_btn">立即投保</div>
        </div>
        <van-overlay :show="showToubaoxuzhiModal">
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
import { ref } from 'vue';
import Modal from '@/components/Modal.vue';
import Toubaoxuzhi from '@/views/toubaoxuzhi.vue';
import Slider from '@/components/Slider.vue';

// 投保须知模态框
const showToubaoxuzhiModal = ref(false)

// 产品条款下载
function downloadPDF() {
    // PDF 文件的相对路径
    const pdfUrl = '/《建信人寿瑞享安康重大疾病保险》保险条款.pdf'; // 这里是相对于 public 目录的路径

    // 创建一个临时的 <a> 标签来触发下载
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.click(); // 模拟点击，触发下载
}

</script>

<style lang="less" scoped>
@import '@/styles/mixins.less';

.page {
    min-height: 100%;
    font-size: 0;
    position: relative;
    background: url('@/assets/images/img_bg2@2x.png') no-repeat top, #2B9CEA;
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
            padding-right: 2px;
            position: relative;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                width: 100%;
                .divider-styles();
            }

            .form_item_label {
                color: #231815;
                font-weight: bold;
                padding-left: 1px;
            }

        }
    }

    :deep(.form_panel_1) {
        margin-top: 20px;

        .modal_title_cha {
            color: #F2AA41;

            &::after {
                background: rgba(242, 170, 65, 0.2);
            }
        }
    }

    .form_panel_2 {
        margin-top: 16px;

        .age_tip {
            margin-top: 8px;
            height: 24px;
            background: rgba(242, 170, 65, 0.16);
            border-radius: 4px;
            font-size: 12px;
            color: #F2AA41;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .tip_message {
            margin-top: 16px;
            width: 319px;
            height: 64px;
            background: #DEF1FF;
            border-radius: 4px;
            padding: 8px 10px 8px 26px;
            position: relative;
            font-size: 11px;
            color: #2999E5;
            line-height: 16px;

            .tip_message_icon {
                width: 12px;
                position: absolute;
                top: 10px;
                left: 8px;
            }
        }
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

        &.submit_btn {
            background: linear-gradient(180deg, #F1A738 0%, #FFEEB9 100%);
            color: #FFFFFF;
            text-shadow: 0px 1px 1px #874508;
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
</style>