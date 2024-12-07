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
import { ref, reactive, onMounted, watch, useTemplateRef } from 'vue';
import { Slider } from '@/components/Slider.js';

interface SliderProps {
    min: number;
    max: number;
    step?: number;
    initial?: number;
    leftColor?: string;
    rightColor?: string;
    onChange?: (value: number) => void;
}

// const {
//     min,
//     max,
//     step = 1,
//     initial,
//     leftColor = '#4caf50',
//     rightColor = '#e0e0e0',
//     onChange = () => { }
// } = defineProps<SliderProps>();



onMounted(() => {
    // 获取滑块根容器
    const sliderRoot = document.getElementById('slider-root');
    new Slider({
        root: sliderRoot,
        min: 0, // 最小值
        max: 100, // 最大值
        step: 1, // 步长
        initial: 2, // 初始值
        rightColor: 'rgba(199, 235, 220, 1)', // 右侧颜色
        onChange: (value: number) => {
            console.log(`滑块当前值: ${value}`);
        },
    })
})

</script>

<style scoped>
#slider-root {
    margin-top: 2rem;
}

#slider-root .button img {
    display: none;
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
    gap: 0.8rem;
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
    height: .8rem;
    background-color: transparent;
    border-radius: .4rem;
    display: flex;
}

.track-left,
.track-right {
    height: 100%;
    border-radius: 1.8rem;
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
    width: 1.6rem;
    height: 1.6rem;
    background-color: #fff;
    border: 0.3rem solid rgba(245, 137, 0, 1);
    border-radius: 50%;
    cursor: pointer;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

.tooltip {
    padding: .4rem 1rem;
    font-size: 1rem;
    color: rgba(245, 137, 0, 1);
    background: #FFF5D7;
    border: .1rem solid rgba(245, 137, 0, 1);
    border-radius: .6rem;
    position: absolute;
    bottom: 2rem;
    left: 0;
    transform: translateX(-50%);
    width: max-content;
}

.tooltip::before,
.tooltip::after {
    position: absolute;
    bottom: -1.2rem;
    left: calc(50% - .5rem);
    display: block;
    font-size: 0;
    line-height: 0;
    border-color: rgba(245, 137, 0, 1) transparent transparent;
    border-style: solid;
    border-width: .6rem;
    content: "";
}

.tooltip::after {
    bottom: -1.05rem;
    border-color: #FFF5D7 transparent transparent;
}
</style>