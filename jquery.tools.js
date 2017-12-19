/**
 * 基于jQuery的工具库
 * author:stepday
 * date:2017-12-19
 * description: 很多代码片段直接来自于网络，经过优化整理形成工具库，很多代码是来自于多年来项目中积累的知识，希望分享给更多的朋友，介绍百度搜索的时间
 */
//预防自己的项目中已经用Common对象的情况
if (Common)
    Common.Tools = {};
else
    var Common = {
        Tools: {}
    };
Common.Tools = {
    Cookies: {
    	/*
	     * 写入cookies
	     * @param _key 键
	     * @param _val 值
	     * @param _day 存放多少天
	     */
	    set:function(_key,_val,_day)
	    {
	        //获取当前日期
	        var expiresDate = new Date();
	        //设置生存期，一天后过期
	        expiresDate.setDate(expiresDate.getDate() + (_day?_day:1));
	        document.cookie = _key+"="+_val+";expires= " + expiresDate.toGMTString()+";path=/;";//标记已经访问了站点
	    },
	    /**
	     * 获取cookies
	     * @param _key 键名称
	     */
	    get:function(_key)
	    {
	        var search = _key + "=";
	        var returnvalue = "";
	        if (document.cookie.length > 0) {
	            offset = document.cookie.indexOf(search);
	            if (offset != -1) {
	                // 已经存在cookies内
	                offset += search.length;
	                // set index of beginning of value
	                end = document.cookie.indexOf(";", offset);
	                // set index of end of cookie value
	                if (end == -1)
	                    end = document.cookie.length;
	                returnvalue = unescape(document.cookie.substring(offset, end));
	            }
	        }
	        return returnvalue;
	    },
	    /**
	     * 删除cookies
	     * @param _key
	     */
	    del:function(_key)
	    {
	        //获取当前日期
	        var expiresDate = new Date();
	        //设置生存期，一天后过期
	        expiresDate.setDate(expiresDate.getDate() - 100);
	        document.cookie = _key+"=null;expires= " + expiresDate.toGMTString()+";path=/;";//标记已经访问了站点
	    }
    },
    String: {

    },
    Number: {

    },
    Date: {

    },
    Checker: {

    },
    Browser: {
        /**
         * 是否兼容placeholder
         * @return {bool}:true/false
         */
        isSuportPlaceholder: function() {
            return "placeholder" in document.createElement("input");
        },
        /**
         * 批量兼容处理页面上的输入框placeholder的提示效果
         * 这里考虑到了密码输入框和placeholder为空的情况
         * 代码片段来自 简书
         */
        compatiPlaceholder: function() {
            //判断是否支持placeholder属性
            if (!('placeholder' in document.createElement("input"))) {
                //不支持
                $('[placeholder]').focus(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        //这里要考虑输入框是否为password类型
                        if (input.attr("ispwd")) {
                            input.attr("type", "password");
                        }
                        input.val('');
                        input.removeClass('placeholder');
                    }
                }).blur(function() {
                    var input = $(this);
                    if (input.val() == '' || input.val() == input.attr('placeholder')) {
                        //这里要考虑输入框是否为password类型 如果是则需要临时将type更换为text
                        if (input.attr("type") == "password") {
                            input.attr("type", "text");
                            input.attr("ispwd", true);
                        }
                        input.addClass('placeholder');
                        input.val(input.attr('placeholder'));
                    }
                }).blur();
            }
        },
        /**
        * 获取url参数值
        * @param _pkey:string 参数名称
        * @return {string}:不存在则返回null
        */
        getParam: function (_pkey) {
	        var c = document.location.search;
	        if (!_pkey) { return c }
	        var d = new RegExp("[?&]" + _pkey + "=([^&]+)", "g");
	        var g = d.exec(c);
	        var a = null;
	        if (null != g) {
	            try {
	                a = decodeURIComponent(decodeURIComponent(g[1]))
	            } catch (f) {
	                try {
	                    a = decodeURIComponent(g[1])
	                } catch (f) {
	                    a = g[1]
	                }
	            }
	        } return a;
	    }
    }
};