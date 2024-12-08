<template>
    <div class="liyiyanshi">
        <div class="unit">单位：人民币元</div>
        <div class="my_table">
            <table class="yanshi_table" :style="{ width: widthList.reduce((a, b) => a + b, 0) + 'px' }">
                <colgroup class="col_group">
                    <col v-for="(c, i) in widthList" :class="['col_' + (i + 1)]"
                        :style="{ width: c + 'px', padding: '0 6px' }">
                </colgroup>
                <thead>
                    <tr>
                        <th>
                            <div>保单 <br> 年度</div>
                        </th>
                        <th>
                            <div>年末 <br> 年龄</div>
                        </th>
                        <th>
                            <div>年交 <br> 保险费</div>
                        </th>
                        <th>
                            <div>累计 <br> 保险费</div>
                        </th>
                        <th>
                            <div>重大疾病<br>保险金</div>
                        </th>
                        <th>
                            <div>身故<br>保险金</div>
                        </th>
                        <th>
                            <div>现金价值<br>(保单年度末)</div>
                        </th>
                    </tr>
                </thead>
            </table>
            <div class="tbody_table_wrapper" :style="{ width: widthList.reduce((a, b) => a + b, 0) + 2 + 'px' }">
                <table class="tbody_table">
                    <colgroup class="col_group">
                        <col class="col_1">
                        <col class="col_2">
                        <col class="col_3">
                        <col class="col_4">
                        <col class="col_5">
                        <col class="col_6">
                        <col class="col_7">
                    </colgroup>
                    <tbody>
                        <tr v-for="item in list">
                            <td>{{ item.baoDanNianDu }}</td>
                            <td>{{ item.nianMoNianLing }}</td>
                            <td>{{ item.nianJiaoBaoXianFei.toFixed(2) }}</td>
                            <td>{{ item.leijiaBaoXianFei.toFixed(2) }}</td>
                            <td>{{ item.zhongDaJiBingBaoXianJin.toFixed(2) }}</td>
                            <td>{{ item.shengGuBaoXianJin.toFixed(2) }}</td>
                            <td>{{ item.xianJinJiaZhi.toFixed(2) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ResultType } from '@/types'
import { onMounted, ref } from 'vue';
const { list } = defineProps<{
    list: ResultType['xianJinJiaZhiBiaoList']
}>()

const widthList = ref<number[]>([])
onMounted(() => {
    // 获取tbody_table每一列的宽度
    const colGroup = document.querySelector('.tbody_table .col_group') as HTMLElement
    const cols = colGroup.querySelectorAll('col')
    cols.forEach((col: HTMLElement) => {
        widthList.value.push(col.offsetWidth)
    })
})

</script>
<style lang="less" scoped>
@border: 1px solid #B1DDF8;

.liyiyanshi {
    display: flex;
    flex-direction: column;

    .unit {
        font-size: 11px;
        color: #2999E5;
        line-height: 20px;
        text-align: right;
        margin-top: 4px;
        margin-bottom: 2px;
    }

    .yanshi_table,
    .tbody_table {
        // border-collapse: collapse; 如果公用列则圆角不生效
        border-collapse: separate;
        border-spacing: 0;
        border-left: @border;

        tr th,
        tr td {
            font-size: 11px;
            line-height: 16px;
            border-bottom: @border;
            border-right: @border;
        }

        tr td {
            height: 30px;
            padding-left: 6px;
            padding-right: 6px;
            color: #231815;
        }

        thead {
            background: #DEF1FF;

            tr th {
                height: 57px;

                div {
                    height: 100%;
                    color: #1085D5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    white-space: pre-line;
                }
            }
        }



        thead tr th:last-child {
            border-top-right-radius: 4px;
        }

        tbody {
            height: 200px;
            overflow: auto;
        }
    }



    .my_table {
        width: 100%;
        margin: auto;
        flex: 1;
        min-height: 0;
        overflow-x: auto;
        overflow-y: hidden;
        display: flex;
        flex-direction: column;

        .yanshi_table {
            border-top: @border;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            overflow: hidden;
        }

        .tbody_table_wrapper {
            flex: 1;
            min-height: 0;
            overflow-y: auto;
            overflow-x: visible;

            .tbody_table {
                margin-top: 0;
            }
        }
    }
}
</style>