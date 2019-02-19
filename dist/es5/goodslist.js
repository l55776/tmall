"use strict";

$(".goodslist-header").load("public/header.html");
$(".goodslist-footer").load("public/footer.html");

$('.xin').click(function (e) {
    alert("收藏成功");
});

var lishuzu = ul.getElementsByTagName("li");
for (var i in lishuzu) {
    lishuzu[i].index = i;
    lishuzu[i].onclick = function () {
        var str = "";
        for (var j in goodslist[this.index]) {

            str += j + "=" + goodslist[this.index][j] + "&";
        }
        // console.log(str);
        var date = str.slice(0, -1);

        location.href = '淘宝详情页.html?' + "id=" + date; //传商品的信息到详情页 ，两种方法
        // location.href = '淘宝详情页.html?' + "id=" + lishuzu[i].index;//传商品的id到详情页
    };
}

// 排序箭头上下

var paixuzdname = 'good_id';
var setup = 'asc';

$('.filter ul li a').click(function () {
    var shangxia = $(this).find('i').prop('className');
    // console.log();
    switch ($(this).text()) {
        case "人气":
            paixuzdname = 'moods';
            break;

        case "销量":
            paixuzdname = 'sales';
            break;

        case "价格":
            paixuzdname = 'price';
            break;
    }

    if (shangxia == 'iconfont icon-order-asc') {
        $(this).find('i').removeClass().addClass('iconfont icon-order-desc');
        setup = "desc";
        good();
    } else if (shangxia == 'iconfont icon-order-desc') {
        $(this).find('i').removeClass().addClass('iconfont icon-order-asc');
        setup = "asc";
        good();
    }
});

// 获取url信息参数
var URLxinxi = decodeURIs();
// console.log(URLxinxi);
var urlcanshu = URLxinxi.mintitle;
var pageas = '0';
var qty = '15';
good();
function good() {
    $.ajax({
        type: "POST",
        url: "../api/phpapi/index.php",
        data: {
            type: "db_goodslist",
            page: pageas,
            qty: qty,
            urlcanshu: urlcanshu,
            zdname: paixuzdname, //要排序的字段名字
            setup: setup //排序方法 默认升序 

        },
        success: function success(str) {
            var goodlist = JSON.parse(str);
            // console.log(goodlist);
            if (!goodlist) {
                $('.goodslist ul').html('哦噢！没有找到宝贝，找下其他的看看吧').css({
                    textAlign: 'center',
                    color: '#ccc',
                    fontSize: '30px'
                }); //渲染数据
                return;
            }
            var goodshtml = '';
            goodshtml += $.map(goodlist.regs, function (item, key) {
                return "<li>\n                            <a href=\"#\" > <i class=\"xin\" id=\"xin\">\u2665</i></a>\n                            <div class=\"img\">\n                                <a href=\"details.html?good_id=" + item.good_id + "\" >  <img src=\"" + item.images + "\" alt=\"\"></a>\n                                <p><a href=\"\">\u627E\u540C\u6B3E</a><a href=\"\">\u627E\u76F8\u4F3C</a> </p>\n                            </div>\n    \n                            <div class=\"title\"><a href=\"details.html?good_id=" + item.good_id + "\">" + item.title + "</a></div>\n                            <div class=\"price\">\n                                <a href=\"#\"> <i>\uFFE5</i><em>" + item.price + "</em><del><i>\uFFE5</i>" + item.price + "</del></a>\n                                <a href=\"#\"><span>" + item.adds + "</span></a>\n                            </div>\n                            <div class=\"saleinfo\">\n                                <a href=\"\"><span></span><em>" + item.sales + "</em></a>\n                                <a href=\"\"> \u5305\u90AE </a>\n                                <a href=\"\"><img src=\"../public/img/goodslist/ali.jpg\" alt=\"\"></a>\n                            </div>\n                        </li>";
            }).join('');
            // console.log(goodlist);

            $('.goodslist ul').html(goodshtml); //渲染数据
            var sumpage = Math.ceil(goodlist.num_rows / goodlist.qty); //共多少页

            $('.page .sumpage ').text("共" + sumpage + "页、");
            $('.page .numrows ').html("共" + goodlist.num_rows + "条");

            // li激活第几页状态

            var liliactivepage = goodlist.page / goodlist.qty; //当前页面的页码
            liactive();
            function liactive() {
                $('.page ul li').eq(liliactivepage).css({ 'background': 'red', 'color': '#fff' }).siblings().css({ 'background': '#fff', 'color': '#999' });
            }

            // 点击第几页
            $('.page').on('click', ' ul li', function () {
                pageas = $(this).html() >= sumpage ? pageas = (sumpage - 1) * qty : ($(this).html() - 1) * qty;
                // pageas = ($(this).html() - 1) * qty;
                $(this).css({ 'background': 'red', 'color': '#fff' }).siblings().css({ 'background': '#fff', 'color': '#999' });
                // console.log(pageas);
                good();
            });

            // 点击到第几页
            $('.page .page-skip').on('click', '.pagebtn', function () {
                shurupage = $('.shurupage').val();
                if (shurupage >= sumpage) {
                    pageas = (sumpage - 1) * qty;
                    $('.shurupage').val(sumpage);
                } else if (shurupage <= 1) {
                    pageas = 0;
                    $('.shurupage').val(1);
                }
                good();
            });

            // // 上一页，下一页
            // $('.page').on('click', '.prvepage', function () {
            //     if ($(this).html().slice(10) == "上一页") {
            //         if (liliactivepage) {
            //             pageas = (liliactivepage--) * qty;
            //             good();
            //         } else {
            //             pageas = liliactivepage;
            //             good();
            //         }
            //     }
            //     if ($(this).html().slice(0, 3) == "下一页") {
            //         if (liliactivepage >= sumpage) {
            //             pageas = (sumpage - 1) * qty;
            //             good();

            //         } else if (liliactivepage < sumpage) {
            //             pageas = liliactivepage++ * qty;
            //             // console.log(pageas);
            //             good(); alert('123');
            //         }
            //     }
            //     console.log(pageas);
            //     // good();
            // });


            // 上一页
            $('.page .prvepage1').click(function () {

                if (liliactivepage) {
                    pageas = liliactivepage-- * qty;
                    good();
                } else {
                    pageas = liliactivepage;
                    good();
                }
            });

            // 下一页
            $('.page .prvepage2').click(function () {

                if (liliactivepage >= sumpage) {
                    pageas = (sumpage - 1) * qty;
                    good();
                }
                if (liliactivepage < sumpage) {

                    pageas = (liliactivepage + 1) * qty;
                    // console.log(pageas);
                    good();
                }

                console.log(pageas);
                // good();
            });
        }
    });
}