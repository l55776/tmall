"use strict";

// 放大镜的js
$(function () {
    (function () {
        var ulobj = $(".imglist ul");var picimg = $(".imgpart .pic img");var objimg = $(".imgpart .bigpic img");ulobj.on("mouseenter", "li", function () {
            var imgsrc = $(this).children("img").attr("src");$(this).addClass("active").siblings().removeClass("active");picimg.attr("src", imgsrc);objimg.attr("src", imgsrc);
        });var pic = $(".imgpart .pic");var magnify = $(".imgpart .pic .magnify");var bigpic = $(".imgpart .bigpic");var objimg = $(".imgpart .bigpic img");pic.mousemove(function (e) {
            magnify.show();bigpic.show();var pagex = e.pageX;var pagey = e.pageY;var pictop = pic.offset().top;var picleft = pic.offset().left;var magnifyw = magnify.width();var magnifyh = magnify.height();var magnifytop = pagey - pictop - magnifyh / 2;var magnifyleft = pagex - picleft - magnifyw / 2;var picw = pic.width() - magnifyw;var pich = pic.height() - magnifyh;magnifytop = magnifytop < 0 ? 0 : magnifytop;magnifyleft = magnifyleft < 0 ? 0 : magnifyleft;magnifytop = magnifytop > pich ? pich : magnifytop;magnifyleft = magnifyleft > picw ? picw : magnifyleft;magnify.css({ top: magnifytop, left: magnifyleft });var minl = bigpic.width() - objimg.width();var mint = bigpic.height() - objimg.height();var objimgl = -magnifyleft * 2;var objimgt = -magnifytop * 2;objimgl = objimgl < minl ? minl : objimgl;objimgt = objimgt < mint ? mint : objimgt;objimg.css({ top: objimgt, left: objimgl });
        });pic.mouseleave(function () {
            magnify.hide();bigpic.hide();
        });
    })();
});

$(".header").load("public/header.html");
$(".footer").load("public/footer.html");

// 保修服务
var baoxiuok = true;
$('.tb-metatit dd a').click(function () {

    if (baoxiuok) {
        $('.tb-metatit dd ').css('borderColor', 'red');
        $(this).css('borderColor', '#fff');
        // $('.metatit-ul').show();
    }
    if (!baoxiuok) {
        $('.tb-metatit dd ').css('borderColor', '#fff');
        $(this).css('borderColor', '#999');
    }
    baoxiuok = !baoxiuok;
});

$('.tb-metatit dd ').on('mouseover', function () {
    $('.metatit-ul').show();
});
$('.tb-metatit dd ').on('mouseout', function () {
    $('.metatit-ul').hide();
});

$('.tb-metatit dd ul').on('click', 'li', function () {
    var sapn0 = $(this).find('span').eq(0).html();
    var sapn1 = $(this).find('span').eq(1).html();
    $('.fuwu').find('span').eq(0).html(sapn0);
    $('.fuwu').find('span').eq(1).html(sapn1);
});

// 减
$('.num .jian').click(function () {
    var nums = $(this).next().val();
    nums--;
    if (nums <= 1) {
        $(this).next().val('1');
    } else {
        $(this).next().val(nums);
    }
});

// 加
$('.num .jia').click(function () {
    var nums = $(this).prev().val();

    var kc = $('.num .kc i').html();
    nums++;
    // console.log(nums);
    // console.log(kc);
    if (nums == kc) {
        $(this).prev().val(kc);
        alert('库存没有啦');
    } else {
        $(this).prev().val(nums);
    }
});

// 详情点击特效
$('.nav ul li').click(function (e) {

    $(this).css('border', '1px solid #ccc').siblings().css('border', '1px solid #fff');
    $(this).css('height', '51px').siblings().css('height', '50px');

    if ($(this).index() == 0) {
        $(this).css('borderLeft', 'none');
    }
    $('.nav ul li a').css('color', '#333');
    $(this).find('a').css('color', 'red').siblings().css('color', '#333');
    $(this).css('borderBottom', 'none');

    $('.nav ul li p').css('display', 'none');
    $(this).children('p').css('display', 'block');

    // 显示当前点击页面内容
    var numi = $(this).index();
    // console.log(numi);
    $('.centre .plgroup section').eq(numi).css('display', 'block').siblings().css("display", 'none');
});

