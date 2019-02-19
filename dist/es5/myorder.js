"use strict";

$(".header").load("public/header.html");
$(".footer").load("public/footer.html");

// 结算行的滚动事件
$(window).scroll(function () {

    var offheight = $('.cartMain').height() - 400;
    var scroll = $(window).scrollTop();
    if (scroll >= 300) {
        $('.bar-wrapper ').css('position', ' relative');
    }
    if (scroll <= 300) {
        $('.bar-wrapper').css('position', 'fixed');
    }
    // console.log(offheight);
    // console.log(scroll);
});

// 获取当前用id
var cookie = cookie.get('uid');
var state = decodeURIs();
// console.log(state.state);
if (state.state == 'bay') {
    $.ajax({
        type: "post",
        url: "../api/phpapi/index.php",
        data: {
            uid: cookie,
            type: 'orderxiangqing',
            good_id: state.good_id
        },
        success: function success(str) {
            // console.log(str);
            var item = JSON.parse(str)[0];
            console.log(item);
            var orderhtml1 = " <ul class=\"order_lists\">\n                <li class=\"list_chk\">\n                    <input type=\"checkbox\" id=\"checkbox_" + item.order_id + "\" class=\"son_check\">\n                    <label for=\"checkbox_" + item.order_id + "\"></label>\n                </li>\n                <li class=\"list_con\">\n                    <div class=\"list_img\"><a href=\"javascript:;\"><img src=\"" + item.order_images + "\"\n                                alt=\"\"></a></div>\n                    <div class=\"list_text\"><a href=\"javascript:;\">" + item.order_title + "</a></div>\n                    <div class=\"item-icons\">\n                        <a href=\"\"><img src=\"https://assets.alicdn.com/sys/common/icon/trade/xcard.png\" alt=\"\"></a>\n                        <a href=\"\"><img src=\"https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png\" alt=\"\"></a>\n                        <a href=\"\"><img src=\"https://img.alicdn.com/tps/i4/T1BCidFrNlXXaSQP_X-16-16.png\" alt=\"\"></a>\n                    </div>\n                </li>\n                <li class=\"list_info\">\n                    <p>\u89C4\u683C\uFF1A\u9ED8\u8BA4</p>\n                    <p>\u5C3A\u5BF8\uFF1A16*16*3(cm)</p>\n                </li>\n                <li class=\"list_price\">\n                    <p class=\"price\">\uFFE5" + item.order_price + "</p>\n                </li>\n                <li class=\"list_amount\">\n                    <div class=\"amount_box\" id=\"" + item.order_id + "\">\n                        <a href=\"javascript:;\" class=\"reduce reSty\">-</a>\n                        <input type=\"text\" value=\"" + item.order_number + "\" class=\"sum\">\n                        <a href=\"javascript:;\" class=\"plus\">+</a>\n                    </div>\n                </li>\n                <li class=\"list_sum\">\n                    <p class=\"sum_price\">\uFFE5" + item.order_price * item.order_number + "</p>\n                </li>\n                <li class=\"list_op\">\n                    <p class=\"del\" id=\"" + item.order_id + "\"  ><a href=\"javascript:;\" class=\"delBtn\" id=\"" + item.order_id + "\" >\u79FB\u9664\u5546\u54C1</a></p>\n                </li>\n            </ul>";

            $('.order_content').html(orderhtml1);
            // console.log(data);
            dianj();
        }
    });
}

if (state.state == 'gwc') {
    $.ajax({
        type: "post",
        url: "../api/phpapi/index.php",
        data: {
            uid: cookie,
            type: 'gouwuche'
        },
        success: function success(str) {

            var data = JSON.parse(str);
            // console.log(data);
            var orderhtml2 = '';

            orderhtml2 += $.map(data.orderselsect, function (item, key) {
                return " <ul class=\"order_lists\">\n                <li class=\"list_chk\">\n                    <input type=\"checkbox\" id=\"checkbox_" + item.order_id + "\" class=\"son_check\">\n                    <label for=\"checkbox_" + item.order_id + "\"></label>\n                </li>\n                <li class=\"list_con\">\n                    <div class=\"list_img\"><a href=\"javascript:;\"><img src=\"" + item.order_images + "\"\n                                alt=\"\"></a></div>\n                    <div class=\"list_text\"><a href=\"javascript:;\">" + item.order_title + "</a></div>\n                    <div class=\"item-icons\">\n                        <a href=\"\"><img src=\"https://assets.alicdn.com/sys/common/icon/trade/xcard.png\" alt=\"\"></a>\n                        <a href=\"\"><img src=\"https://img.alicdn.com/tps/i3/T1Vyl6FCBlXXaSQP_X-16-16.png\" alt=\"\"></a>\n                        <a href=\"\"><img src=\"https://img.alicdn.com/tps/i4/T1BCidFrNlXXaSQP_X-16-16.png\" alt=\"\"></a>\n                    </div>\n                </li>\n                <li class=\"list_info\">\n                    <p>\u89C4\u683C\uFF1A\u9ED8\u8BA4</p>\n                    <p>\u5C3A\u5BF8\uFF1A16*16*3(cm)</p>\n                </li>\n                <li class=\"list_price\">\n                    <p class=\"price\">\uFFE5" + item.order_price + "</p>\n                </li>\n                <li class=\"list_amount\" >\n                    <div class=\"amount_box\" id=\"" + item.order_id + "\">\n                        <a href=\"javascript:;\" class=\"reduce reSty\">-</a>\n                        <input type=\"text\" value=\"" + item.order_number + "\" class=\"sum\">\n                        <a href=\"javascript:;\" class=\"plus\">+</a>\n                    </div>\n                </li>\n                <li class=\"list_sum\">\n                    <p class=\"sum_price\">\uFFE5" + item.order_price * item.order_number + "</p>\n                </li>\n                <li class=\"list_op\" >\n                    <p class=\"del\" id=\"" + item.order_id + "\"><a href=\"javascript:;\" class=\"delBtn\"  id=\"" + item.order_id + "\">\u79FB\u9664\u5546\u54C1</a></p>\n                </li>\n            </ul>";
            }).join('');
            $('.order_content').html(orderhtml2);
            // console.log(data);
            dianj();
        }

    });
}

