# jsTools
这里搜集整理了非常多，非常实用的js公用函数形成的工具库，让你写起js更加轻松，想你所想。

#工具库名称
Common.Tools

#库内分组层级关系
<pre>
   |-- Common
	    |-- Tools
	         |-- Cookies  //cookis的常用操作
	         	 .set(_key,_val,_day) //设置cookies
	         	 .get(_key)  //获取cookies
	         	 .del(_key)  //删除cookies
	         |-- Date     //日期的常用操作
	         |-- String   //字符串的常用操作
	         |-- Number   //数据类型的常用操作
	         |-- Checker  //判断检查一类的 比如手机号码、身份号码格式是否正确等一类的
	         |-- Browser  //浏览器差异相关的一些操作处理
	             .isSuportPlaceholder() //是否兼容placeholder
	             .compatiPlaceholder() //批量兼容处理页面上的输入框placeholder的提示效果
	             .getParam(_pkey) //获取url参数值
</pre>

#调用示例
<pre>
	if(Common.Tools.Broswer.isSuportPlaceholder())
	{
		console.log("您的浏览器支持Placeholder");
	}else{
		console.log("建议升级您的IE浏览器至IE10及其以上版本");
	}
</pre>
