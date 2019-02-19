"use strict";

$(".register-footer").load("public/footer.html");

function showtime(t) {
    document.myform.zhyz1.disabled = true;
    for (i = 1; i <= t; i++) {
        window.setTimeout("update_p(" + i + "," + t + ")", i * 1000);
    }
}

function update_p(num, t) {
    if (num == t) {
        document.myform.zhyz1.value = " 重新发送 ";
        document.myform.zhyz1.disabled = false;
    } else {
        printnr = t - num;
        document.myform.zhyz1.value = " (" + printnr + ")重新发送";
    }
}

// 获取验证码
function huoquyzm() {
    var zhao = $('.zhao').val();
    var yzm = '';
    for (var i = 0; i < 6; i++) {
        yzm += randomNum(0, 9);
    }
    var data = "zhao=" + zhao + "&yzm=" + yzm;
    document.cookie = "huoquyzm=" + yzm;
    $.ajax({
        type: "post",
        url: "../api/SendMail.php",
        data: data,
        success: function success(response) {
            console.log(response);
        }
    });
    showtime(60);
}

// 随机验证码
function suijiyzms() {
    $('.yzm p ').html('');
    for (var i = 0; i < 6; i++) {

        suijiyzm = randomNum(0, 9);
        color1 = getRandomColor();
        color2 = getRandomColor();
        color3 = getRandomColor();
        color4 = getRandomColor();
        color5 = getRandomColor();
        color6 = getRandomColor();

        deg1 = randomNum(-80, 80);
        deg2 = randomNum(-80, 80);
        deg3 = randomNum(-80, 80);
        deg4 = randomNum(-80, 80);
        deg5 = randomNum(-80, 80);
        deg6 = randomNum(-80, 80);

        $('.yzm p ').append('<span>' + suijiyzm + '</span>');
        $('.yzm p span:nth-child(1)').css({ 'color': color1, transform: 'rotate(' + deg1 + 'deg)' });
        $('.yzm p span:nth-child(2)').css({ 'color': color2, transform: 'rotate(' + deg2 + 'deg)' });
        $('.yzm p span:nth-child(3)').css({ 'color': color3, transform: 'rotate(' + deg3 + 'deg)' });
        $('.yzm p span:nth-child(4)').css({ 'color': color4, transform: 'rotate(' + deg4 + 'deg)' });
        $('.yzm p span:nth-child(5)').css({ 'color': color5, transform: 'rotate(' + deg5 + 'deg)' });
        $('.yzm p span:nth-child(6)').css({ 'color': color6, transform: 'rotate(' + deg6 + 'deg)' });
    }
}

suijiyzms();
$('.next').click(function () {
    var color = getRandomColor();
    $(this).prev().css("background", color);
    suijiyzms();
});

// 正则验证

var OK1 = false;
var OK2 = false;
var OK3 = false;
var OK4 = false;
var OK5 = false;

// 验证用户是否存在
$('.register-register form .zhao').on('keyup', function () {
    var venrify = {
        reg: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        str: $(this).val().trim(),
        nullmsg: "●账号不能为空，请输您的账号",
        errormsg: "●账号格式不对，账号为邮箱 或 手机号码",
        success: '1'
    };
    var reg = recheck(venrify);
    var _this = $(this);
    if (reg == "1") {
        var data = "name=" + $(this).val().trim() + "&pwd=" + $('.mima').val() + "&type=select";
        $.ajax({
            type: "POST",
            url: "../api/phpapi/index.php",
            data: data,
            success: function success(str) {
                $data = JSON.parse(str); // console.log($data);
                if ($data) {
                    _this.next().html('●此账号已存在');
                    _this.next().css('color', 'red');
                    _this.next().margin = "5px";
                    OK1 = false;
                } else {
                    OK1 = true;
                    _this.next().html('●此账号可以使用');
                    _this.next().css('color', '#58bc58');
                    _this.next().margin = "5px";
                    $('.zhyz .huoquyzm').css({ 'background': 'red', cursor: 'pointer' });
                    OKbtn();

                    // 点击发送验证码
                    $('.huoquyzm').on('click', function () {
                        huoquyzm();
                    });
                }
            }
        });
    } else {
        errormsgs(_this, reg);
        OK1 = false;
        $('.zhyz .huoquyzm').css({ 'background': '#ccc', cursor: 'not-allowed' });
    }
    OKbtn();
});

