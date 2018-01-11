/**
 * web前端常用工具库
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
        set: function(_key, _val, _day) {
            //获取当前日期
            var expiresDate = new Date();
            //设置生存期，一天后过期
            expiresDate.setDate(expiresDate.getDate() + (_day ? _day : 1));
            document.cookie = _key + "=" + encodeURIComponent(_val) + ";expires= " + expiresDate.toGMTString() + ";path=/;"; //标记已经访问了站点
        },
        /**
         * 获取cookies
         * @param _key 键名称
         */
        get: function(_key) {
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
                    returnvalue = decodeURIComponent(document.cookie.substring(offset, end));
                }
            }
            return returnvalue;
        },
        /**
         * 删除cookies
         * @param _key
         */
        del: function(_key) {
            //获取当前日期
            var expiresDate = new Date();
            //设置生存期，一天后过期
            expiresDate.setDate(expiresDate.getDate() - 100);
            document.cookie = _key + "=null;expires= " + expiresDate.toGMTString() + ";path=/;"; //标记已经访问了站点
        }
    },
    String: {
    	/**
        * 获取字符串的字节长度
        * 一个中文两个字节，其他一个字节 需要通过 charCodeAt()来转换为Unicode 中文的Unicode 是大于255的
        * @param _str:string 字符串
        */
        getBytesLen:function(_str){
            if(!_str) return 0;
            var _len = _str.length,
                _byteLen = _len;
            for(var i = 0;i<_len;i++)
            {
                if(_str.charCodeAt(i) > 255)
                    _byteLen ++;
            }    

            return _byteLen;
        }
    },
    Number: {
    	
    },
    Date: {
        /**
         * 计算两个日期的相差值 默认返回相差天数 不指定_diffType的情况下
         * @param _sDate1:string 值大的日期串 yyyy-MM-dd
         * @param _sDate2:string 值小的日期串 yyyy-MM-dd
         * @param _diffType:string 相差值类型(y(年)/M(月)/d(天)/h(小时)/m(分)/s(秒)) 默认为d
         */
        diff: function(_sDate1, _sDate2, _diffType) {
            var aDate, oDate1, oDate2, diffVal;
            aDate = _sDate1.split("-");
            oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
            aDate = _sDate2.split("-");
            oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
            if (!_diffType) _diffType = "d";
            switch (_diffType) {
                case "y":
                    diffVal = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24 / 30 / 12);
                    break;
                case "M":
                    diffVal = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24 / 30);
                    break;
                case "d":
                    diffVal = parseInt((oDate1 - oDate2) / 1000 / 60 / 60 / 24);
                    break;
                case "h":
                    diffVal = parseInt((oDate1 - oDate2) / 1000 / 60 / 60);
                    break;
                case "m":
                    diffVal = parseInt((oDate1 - oDate2) / 1000 / 60);
                    break;
                case "s":
                    diffVal = parseInt((oDate1 - oDate2) / 1000);
                    break;
            }
            return diffVal;
        }
    },
    Checker: {
        /**
         * 手机号码格式是否正确
         * @param _mobile:string 手机号码 11位
         * @return true/false 
         */
        isMobile: function(_mobile) {
            var reg = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|17[0-9]{9}$|18[0-9]{9}$/;
            if (_mobile == '' || !reg.test(_mobile)) {
                return false;
            }
            return true;
        },
        /**
         * 邮箱地址格式是否正确
         * @param _email:string 邮箱地址
         * @return true/false 
         */
        isEmail: function(_email) {
            var reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (_email == '' || !reg.test(_email)) {
                return false;
            }
            return true;
        },
        /**
         * 身份证号码格式是否正确
         * @param _cardNo:string 身份证号码
         * @return true/false 
         */
        isIdCardNo: function(_cardNo) {

            if (_cardNo == '' || !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i.test(_cardNo)) {
                return false;
            }
            return true;
        }
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
        getParam: function(_pkey) {
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
            }
            return a;
        },
        /**
         * 是否是微信
         */
        isWeixin: function() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                return true;
            } else {
                return false;
            }
        }
    }
};