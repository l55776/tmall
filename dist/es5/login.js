"use strict";

$(".login-footer").load("public/footer.html");
$('.login-login').on('click', '.shaoma', function () {
    $('.login-loginsm').show();
    $('.login-login').hide();
});
$('.login-loginsm').on('click', '.shaoma', function () {
    $('.login-loginsm').hide();
    $('.login-login').show();
});
$('.mimadl').on('click', function () {
    $('.login-loginsm').hide();
    $('.login-login').show();
});

// 鼠标经过二维码
$('.sm ').on('mouseover', '.img', function () {
    $(".img").stop();
    $(".img").animate({ left: '+0px' }, "slow", function () {
        $(this).css('width', '300px');
        $(this).css('paddingRight', '200px');
        $(".sjimg").css('display', 'block');
    });
});

// 鼠标离开二维码
$('.sm ').on('mouseout', '.img', function () {
    $(".img").stop();
    $(".sjimg").css('display', 'none');
    $(".img").animate({ left: '+80px' }, "slow", function () {
        $(this).css('width', '140px');
        $(this).css('paddingRight', '0px');
    });
});

// 正则验证登录

var look1 = false;
var look2 = false;
$('.login-login form ').on('keyup', 'input', function () {
    // 判断账号是否为空
    if ($(this).attr('class') == "zhao") $(this).val() == "" ? look1 = false : look1 = true;
    if ($(this).attr('class') == "mima") $(this).val() == "" ? look2 = false : look2 = true;

    if (look1 == true && look2 == true) {
        $('.loginbtn').css({ background: 'red', cursor: 'pointer' });
    } else {
        $('.loginbtn').css({ background: '#ccc', cursor: 'not-allowed' });
    }
});

// 点击登录

$('.loginbtn').click(function () {
    loginbtn();
});
function loginbtn() {
    if (look1 == true && look2 == true) {

        $.ajax({
            type: "POST",
            url: "../api/phpapi/index.php",
            data: {
                name: $('.zhao').val().trim(),
                pwd: $('.mima').val(),
                type: 'login'
            },
            success: function success(str) {
                $data = JSON.parse(str); // console.log($data);
                // console.log(str);
                // console.log($data);
                // console.log($data.msg);
                console.log($data);
                if ($data.msg == "1") {
                    // 登录成功 
                    document.cookie = "uid=" + $data.uid;
                    window.location.href = 'index.html';
                }if ($data.msg == '0') {
                    //密码错误
                    $('.loginform .errormsg').css('display', 'block');
                    $('.loginform .errormsg').html('你输入的密码和账户名不匹配，是否忘记密码或忘记会员名?');
                }if ($data.msg == "2") {
                    // 账号不存在
                    $('.loginform .errormsg').css('display', 'block');
                    $('.loginform .errormsg').html('账号不存在，前往注册?');
                }
            }
        });
    }
}