// 点击checkbox
$(".checkbox_wrapper").click(function () {
  $(this).toggleClass("checked");
});

// 数字格式化，每三位加逗号
function numberWithCommas(x) {
  // 转为字符串，按照.拆分
  let arr = (x + "").split(".");
  // 整数部分再拆分
  let int = arr[0].split("");
  // 保存小数部分
  const fraction = arr[1] || "";
  // 记录返回的结果
  let r = "";
  let len = int.length;

  // 倒序遍历
  int.reverse().forEach((v, i) => {
    // 非第一位且位值是3的倍数，添加','
    if (i !== 0 && i % 3 === 0) {
      r = v + "," + r;
    } else {
      r = v + r;
    }
  });

  // 返回整数部分 + 小数部分
  return r + (!!fraction ? "." + fraction : "");
}

// 点击#amount_text时候隐藏#amount_text,显示#amount，并聚焦，且光标在最后一位
$("#amount_text").click(function () {
  $("#amount").show();
  $("#amount_text").hide();
  $("#amount").focus();
});
// #amount失焦时隐藏#amount,显示#amount_text，并赋值
$("#amount").blur(function () {
  $("#amount_text").show();
  $("#amount").hide();
  let amount = $(this).val();
  $("#amount_text").text(numberWithCommas(amount));
});

// promise封装校验逻辑
function validate() {
  return new Promise((resolve, reject) => {
    // 姓名不能为空
    if ($('input[name="name"]').val() == "") {
      reject("姓名不能为空");
      return;
    }

    // 年龄不能为空
    const age = $('select[name="age"]').val();
    if (age === null) {
      reject("年龄不能为空");
      return;
    }

    // 交费期间不能为空
    const period = $('select[name="period"]').val();
    if (period === null) {
      reject("交费期间不能为空");
      return;
    }

    // 验证交费期间的最高投保年龄
    if (age > MAX_AGE[period]) {
      reject(`所选交费期间的最高投保年龄为${MAX_AGE[period]}岁，当前年龄超过上限`);
      return;
    }

    // 基本保险金额不能为空
    const amount = $('input[name="amount"]').val();
    if (amount == "") {
      reject("基本保险金额不能为空");
      return;
    }

    // 基本保险金额需为1000的整数倍
    if (Number(amount) % 1000 !== 0) {
      reject("基本保险金额需为1000的整数倍");
      return;
    }

    // 验证最低保额
    const minAmount = getMinAmount(age);
    if (Number(amount) < minAmount) {
      reject(`当前年龄基本保险金不能低于${minAmount}元`);
      return;
    }

    // 选择中症一定要选轻症
    if ($(".sub_panel .checkbox_wrapper").eq(1).hasClass("checked") && !$(".sub_panel .checkbox_wrapper").eq(0).hasClass("checked")) {
      reject("选择中症保险金责任时，必须选择轻症保险金责任");
      return;
    }

    resolve("success");
  });
}

// 点击查看保障计划书
$(".submit_btn").click(async function () {
  try {
    await validate();

    const formData = {
      user_name: $('input[name="name"]').val(),
      age: $('select[name="age"]').val(),
      sex: $('input[name="sex"]:checked').val() === "M" ? "男" : "女",
      jiao_fei_fang_shi: "年交",
      jian_kang_deng_ji: "A",
      qing_zhen_bao_xian_jin_ji_qing_zhen_huo_mian_bao_xian_fei: $(".sub_panel .checkbox_wrapper").eq(0).hasClass("checked"),
      zhong_zhen_bao_xian_jin_ji_zhong_zhen_huo_mian_bao_xian_fei: $(".sub_panel .checkbox_wrapper").eq(1).hasClass("checked"),
      e_wai_zhong_da_ji_bing_bao_xian_jin: $(".sub_panel .checkbox_wrapper").eq(2).hasClass("checked"),
      jiao_fei_qi_jian: $('select[name="period"]').val(),
      ji_ben_bao_xian_jin_e: $('input[name="amount"]').val(),
    };

    // 跳转
    // 将对象转为&字符串
    const params = Object.keys(formData)
      .map((key) => `${key}=${formData[key]}`)
      .join("&");
    window.location.href = `./bzjh.html?${params}`;
    return;

    // try {
    await submit(formData);

    //     // 跳转
    //     window.location.href = './bzjh.html';

    // } catch (error) {
    //     toast.showToast(ERROR.NetworkError);
    // }
  } catch (error) {
    toast.showToast(error);
  }
});

function submit(form) {
  const data = JSON.stringify(form);
  return $.ajax({
    url: "http://dev.wangyijie.net:18080/toubao/compute",
    method: "POST",
    contentType: "application/json;charset=utf-8",
    data,
  });
}
