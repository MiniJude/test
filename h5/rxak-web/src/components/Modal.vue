<template>
    <div class="modal">
        <div class="modal_head">
            <div class="modal_title">
                <slot name="icon"></slot>
                <div class="modal_title_cha">
                    {{ title }}
                    <!-- <span style="position: absolute;white-space: nowrap;"></span> -->
                </div>
            </div>
            <img style="margin-right: 6px;" v-if="closable" src="@/assets/svg/close.svg" alt="" @click="emits('close')">
        </div>
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
interface Props {
    title?: string
    closable?: boolean
}
const {
    title = '标题',
    closable = false
} = defineProps<Props>()

const slots = defineSlots<{
    default(props: any): any
    icon(props: any): any
}>()

const emits = defineEmits<{
    close: []
}>()

</script>

<style lang="less" scoped>
.modal {
    width: 343px;
    background: #ffffff;
    border-radius: 4px 12px 4px 12px;
    border: 1px solid #ffffff;
    padding: 10px 10px 16px;
    font-size: 13px;
    position: relative;

    &::after {
        content: "";
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

    :deep(.modal_icon) {
        width: 20px;
    }

    .modal_head {
        display: flex;
        align-items: center;
        padding-left: 2px;
        position: relative;
        justify-content: space-between;
    }

    .modal_title {
        height: 26px;
        display: flex;
        align-items: center;
        gap: 6px;

        .modal_title_cha {
            font-size: 16px;
            font-weight: bold;
            color: #2999e5;
            position: relative;
            padding-top: 2px;
            width: fit-content;
            z-index: 1;

            &::after {
                content: "";
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
}
</style>