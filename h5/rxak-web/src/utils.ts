/*
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-12-30 14:12:52
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-12-30 16:12:15
 * @Description:
 * @FilePath: \rxak-web\src\utils.ts
 */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import image1 from "@/assets/images/pdf1.jpg";
import image2 from "@/assets/images/pdf2.jpg";
import image3 from "@/assets/images/pdf3.jpg";
import image4 from "@/assets/images/pdf4.jpg";
import image5 from "@/assets/images/pdf5.jpg";
import image6 from "@/assets/images/pdf6.jpg";
import image7 from "@/assets/images/pdf7.jpg";
import { ResultType } from "./types";
import "@/assets/font/FZLTZHJW-normal.js";

export const generatePdf = async (data: { name: string; sex: string; age: number; nianJiaoBaoXianFei: string; jiao_fei_qi_jian: number; shen_gu_bao_xian_jin: string; bao_xian_qi_jian: string; arr?: ResultType["xianJinJiaZhiBiaoList"] }) => {
    const doc = new jsPDF("p", "px", [620, 1471.5]); // 创建和图片宽高一样的纵向 PDF
    doc.setFont("FZLTZHJW");

    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // 先加2张图片
    doc.addImage(image1, "jpg", 0, 0, pageWidth, pageHeight);
    doc.addPage();
    doc.addImage(image2, "jpg", 0, 0, pageWidth, pageHeight);
    doc.addPage();

    // 表格第一页 在pdf上加文字
    // 姓名、性别、年龄
    doc.addImage(image3, "jpg", 0, 0, pageWidth, pageHeight);
    doc.text(data.name, 115, 168);
    doc.text(data.sex, 300, 168);
    doc.text(data.age + "", 485, 168);
    // 年交保险费、交费期间、身故保险金、保险期间
    doc.text(data.nianJiaoBaoXianFei, 85, 230);
    doc.text(data.jiao_fei_qi_jian + "", 230, 230);
    doc.text(data.shen_gu_bao_xian_jin, 350, 230);
    doc.text(data.bao_xian_qi_jian, 490, 230);

    const columnStyles = {
        0: { cellWidth: 60 }, // 设置第一列的宽度为 40
        1: { cellWidth: 80 }, // 设置第二列的宽度为 30
        2: { cellWidth: 80 }, // 设置第三列的宽度为 50
        3: { cellWidth: 80 }, // 设置第四列的宽度为 30
        4: { cellWidth: 94 }, // 设置第五列的宽度为 30
        5: { cellWidth: 70 }, // 设置第六列的宽度为 30
    };

    // 第一页表格————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    // 在图片上填充表格数据
    autoTable(doc, {
        startY: 384, // 表格的起始 Y 坐标，根据图片调整
        margin: { left: 105 }, // 表格左侧边距
        // head: [['保单代码', '保单年度', '年末年龄', '年交保费', '累计保费', '重大疾病保险金', '身故保险金', '现金价值']],
        styles: {
            fontSize: 14, // 设置字体大小
            lineWidth: 0, // 隐藏边框
            cellPadding: {
                top: 8, // 单元格顶部内边距
                right: 8, // 单元格右侧内边距
                bottom: 10, // 单元格底部内边距
                left: 8, // 单元格左侧内边距
            },
            halign: "center", // 水平居中
            valign: "middle", // 垂直居中
        },
        columnStyles,
        tableLineColor: false, // 表格线颜色设置为白色
        tableLineWidth: 0, // 去掉表格边框
        bodyStyles: {
            fillColor: false,
            textColor: [0, 0, 0], // 表格内容文字颜色
            lineColor: "red", // 单元格边框颜色
            lineWidth: 0, // 去掉单元格边框
        },
        alternateRowStyles: {
            fillColor: false, // 去掉交替行的背景色
        },
        body: data.arr!.slice(0, 35).map((item) => [item.nianMoNianLing, item.nianJiaoBaoXianFei, item.leijiaBaoXianFei, item.zhongDaJiBingBaoXianJin, item.shengGuBaoXianJin, item.xianJinJiaZhi]),
    });

    // 第二页表格————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————

    doc.addPage();
    doc.addImage(image4, "jpg", 0, 0, pageWidth, pageHeight);

    autoTable(doc, {
        startY: 93, // 表格的起始 Y 坐标，根据图片调整
        margin: { left: 105 }, // 表格左侧边距
        // head: [['保单代码', '保单年度', '年末年龄', '年交保费', '累计保费', '重大疾病保险金', '身故保险金', '现金价值']],
        styles: {
            fontSize: 14, // 设置字体大小
            lineWidth: 0, // 隐藏边框
            cellPadding: {
                top: 8, // 单元格顶部内边距
                right: 8, // 单元格右侧内边距
                bottom: 10, // 单元格底部内边距
                left: 8, // 单元格左侧内边距
            },
            halign: "center", // 水平居中
            valign: "middle", // 垂直居中
        },
        columnStyles,
        tableLineColor: false, // 表格线颜色设置为白色
        tableLineWidth: 0, // 去掉表格边框
        bodyStyles: {
            fillColor: false,
            textColor: [0, 0, 0], // 表格内容文字颜色
            lineColor: "red", // 单元格边框颜色
            lineWidth: 0, // 去掉单元格边框
        },
        alternateRowStyles: {
            fillColor: false, // 去掉交替行的背景色
        },
        body: data.arr!.slice(35, 80).map((item) => [item.nianMoNianLing, item.nianJiaoBaoXianFei, item.leijiaBaoXianFei, item.zhongDaJiBingBaoXianJin, item.shengGuBaoXianJin, item.xianJinJiaZhi]),
    });

    doc.addPage();
    doc.addImage(image5, "jpg", 0, 0, pageWidth, pageHeight);
    autoTable(doc, {
        startY: 93, // 表格的起始 Y 坐标，根据图片调整
        margin: { left: 105 }, // 表格左侧边距
        // head: [['保单代码', '保单年度', '年末年龄', '年交保费', '累计保费', '重大疾病保险金', '身故保险金', '现金价值']],
        styles: {
            fontSize: 14, // 设置字体大小
            lineWidth: 0, // 隐藏边框
            cellPadding: {
                top: 8, // 单元格顶部内边距
                right: 8, // 单元格右侧内边距
                bottom: 10, // 单元格底部内边距
                left: 8, // 单元格左侧内边距
            },
            halign: "center", // 水平居中
            valign: "middle", // 垂直居中
        },
        columnStyles,
        tableLineColor: false, // 表格线颜色设置为白色
        tableLineWidth: 0, // 去掉表格边框
        bodyStyles: {
            fillColor: false,
            textColor: [0, 0, 0], // 表格内容文字颜色
            lineColor: "red", // 单元格边框颜色
            lineWidth: 0, // 去掉单元格边框
        },
        alternateRowStyles: {
            fillColor: false, // 去掉交替行的背景色
        },
        body: data.arr!.slice(80).map((item) => [item.nianMoNianLing, item.nianJiaoBaoXianFei, item.leijiaBaoXianFei, item.zhongDaJiBingBaoXianJin, item.shengGuBaoXianJin, item.xianJinJiaZhi]),
    });

    doc.addPage();
    doc.addImage(image6, "jpg", 0, 0, pageWidth, pageHeight);

    doc.addPage();
    doc.addImage(image7, "jpg", 0, 0, pageWidth, pageHeight);

    // 下载 PDF 文件
    // doc.save("保单数据表.pdf");
    try {
        alert(1);
        if (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())) {
            alert(2);
            let blob = doc.output("blob");
            const url = URL.createObjectURL(blob);
            alert(3);
            window.open(url);
        } else {
            doc.save("保单数据表.pdf");
        }
    } catch (error) {
        alert(error);
    }
};
