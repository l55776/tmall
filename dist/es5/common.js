"use strict";

// 生成随机数
function randomNum(min, max) {

    return parseInt(Math.random() * (max - min + 1)) + min;
}

// 获取颜色
function getRandomColor() {
    var r = randomNum(0, 255);
    var g = randomNum(0, 255);
    var b = randomNum(0, 255);
    return "rgb(" + r + "," + g + "," + b + ")";
}

// 正则验证
function recheck(venrify) {

    var demo = venrify.reg.test(venrify.str); //正则验证是否匹配

    //判断输入内容是否为空
    if (!venrify.str) {
        return venrify.nullmsg;
    } else {

        //判断是否含有二次验证，
        if (venrify.rechecks) {

            //判断两次内容验证是否一致，两次验证一致方可通过
            if (venrify.rechecks == venrify.str) {
                return venrify.success;
            } else {
                return venrify.errormsg;
            }
        } else {

            //判断正则是否符合
            if (demo) {
                return venrify.success;
            } else {
                return venrify.errormsg;
            }
        }
    }
}

/*
 	cookie的相关操作：var cookie = {}
	子功能：
		存 ：set
		取：get
		删：remove
		
 */
var cookie = {
    set: function set(name, value, prop) {
        //name和value是必写参数。prop是json格式的数据
        var str = name + '=' + value; //必写的

        //prop
        //expires:设置失效时间
        if (prop.expires) {
            str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
        }
        //prop.path :设置路径
        if (prop.path) {
            str += ';path=' + prop.path;
        }
        //设置访问权限domain
        if (prop.domain) {
            str += ';domain=' + prop.domain;
        }

        //设置：存
        document.cookie = str;
    },
    get: function get(key) {
        //获取
        var str = document.cookie; //name=jingjing; psw=123456
        var arr = str.split('; '); //[name=jingjing , psw=123456]
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
            if (key == arr2[0]) {
                return arr2[1]; //通过键名取键值
            }
        }
    },
    remove: function remove(key) {
        //cookie:设置时间失效，设置时间为过去的某个时间
        var now = new Date();
        now.setDate(now.getDate() - 1); //设置成昨天
        cookie.set(key, '', {
            expires: now
        });
    }

    // 获取url的信息
};function decodeURIs() {

    var url = decodeURI(location.search);
    var date = url.slice(1).split("&");
    var objs = {};
    for (var key in date) {
        var b = date[key].split("=");
        objs[b[0]] = b[1];
    }
    return objs;
}