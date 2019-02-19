$(".header").load("public/header.html");
$(".footer").load("public/footer.html");

// 轮播图
//swiper基本款
var s1 = new Swiper('.swiper-container', {
    autoplay: {//自动轮播
        delay: 2000,//间隔时间
        disableOnInteraction: false
    },
    loop: true,//无缝
    navigation: {//上下按钮
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },
    pagination: {//焦点跟随
        el: '.swiper-pagination',
        clickable: true,//点击焦点跳到指定图片
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';//生成焦点数字
        }
    },
    mousewheel: true//滚动滑轮可以切图
});

var oBox = document.getElementById('swiper-container');

oBox.onmouseover = function () {//鼠标经过停止
    s1.autoplay.stop();
}
oBox.onmouseout = function () {//鼠标经过离开
    s1.autoplay.start();
}


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
    success: function (str) {
        var goodlist = JSON.parse(str);
        // console.log(goodlist);
        var goodlisthtml = '';
        goodlisthtml += $.map(goodlist, function (item, Key) {

            return ` <div class="cs">
            <div class="cs-header">
                <h2>${item.indexnav_big_title}</h2>
            </div>
            <div class="cs-content">
                <!-- 左 -->
                <div class="cs-l">
                    <div class="cs-l-h">
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title1}">
                            <span>${item.indexnav_min_title1}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title2}">
                            <span>${item.indexnav_min_title2}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title3}">
                            <span>${item.indexnav_min_title3}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title4}">
                            <span>${item.indexnav_min_title4}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title5}">
                            <span>${item.indexnav_min_title5}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title6}">
                            <span>${item.indexnav_min_title6}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title7}">
                            <span>${item.indexnav_min_title7}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title8}">
                            <span>${item.indexnav_min_title8}</span>
                        </a>
                        <a href="goodslist.html?mintitle=${item.indexnav_min_title9}">
                            <span>${item.indexnav_min_title9}</span>
                        </a>
                    </div>
                    <div class="cs-l-f">
                        <a href="">
                            <img src="${item.indexnav_left_img}" alt="">
                        </a>
                    </div>
                </div>
                <!-- 中 -->
                <div class="cs-m">
                    <ul class="cs-m-ul">
                         ${ goods(item.goods)}
                    </ul>
                </div>
                <!-- 右 -->
                <div class="cs-r">
                    <div class="cs-r-h">
                        <img src="https://img.alicdn.com/tps/i4/TB14fMEIFXXXXc8XFXXzAd2FVXX-150-39.png" alt="">
                    </div>
                    <div class="cs-r-f">
                        <a href=""><img src="${item.indexnav_right_img1}"
                                alt=""></a>
                        <a href=""><img src="${item.indexnav_right_img2}"
                                alt=""></a>
                    </div>
                </div>
            </div>
        </div>`;

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
        return `<li>
                    <a href="details.html?good_id=${itemgoood.good_id}">
                        <img src="${itemgoood.images}" alt="">
                        <h4>${itemgoood.title}</h4>
                        <p> ${itemgoood.nimtitle}</p>
                        <p><sup>￥</sup> <span>${itemgoood.price}</span></p>
                        <i class="iconfont icon-tianmaochaoshigouwuche"></i>
                    </a>
                </li>`;
    }).join(' ');
    return goossss;
}






