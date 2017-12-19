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
        Tools: {};
    };
Common.Tools = {
    Cookies: {

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
        }
    }
};