

window.onload = function () {
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
                num: num,
            },
        });
    }

    // 点击减数量
    $(".amount_box").on('click', 'a:eq(0)', function () {
        var num = $(this).next().val();
        num = (--num <= 1) ? 1 : num;

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
        var prices = price.substring(1);  //价格
        result = num * prices;    // 一件商品的多个数量的总金额
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
            var order_id = parseInt(_this.parent().attr('oid'));
            // console.log(order_id);
            // 删除数据库
            $.ajax({
                type: "POST",
                url: "../api/phpapi/index.php",
                data: {
                    type: 'db_delete',
                    why: order_id,
                },
                success: function (str) {
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