// 详情左边
function ali() {
    $(".ali").animate({ top: '6' }, "100", function () {
        $(".ali").animate({ top: '12' }, "100", function () {
            // $(".ali").animate({ top: '6' }, "100", function () {

            // });
        });
    });
}
setInterval(ali, 50);

// 获取urlid
var good_id = decodeURIs().good_id;

$.ajax({
    type: "POST",
    url: "../api/phpapi/index.php",
    data: {
        type: "details",
        good_id: good_id
    },
    success: function success(str) {
        var data = JSON.parse(str);
        console.log(data);
        $('.content .imglist ul li img').attr('src', data[0].images);
        $('.content .imgpart .pic  img').attr('src', data[0].images);
        $('.content .fenxianga2').html("收藏人气(" + data[0].moods + ")"); //       <!-- 分享 -->
        $('.content .center .tb-detail-hd h1').html(data[0].title); // <!-- 标题 -->
        $('.content .center .tm-fcs-panel strike').html("￥" + data[0].price); //  <!-- 价格 -->
        $('.content .center .tm-fcs-panel .dl2 dd:eq(0)').html("￥" + data[0].price);
        $('.content .center .tm-fcs-panel .dl3 dd span:eq(0)').html("想￥" + (data[0].price - 3) + "拿下？");
        $('.content .center .tm-ind-panel .li1').html(data[0].sales); //<!-- 销量 -->
        $('.content .center .tm-ind-panel .li2').html(data[0].appraise); //累计评价
        $('.content .center .tm-ind-panel .li3').html(data[0].toups); //天猫积分

        // 立即购买
        $('.content .center .tb-key .bay a:eq(0)').click(function () {
            $.ajax({
                type: "post",
                url: "../api/phpapi/index.php",
                data: {
                    uid: cookie.get('uid'),
                    type: 'jiarugouwuche',
                    good_id: data[0].good_id,
                    order_title: data[0].title,
                    order_price: data[0].price,
                    order_number: 1,
                    order_images: data[0].images

                },
                success: function success(str) {}

            });
            $('.content .center .tb-key .bay a:eq(0)').attr('href', "order.html?state=bay&good_id=" + data[0].good_id);
        });

        // 加入购物车
        jiarugouwuche();
        function jiarugouwuche() {
            $('.content .center .tb-key .bay a:eq(1)').click(function (e) {
                e.preventDefault();
                $.ajax({
                    type: "post",
                    url: "../api/phpapi/index.php",
                    data: {
                        uid: cookie.get('uid'),
                        type: 'jiarugouwuche',
                        good_id: data[0].good_id,
                        order_title: data[0].title,
                        order_price: data[0].price,
                        order_number: 1,
                        order_images: data[0].images

                    },
                    success: function success(str) {
                        console.log(str);
                        if (str) {
                            alert('加入成功');
                        }
                    }

                });
            });
        }

        // <!-- 店铺联系 -->
        $('.plxiangqing .shop-intro a').html(data[0].shopname);
    }
});

// 右边看了又看
function kanleyoukan() {
    $.ajax({
        type: "POST",
        url: "../api/phpapi/index.php",
        data: {
            type: "detailsright",
            page: randomNum(0, 300),
            qty: 3,
            zdname: 'good_id', //要排序的字段名字
            setup: 'asc' //排序方法 默认升序 
        },
        success: function success(str) {
            var goodlist = JSON.parse(str);
            var kanleyoukanhtml = '';
            kanleyoukanhtml += $.map(goodlist, function (item, key) {
                return "<li>\n                        <a href=\"details.html?good_id=" + item.good_id + "\">\n                            <img src=\"" + item.images + "\"alt=\"\">\n                            <span>\xA5" + item.price + "</span>\n                            <p>" + item.title + "</p>\n                        </a>\n                    </li>";
            }).join('');
            $('.content .rights ul').html(kanleyoukanhtml); //天猫积分
        }
    });
}

kanleyoukan();
$('.detailcontent .rights').on('click', '>p a', function (e) {
    e.preventDefault();
    kanleyoukan();
});