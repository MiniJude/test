<!--
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-06 14:14:11
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-07 09:58:24
 * @Description: 投保须知
 * @FilePath: \rxak-web\src\views\toubaoxuzhi.vue
-->
<template>
    <div class="list">
        <div class="list_item" v-for="item in list">
            <div class="list_item_label">{{ item.label }}</div>
            <div class="list_item_desc">{{ item.desc }}</div>
        </div>
    </div>
    <div class="divider"></div>
    <table>
        <colgroup class="col_group">
            <col class="col_1">
            <col class="col_2">
            <col class="col_3">
        </colgroup>
        <thead>
            <tr>
                <th>交费期间</th>
                <th>保险期间</th>
                <th>被保险人投保年龄</th>
            </tr>
        </thead>
        <tbody>
            <!-- 终身 -->
            <tr>
                <td>5年</td>
                <td rowspan="5">终身</td>
                <td>出生满30日(含)-60周岁</td>
            </tr>
            <tr>
                <td>10年</td>
                <td>出生满30日(含)-55周岁</td>
            </tr>
            <tr>
                <td>15 年</td>
                <td>出生满30日(含)-50周岁</td>
            </tr>
            <tr>
                <td>20年</td>
                <td>出生满30日(含)-45周岁</td>
            </tr>
            <tr>
                <td>30年</td>
                <td>出生满30日(含)-35周岁</td>
            </tr>
            <!-- 非终身 -->
            <tr>
                <td>5年</td>
                <td rowspan="5">至被保险人年满80周岁后的首页保单周年日</td>
                <td rowspan="5">出生满30日(含)-30周岁</td>
            </tr>
            <tr>
                <td>10年</td>
            </tr>
            <tr>
                <td>15 年</td>
            </tr>
            <tr>
                <td>20年</td>
            </tr>
            <tr>
                <td>30年</td>
            </tr>
        </tbody>
    </table>

</template>

<script lang="ts" setup>

const list = [
    { label: '投保年龄', desc: '出生满30日（含）至60周岁' },
    { label: '保险期间', desc: '至被保险人年满80周岁后的首页 \n 保单周年日24时，终身' },
    { label: '交费期间', desc: '5年，10年，15年，20年，30年' },
    { label: '交费方式', desc: '年交，月交' },
]

</script>

<style lang="less" scoped>
@import '@/styles/mixins.less';

.list {
    padding: 16px 4px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    .list_item {
        display: flex;
        align-items: center;
        gap: 18px;

        .list_item_label {
            width: 72px;
            height: 30px;
            background: linear-gradient(180deg, #2999E5 0%, #D0EDFF 100%);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 18px;
            flex-shrink: 0;
        }

        .list_item_desc {
            line-height: 20px;
            font-weight: bold;
            white-space: pre-line;
        }
    }
}

.divider {
    width: calc(100% - 8px);
    margin: 0 auto;
    .divider-styles();
}

table {
    @border: 1px solid #B1DDF8;
    // border-collapse: collapse; 如果公用列则圆角不生效
    border-collapse: separate;
    border-spacing: 0;
    border-left: @border;
    border-top: @border;
    margin: 15px auto 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    overflow: hidden;

    .col_group {
        .col_1 {
            width: 66px;
        }

        .col_2 {
            width: 102px;
        }

        .col_3 {
            width: 141px;
        }
    }

    thead {

        background: #DEF1FF;
    }

    tr th,
    tr td {
        height: 30px;
        font-size: 11px;
        padding-left: 6px;
        line-height: 16px;
        color: #231815;
        border-bottom: @border;
        border-right: @border;
    }

    thead tr th:last-child {
        border-top-right-radius: 4px;
    }
}
</style>