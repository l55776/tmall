"use strict";

$(".header").load("public/header.html");
$(".footer").load("public/footer.html");

// 轮播图
//swiper基本款
var s1 = new Swiper('.swiper-container', {
    autoplay: { //自动轮播
        delay: 2000, //间隔时间
        disableOnInteraction: false
    },
    loop: true, //无缝
    navigation: { //上下按钮
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: { //焦点跟随
        el: '.swiper-pagination',
        clickable: true, //点击焦点跳到指定图片
        renderBullet: function renderBullet(index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'; //生成焦点数字
        }
    },
    mousewheel: true //滚动滑轮可以切图
});

var oBox = document.getElementById('swiper-container');

oBox.onmouseover = function () {
    //鼠标经过停止
    s1.autoplay.stop();
};
oBox.onmouseout = function () {
    //鼠标经过离开
    s1.autoplay.start();
};

// <!-- 超市商品 -->
// 第一层
$.ajax({
    type: "POST",
    url: "../api/phpapi/index.php",
    data: {
        type: "g_select",
        page: 0,
        qty: 8
    },
    success: function success(str) {
        var goodlist = JSON.parse(str);
        // console.log(goodlist);
        var goodlisthtml = '';
        goodlisthtml += $.map(goodlist, function (item, Key) {

            return " <div class=\"cs\">\n            <div class=\"cs-header\">\n                <h2>" + item.indexnav_big_title + "</h2>\n            </div>\n            <div class=\"cs-content\">\n                <!-- \u5DE6 -->\n                <div class=\"cs-l\">\n                    <div class=\"cs-l-h\">\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title1 + "\">\n                            <span>" + item.indexnav_min_title1 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title2 + "\">\n                            <span>" + item.indexnav_min_title2 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title3 + "\">\n                            <span>" + item.indexnav_min_title3 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title4 + "\">\n                            <span>" + item.indexnav_min_title4 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title5 + "\">\n                            <span>" + item.indexnav_min_title5 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title6 + "\">\n                            <span>" + item.indexnav_min_title6 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title7 + "\">\n                            <span>" + item.indexnav_min_title7 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title8 + "\">\n                            <span>" + item.indexnav_min_title8 + "</span>\n                        </a>\n                        <a href=\"goodslist.html?mintitle=" + item.indexnav_min_title9 + "\">\n                            <span>" + item.indexnav_min_title9 + "</span>\n                        </a>\n                    </div>\n                    <div class=\"cs-l-f\">\n                        <a href=\"\">\n                            <img src=\"" + item.indexnav_left_img + "\" alt=\"\">\n                        </a>\n                    </div>\n                </div>\n                <!-- \u4E2D -->\n                <div class=\"cs-m\">\n                    <ul class=\"cs-m-ul\">\n                         " + goods(item.goods) + "\n                    </ul>\n                </div>\n                <!-- \u53F3 -->\n                <div class=\"cs-r\">\n                    <div class=\"cs-r-h\">\n                        <img src=\"https://img.alicdn.com/tps/i4/TB14fMEIFXXXXc8XFXXzAd2FVXX-150-39.png\" alt=\"\">\n                    </div>\n                    <div class=\"cs-r-f\">\n                        <a href=\"\"><img src=\"" + item.indexnav_right_img1 + "\"\n                                alt=\"\"></a>\n                        <a href=\"\"><img src=\"" + item.indexnav_right_img2 + "\"\n                                alt=\"\"></a>\n                    </div>\n                </div>\n            </div>\n        </div>";
        }).join(' ');
        $('.j-mdv-chaoshi').html(goodlisthtml);

        // 改变左边的北景颜色
        var backgroundcolor = ['#FE7A65', '#FFBB00', '#6390F7', '#FF90A0', '#F8C375', '#84AFFE', '#C87BFF', '#29CFC1', '#F49360', '#C6A868'];
        for (var i = 0; i < $('.cs-l-h').length; i++) {
            $('.cs-l-h').eq(i).css('background', backgroundcolor[i]);
        }
    }
});

function goods(obj) {
    var goossss = '';
    goossss += $.map(obj, function (itemgoood, Key) {
        return "<li>\n                    <a href=\"details.html?good_id=" + itemgoood.good_id + "\">\n                        <img src=\"" + itemgoood.images + "\" alt=\"\">\n                        <h4>" + itemgoood.title + "</h4>\n                        <p> " + itemgoood.nimtitle + "</p>\n                        <p><sup>\uFFE5</sup> <span>" + itemgoood.price + "</span></p>\n                        <i class=\"iconfont icon-tianmaochaoshigouwuche\"></i>\n                    </a>\n                </li>";
    }).join(' ');
    return goossss;
}