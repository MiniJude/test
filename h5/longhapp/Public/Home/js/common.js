/*
 * @Author: wangce 1546985690@qq.com
 * @Date: 2024-11-16 10:17:51
 * @LastEditors: wangce 1546985690@qq.com
 * @LastEditTime: 2024-11-16 10:17:55
 * @Description: 
 * @FilePath: \h5\longhapp\Public\Home\js\common.js
 */
jQuery.extend({
	wjNotify: function (txt) {
		var str='<div class="wj-prompt"><div class="inn-box">'+txt+'</div></div>';
		$('body').append(str);
		setTimeout(function () {
			$('body .wj-prompt').remove()
		},3000);
	}
});
