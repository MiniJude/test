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

export const generatePdf = async (data: {
  name: string;
  sex: string;
  age: number;
  nianJiaoBaoXianFei: string;
  jiao_fei_qi_jian: number;
  shen_gu_bao_xian_jin: string;
  bao_xian_qi_jian: string;
  arr?: ResultType["xianJinJiaZhiBiaoList"];
}) => {
  const doc = new jsPDF("p", "px", [539, 1192]); // 创建和图片宽高一样的纵向 PDF
  doc.addFont("SourceHanSans-Normal.ttf", "SourceHanSans-Normal", "normal");
  doc.setFont("SourceHanSans-Normal");

  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;

  // 每页图片加载和表格填充
  const rowsPerPage = 35; // 每页 35 行数据，与你的表格布局匹配

  // 先加2张图片
  //   doc.addImage(image1, "jpg", 0, 0, pageWidth, pageHeight);
  //   doc.addPage();
  //   doc.addImage(image2, "jpg", 0, 0, pageWidth, pageHeight);
  //   doc.addPage();

  // 表格第一页 在pdf上加文字
  // 姓名、性别、年龄
  doc.addImage(image3, "jpg", 0, 0, pageWidth, pageHeight);
  doc.text(data.name, 300, 200);
  doc.text(data.sex, 350, 200);
  doc.text(data.age + "", 400, 200);
  // 年交保险费、交费期间、身故保险金、保险期间
  doc.text("年交保险费：", 450, 300);
  doc.text("交费期间：", 500, 300);
  doc.text("身故保险金：", 550, 300);
  doc.text("保险期间：", 600, 300);

  // for (let i = 0; i < images.length; i++) {
  //     // 加载图片
  //     const { base64 } = await loadImage(images[i]);
  //     // 添加图片到页面
  //     doc.addImage(base64, 'PNG', 0, 0, pageWidth, pageHeight);

  //     // 获取当前页数据
  //     const pageData = data.slice(i * rowsPerPage, (i + 1) * rowsPerPage);

  //     // 在图片上填充表格数据
  //     autoTable(doc, {
  //         startY: 150, // 表格的起始 Y 坐标，根据图片调整
  //         margin: { left: 40 }, // 表格左侧边距
  //         // head: [['保单代码', '保单年度', '年末年龄', '年交保费', '累计保费', '重大疾病保险金', '身故保险金', '现金价值']],
  //         body: pageData.map((item) => [
  //             item.nianMoNianLing,
  //             item.nianJiaoBaoXianFei,
  //             item.leijiaBaoXianFei,
  //             item.zhongDaJiBingBaoXianJin,
  //             item.shengGuBaoXianJin,
  //             item.xianJinJiaZhi,
  //         ]),
  //         styles: {
  //             fontSize: 10, // 设置字体大小
  //             lineWidth: 0, // 隐藏边框
  //             cellPadding: {
  //                 top: 10, // 单元格顶部内边距
  //                 right: 10, // 单元格右侧内边距
  //                 bottom: 10, // 单元格底部内边距
  //                 left: 10, // 单元格左侧内边距
  //             }
  //         },
  //         tableLineColor: false, // 表格线颜色设置为白色
  //         tableLineWidth: 0, // 去掉表格边框
  //         bodyStyles: {
  //             fillColor: false,
  //             textColor: [0, 0, 0], // 表格内容文字颜色
  //             lineColor: false, // 单元格边框颜色
  //             lineWidth: 0, // 去掉单元格边框
  //         },
  //         alternateRowStyles: {
  //             fillColor: false, // 去掉交替行的背景色
  //         },
  //     });

  //     // 如果不是最后一页，添加新页面
  //     if (i < images.length - 1) {
  //         doc.addPage();
  //     }
  // }

  // 下载 PDF 文件
  doc.save("保单数据表.pdf");
};

// 工具函数：加载图片
const loadImage = (
  src: string
): Promise<{
  base64: string;
  width: number;
  height: number;
}> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // 允许跨域加载
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, img.width, img.height);
        resolve({
          base64: canvas.toDataURL("image/png"),
          width: img.width,
          height: img.height,
        });
      } else {
        reject(new Error("无法加载图片"));
      }
    };
    img.onerror = reject;
  });
};
