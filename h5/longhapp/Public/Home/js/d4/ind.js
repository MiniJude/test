/*
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-11-16 09:24:31
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-11-16 09:24:38
 * @Description: 
 * @FilePath: \jxrs\Public\Home\js\d4\ind.js
 */
$(document).ready(function(){
    $(".con2_table>p #add").click(function(){
       if($('.xingming').val() == ''){
         $.wjNotify('请先填写被保险人信息');
         return false;
       }
       if($('#demo1').val() == ''){
         $.wjNotify('请先填写被保险人信息');
         return false;
       }
       
        $(".background").css("display","block");
        $(".con2_fixed2").css("display","block")
    })
    $(".con2_fixed2>a").click(function(){
        $(".background").css("display","none");
        $(".con2_fixed2").css("display","none");
        // $('#mainBaofei').val(null);
    })
    // $(".con2_fixed2_button a").click(function(){
    //     $(".background").css("display","none");
    //     $(".con2_fixed2").css("display","none");
    // })
    
    $(".con2_fixed1>a").click(function(){
        $(".background").css("display","none");
        $(".con2_fixed1").css("display","none");
    })
    $(".con2_fixed1_box2_title span").click(function(){
         var index=$(this).index();
     $(this).addClass("active").siblings().removeClass("active");
     $(".con2_fixed1_box2_time").eq(index).addClass("active").siblings(".con2_fixed1_box2_time").removeClass("active");
    }) 
    
    /*男女选择*/
    
    $(".con2_form p i em a").click(function(){
         $(this).addClass("active").siblings().removeClass("active");
    })
    
    
    $(".con1_4_button a").eq(0).click(function(){
        $(".background").css("display","block");
        $(".con1_fixed2").css("display","block");
        $(".guding_con1").css("display","block");
    })
    $(".background").click(function(){
        $(".background").css("display","none");
        $(".con2_fixed2").css("display","none");
        $('#mainBaofei').val(null);
        $('#qjibenbaoxian').val(null);
        $(".con1_fixed2").css("display","none");
        $(".guding_con1").css("display","none");
        $(".con2_fixed1").css("display","none");
    })
 
    $('.con1_4ul li').on('click',function(){
       var index=$(this).index();
       
       $(this).addClass('active').siblings().removeClass('active');
 
       $('.con1_4_text').eq(index).addClass('active').siblings().removeClass('active');
 
       $('.con1_fixed2_table table').eq(index).addClass('active').siblings().removeClass('active');
 
       $('.fengmian_big_table table').eq(index).addClass('active').siblings().removeClass('active');
    });
 
    
    function isInteger(obj) {
      return obj%1 === 0
     }
   
 })
     
 