// 验证码验证
$('.register-register form .zhyz1').on('keyup', function () {
    var venrify = {
        reg: /[0-9]{6}/,
        str: $(this).val().trim(),
        nullmsg: "●验证码不能为空，请输您收到的验证码",
        errormsg: "●验证码格式不对，验证码为6位数字",
        success: '1'
    };
    var reg = recheck(venrify);
    var _this = $(this).parent();

    var code = cookie.get('huoquyzm');
    console.log(code);

    if (reg == "1") {
        var shurucode = $('.zhyz1').val().trim();
        if (shurucode == code) {
            _this.next().html('●验证通过');
            _this.next().css('color', '#58bc58');
            OK2 = true;
        } else {
            _this.next().html('●验证码错误');
            _this.next().css('color', 'red');
        }
    } else {
        errormsgs(_this, reg);
        OK2 = false;
    }
    OKbtn();
});

// 验证密码1
$('.register-register form .mima').on('keyup', function () {
    var venrify = {
        reg: /^[a-zA-Z]\w{5,17}$/,
        str: $(this).val().trim(),
        nullmsg: "●密码不能为空，请输您要设置的密码",
        errormsg: "●密码(以字母开头，长度在6~18之间)",
        success: '1'
    };
    var reg = recheck(venrify);
    var _this = $(this);

    if (reg == "1") {
        _this.next().html('●验证通过');
        _this.next().css('color', '#58bc58');
        OK3 = true;
        OKbtn();
    } else {
        errormsgs(_this, reg);
        OK3 = false;
        OKbtn();
    }
    OKbtn();
});

pwd2();
// 验证密码2
function pwd2() {
    $('.register-register form .mima1').on('keyup', function () {
        var venrify = {
            reg: /^[a-zA-Z]\w{5,17}$/,
            str: $(this).val().trim(),
            nullmsg: "●密码不能为空，请输您要设置的密码",
            errormsg: "●密码(以字母开头，长度在6~18之间)",
            success: '1'
        };
        var reg = recheck(venrify);
        var _this = $(this);

        if (reg == "1") {
            var password = $('form .mima').val().trim();
            var password1 = $('form .mima1').val().trim();
            if (password1 == password) {
                _this.next().html('●验证通过');
                _this.next().css('color', '#58bc58');
                OK4 = true;
                OKbtn();
            } else {
                _this.next().html('●两次密码不一致');
                _this.next().css('color', 'red');
                OK4 = false;
                OKbtn();
            }
        } else {
            errormsgs(_this, reg);
            OK4 = false;
        }
        OKbtn();
    });
}

// 页面验证码验证
$('.register-register form .yzminput').on('keyup', function () {
    var venrify = {
        reg: /[0-9]{6}/,
        str: $(this).val().trim(),
        nullmsg: "●验证码不能为空，请输您收到的验证码",
        errormsg: "●验证码格式不对，验证码为6位数字",
        success: '1'
    };
    var reg = recheck(venrify);
    var _this = $(this).next();

    var yzm = $('.yzm p span').text();
    if (reg == "1") {
        var shurucode = $(this).val().trim();

        if (shurucode == yzm) {
            _this.next().html('●验证通过');
            _this.next().css('color', '#58bc58');
            OK5 = true;
        } else {
            _this.next().html('●验证码错误');
            _this.next().css('color', 'red');
        }
    } else {
        errormsgs(_this, reg);OK5 = false;
    }
    OKbtn();
});

// 错误提示样式
function errormsgs(_this, reg) {
    _this.next().html(reg);
    _this.next().css('color', 'red');
}

// 点击注册按钮
function OKbtn() {
    if (OK1 && OK2 && OK3 && OK4 && OK5 == true) {
        $('.zhucebtn').css('background', '#ff0036');
        $('.zhucebtn').css({ 'background': '#ff0036', cursor: 'pointer' });

        $('.zhucebtn').click(function () {
            $.ajax({
                type: "POST",
                url: "../api/phpapi/index.php",
                data: {
                    name: $('.zhao').val().trim(),
                    pwd: $('.mima').val(),
                    type: 'register'
                },
                success: function success(response) {
                    if (response) {
                        alert('注册成功，请登录');
                        window.location.href = "login.html";
                    } else {
                        alert('注册失败，请稍后再试');
                    }
                }
            });
        });
    } else {
        $('.zhucebtn').css('background', '#ccc');
        $('.zhucebtn').css({ 'background': '#ccc', cursor: 'not-allowed' });
        // alert("出错啦，请稍后再试");
    }
}