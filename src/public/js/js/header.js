// 鼠标经过
$('.nav-fuli').mouseover(function () {
    $(".fuli-gwc").stop();
    $(".gwc-xialakuang").stop();
    $(".fuli-gwc .fulibg").stop();
    $(".fuli-gwc .fulibg").stop();

    $(".fuli-gwc").animate({ width: '+250px' }, "500");
    $(".gwc-xialakuang").animate({ width: '+214px' }, "500");
    $(".fuli-gwc .fulibg").animate({ width: '+214px' }, "500", function () {
        $(".gwc-xialakuang").animate({ height: '+360px' }, "500");
    });
});

$('.nav-fuli').mouseout(function () {
    $(".fuli-gwc").stop();
    $(".gwc-xialakuang").stop();
    $(".fuli-gwc .fulibg").stop();
    $(".fuli-gwc .fulibg").stop();

    $(".gwc-xialakuang").animate({ height: '+0px' }, "500", function () {
        $(".fuli-gwc .fulibg").animate({ width: '+184px' }, "500");
        $(".fuli-gwc").animate({ width: '+220px' }, "500");
        $(".gwc-xialakuang").animate({ width: '+184px' }, "500");
    });
});


// 全部分类吸顶菜单
$(window).scroll(function () {
    var st = $(this).scrollTop();
    if (st >= 115) {
        $('.nav-cont').css({
            position: 'fixed',
            top: 0,
            'z-index': 2,
            background: '#fef'
        });
    }
    if (st <= 115) {
        $('.nav-cont').css({
            position: '',
            background: '#fff'
        });
    }
});

// 返回顶部
$('.TOP').click(function (e) {
    $(window).scrollTop(0);
});

// 获取用户id 判断是否登录
var cookies = cookie.get('uid');
if (cookies) {
    $.ajax({
        type: "post",
        url: "../api/phpapi/index.php",
        data: {
            uid: cookies,
            type: 'userinfo'
        },

        success: function (response) {
            $datas = JSON.parse(response)
            // console.log($datas);
            // console.log($datas[0].username);
            if ($datas) {
                $('.loginname').html("Hi." + $datas[0].username).attr("href", "www.baidu.com");
                $('.loginout').html("退出").attr("href", "#");
                $('.loginout').click(function () {
                    document.cookie = "uid=" + null;
                    location.reload();
                });
            }

        }
    });


}


// 购物车显示数量
$.ajax({
    type: "post",
    url: "../api/phpapi/index.php",
    data: {
        uid: cookies,
        type: 'gouwuche',
    },
    success: function (str) {
        var data = JSON.parse(str);
        // console.log(data);
        $('.tmall_header .gwc span').html(data.row_num);
    }
});



// 搜素商品
$('.sousuobtn').click(function () {
    var sousuotext = $(this).prev().val();
    if (sousuotext) {
        window.location.href = "goodslist.html?mintitle=" + sousuotext;
    } else {
        alert('内容不能为空');
    }



});