function dianj() {

    var sum_result = 0;

    // 全部选中
    var quanxuanok = true;
    (function quanxuan() {
        $('.cartBox .shop').click(function () {
            if (quanxuanok) {
                $(".order_lists .son_check").next('label').css("background-image", "url(../public/img/order/mark1.png)");
                $(".order_lists .son_check").next('label').attr("checked", 'checked'); //添加属性
                // $(this).removeAttr("checked");
            } else {
                $(".order_lists .son_check").next('label').css("background-image", "none");
                $(".order_lists .son_check").next('label').removeAttr("checked");
            }
            quanxuanok = !quanxuanok;
            sumresult();
        });
    })();

    // 自定义复选框 点击显示隐藏
    $("input[type='checkbox']").css('display', 'none');
    $("input[type='checkbox']").click(function () {
        if (!$(this).next('label').attr("checked")) {
            $(this).next('label').css("background-image", "url(../public/img/order/mark1.png)");
            $(this).next('label').attr("checked", 'checked'); //添加属性
            $('.bar-wrapper .bar-right .calBtn a').css('background', 'red');
            $('.bar-wrapper .bar-right .calBtn a').css('cursor', 'pointer');
        } else {
            $(this).next('label').css("background-image", "none");
            $(this).next('label').removeAttr("checked");
            $('.bar-wrapper .bar-right .calBtn a').css('background', '#B0B0B0');
            $('.bar-wrapper .bar-right .calBtn a').css('cursor', 'not-allowed');
        }
        sumresult();
    });

    // 结算金额

    function sumresult() {
        var sum_sums = 0;
        var sonCheckBox = $(".order_lists .son_check").next();
        var arr = [];
        for (var i = 0; i < sonCheckBox.length; i++) {
            if (sonCheckBox.eq(i).attr("checked")) {
                arr.push(i);
            }
            if (arr.length == sonCheckBox.length) {
                $('.cartBox .shop').css("background-image", "url(../public/img/order/mark1.png)");
            } else {
                $('.cartBox .shop').css("background-image", "none");
            }
        }
        var sum_resultss = 0;
        for (var i = 0; i < arr.length; i++) {
            sum_resultss += sonCheckBox.eq(arr[i]).parent().siblings('.list_sum').find('.sum_price').html().substring(1) * 1;
            sum_sums += sonCheckBox.eq(arr[i]).parent().siblings('.list_amount').find('.sum').val() * 1;
        }
        // 总金额的显示
        $('.total_text').html("￥" + sum_resultss.toFixed(2));
        $('.piece_num').html(sum_sums);
    }

    // 点击加数量
    $(".amount_box").on('click', 'a:eq(1)', function () {
        var num = $(this).prev().val();
        console.log(num);
        num++;
        $(this).prev().val(num);

        // 获取当前id
        var order_id = parseInt($(this).parent().attr('id'));

        prices(this, num);
        sumresult();

        // 修改数据库数量
        updatenumver(order_id, num);
    });

    // 修改数据库数量
    function updatenumver(order_id, num) {
        $.ajax({
            type: "POST",
            url: "../api/phpapi/index.php",
            data: {
                type: "db_update",
                name: 'order_number',
                why: order_id,
                num: num
            }
        });
    }

    // 点击减数量
    $(".amount_box").on('click', 'a:eq(0)', function () {
        var num = $(this).next().val();
        num = --num <= 1 ? 1 : num;

        // 获取当前id
        var order_id = parseInt($(this).parent().attr('id'));

        $(this).next().val(num);
        prices(this, num);
        sumresult();
        console.log(num);
        // 修改数据库数量
        updatenumver(order_id, num);
    });

    // 点击价格变化
    var result;
    function prices(self, num) {
        var price = $(self).parent().parent().prev().find('.price').html();
        var prices = price.substring(1); //价格
        result = num * prices; // 一件商品的多个数量的总金额
        $(self).parent().parent().next().find('.sum_price').html("￥" + result);
    }

    //移除商品
    // 弹窗
    $('.list_op').on('click', '.delBtn', function () {
        $('.model_bg').css('display', 'block');
        $('.my_model').css('display', 'block');
        var order_lists = $(this).parent().parent().parent();
        var _this = $(this);
        $('.dialog-sure').on('click', function () {
            order_lists.remove();

            // 获取当前id
            var order_id = parseInt(_this.parent().attr('id'));
            // console.log(order_id);
            // 删除数据库
            $.ajax({
                type: "POST",
                url: "../api/phpapi/index.php",
                data: {
                    type: 'db_delete',
                    why: order_id
                },
                success: function success(str) {
                    // console.log(str);
                }
            });

            // 查找是否已全部删除完
            var del = $('.order_content .order_lists').length;
            if (!del) {
                $('.cartBox .shop').css("background-image", "none");
            }
            $('.model_bg').css('display', 'none');
            $('.my_model').css('display', 'none');
            sumresult();
        });
    });

    $('.closeModel').click(function () {
        $('.model_bg').css('display', 'none');
        $('.my_model').css('display', 'none');
    });
}