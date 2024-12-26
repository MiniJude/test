<template>
    <div id="slider-root">
        <div class="slider-container">
            <div class="button" id="decrease">
                <img src="@/assets/svg/btn_redu2.svg" alt="">
                <img src="@/assets/svg/btn_redu1.svg" alt="">
            </div>

            <div class="track">
                <div class="track-left"></div>
                <div class="track-right"></div>
                <div class="tooltip"></div>
                <div class="thumb"></div>
            </div>
            <div class="button" id="increase">
                <img src="@/assets/svg/btn_plus2.svg" alt="">
                <img src="@/assets/svg/btn_plus1.svg" alt="">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { Slider } from '@/components/Slider.js';

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    initial?: number;
    leftColor?: string;
    rightColor?: string;
}

const {
    min,
    max,
    step = 1,
    initial,
    leftColor = '#2B9CEA',
    rightColor = '#A2DAFF',
} = defineProps<SliderProps>();


const emits = defineEmits<{
    change: [val: number]
}>();


onMounted(() => {
    // 获取滑块根容器
    const sliderRoot = document.getElementById('slider-root');
    new Slider({
        root: sliderRoot,
        min, // 最小值
        max, // 最大值
        step, // 步长
        initial: initial ?? min, // 初始值
        leftColor, // 左侧颜色
        rightColor, // 右侧颜色
        onChange: (value: number) => {
            console.log(`滑块当前值: ${value}`);
            emits('change', value)
        }
    })
})

</script>

<style scoped>
#slider-root .button img {
    display: none;
    width: 36px;
}

#slider-root .button.disabled img:last-child {
    display: block;
}

#slider-root .button:not(.disabled) img:first-child {
    display: block;
}

.slider-container {
    display: flex;
    align-items: center;
    gap: 8px;
}

.slider-container .button {
    border-radius: 50%;
    overflow: hidden;
}

.slider-container .track {
    flex: 1;
}

.track {
    position: relative;
    height: 8px;
    background-color: transparent;
    border-radius: 4px;
    display: flex;
}

.track-left,
.track-right {
    height: 100%;
    border-radius: 18px;
}

.track-left {
    background-color: #4caf50;
    /* 默认左侧颜色 */
}

.track-right {
    background-color: #e0e0e0;
    /* 默认右侧颜色 */
    flex-grow: 1;
}

.thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border: 3px solid #F1A738;
    border-radius: 50%;
    cursor: pointer;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
}

.tooltip {
    width: 60px;
    height: 25px;
    white-space: nowrap;
    padding: 0 6px;
    display: inline-block;
    line-height: 20px;
    text-align: center;
    font-size: 11px;
    color: #FFFFFF;
    text-shadow: 0px 1px 2px #874508;
    position: absolute;
    bottom: 14px;
    left: 0;
    transform: translateX(-50%);
    background: url('@/assets/svg/img_Mask.svg') no-repeat center / contain;
}
</style>