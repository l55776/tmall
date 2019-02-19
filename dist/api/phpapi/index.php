<?php
/**
 * @index.php
 */
require('config/db.php');



$type=$_POST['type'];
// $type='g_select';




/**
 * 
 *分支
 *type:
 *       select 查询
 *       update 更新
 *       insert 插入
   *     delete 删除
 * 
 */

switch ($type) {
    case 'select':
    db_select();
        break;
    
    case 'db_update':
    db_update();
        break;
    
    case 'insert':
    db_insert();
        break;
    
    case 'db_delete':
    db_delete();
        break;

    case 'login':
    db_login();
        break;

    case 'register':
    db_register();
        break;

    case 'db_goodslist':
    db_goodslist();
        break;

    case 'out':
    db_out();
        break;

    case 'userinfo':
    userinfo();
        break;

    case 'g_select':
    g_select();
        break;

    case 'details': //详情页
    details();
        break;

    case 'detailsright': //详情页右侧看了又看
    detailsright();
        break;


    case 'jiarugouwuche': //加入购物车
    jiarugouwuche();
        break;

    case 'orderxiangqing': //点击立即购买详情
    orderxiangqing();
        break;

    case 'gouwuche': //点击购物车详情
    gouwuche();
        break;

    // case 'updatanunber': //点击修改数量
    // updatanunber();
    //     break;
}


// function  updatanunber()
// {
   
// }


//点击购物车详情
function gouwuche(){
    $uid= $_POST['uid'];
    $orderselsect=selects('tmorder', "user_id='$uid'");
//   dump($orderselsect);
    $row_num= count($orderselsect);
    $data=([
        "orderselsect"=>$orderselsect,
        "row_num"=>$row_num,
    ]);
    if($orderselsect){
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else{
        echo 0;
    }
}

//点击立即购买详情
function orderxiangqing(){
    $uid= $_POST['uid'];
    $good_id= $_POST['good_id'];
    $orderselsect=selects('tmorder',"good_id='$good_id' and user_id='$uid'");
    // dump($uid);
    // dump($good_id);
    if($orderselsect){
        echo json_encode($orderselsect,JSON_UNESCAPED_UNICODE);
    }else{
        echo 0;
    }
}



// 加入购物车
function jiarugouwuche(){
    $uid= $_POST['uid'];
    $good_id= $_POST['good_id'];
    $order_title= $_POST['order_title'];
    $order_price= $_POST['order_price'];
    $order_number= $_POST['order_number'];
    $order_images= $_POST['order_images'];
    $orderindent="001000".date("YmdHis"); //订单编号
    $ordertime=date("Y-m-d H:i:s");
    // dump($ordernumber);
        
    $orderselsect=selects('tmorder',"good_id='$good_id' and user_id='$uid'");
    // dump($orderselsect[0]);
    if($orderselsect){
        $oid=$orderselsect[0]['order_id'];
        $onum=$orderselsect[0]['order_number']+1;
        $update=update("tmorder","order_id='$oid'",'order_number',$onum);
        if($update){
            echo 1;
        }else{
            echo 0;
        }
    }else{
        $value="'$orderindent','$order_title','$order_price','$order_number','$order_images','$uid','$good_id','','','$ordertime'";
        $find=insert('tmorder',$value );
        if($find){
            echo 1;
        }else{
            echo 0;
        }
    }

    
}



// 详情页查询商品信息
function detailsright(){
    $page=$_POST['page'];
    $qty=$_POST['qty'];
    $setup=$_POST['setup'];
    $zdname=$_POST['zdname'];
 
    $find=select('goodlist',$page,$qty,$zdname,$setup);
    // dump($find);
    if($find){
        echo json_encode($find,JSON_UNESCAPED_UNICODE);
    }else{
        echo 0;
    }
}

// 详情页查询商品信息
function details(){
    $good_id=$_POST['good_id'];
 
    $find=selects('goodlist',"good_id='$good_id'");
    // dump($find);
    if($find){
        echo json_encode($find,JSON_UNESCAPED_UNICODE);
    }else{
        echo 0;
    }
}


//首页查询商品数据
 function g_select()
{
    $page=$_POST['page'];
    $qty=$_POST['qty'];

    $indexpage=0;
    $indexqty=10;
  
    $indexfind=select('indexfennav',$indexpage,$indexqty,"indexnav_id",'asc');
    
    for($i=0;$i<count($indexfind);$i++){

        $find=select('goodlist',$qty*$i,$qty,"good_id",'asc');
        $indexfind[$i]['goods']=$find;
    }

    if($indexfind){
        echo json_encode($indexfind,JSON_UNESCAPED_UNICODE);
      
    }else{
        echo 0;
        
    }
   
}
//首页查询用户信息
 function userinfo()
{
    $uid=$_POST['uid'];
    $find=selects('users',"uid='$uid'");
    // var_dump($name);
    if($find){
        echo json_encode($find,JSON_UNESCAPED_UNICODE);
      
    }else{
        echo 0;
        
    }
   
}

// 查询用户名是否存在
 function db_select()
{
    $name=$_POST['name'];
    $pwd=$_POST['pwd'];

    $find=selects('users',"username='$name'");
    // var_dump($name);
    if($find){
        // echo json_encode($find,JSON_UNESCAPED_UNICODE);
        echo 1;
    }else{
        echo 0;
        
    }
   
}

// 更新商品的数量
 function db_update()
{
    $name=$_POST['name'];
    $why=$_POST['why'];
    $num=$_POST['num'];
    // update($bname,$why,$name,$value)
    $upda=update('tmorder',"order_id=$why",$name,$num);
    dump($upda);
    if($upda){
        echo 1;
    }else{
        echo 0;
    }
}

// 增加一条商品
 function db_insert()
{
    // $value="'效果','mmmmmmmmmmmmm','',''"; 
    $name=$_POST['name'];
    $pwd=$_POST['pwd'];
    $value="'$name','$pwd','','',''"; 
    $insert=insert('goods', $value);
    if($insert){
        echo 1;
    }else{
        echo 0;
    }
}


// 删除 商品
 function db_delete()
{
    $why=$_POST['why']; //条件
    // delete($bname,$why)
    $deleteorder=delete('tmorder',"order_id='$why'");
    // dump($a);
    // if($deleteorder){
    //     echo 1;
    // }else{
    //     echo 0;
    // }
}


// 点击登录
 function db_login()
{
    $name=$_POST['name'];
    $pwd=md5($_POST['pwd']);
    $find=selects('users',"username='$name'");
    if($find){
        if($pwd==$find[0]['password']){
            if (isset($_COOKIE['uid'])){
                $logged=([
                    'msg' => 1,
                    'uid' =>  $find[0]['uid'],
                    'error' => "您已经登录"
                ]);
                 echo json_encode($logged,JSON_UNESCAPED_UNICODE);
            }else{
                 setcookie("username", "$name", time()+3600);
                 setcookie("uid", $find[0]['uid'], time()+3600);
                 $data=([
                     'msg' => 1,
                     'uid' => $find[0]['uid'],
                 ]);

                  echo json_encode($data,JSON_UNESCAPED_UNICODE);
                //  var_dump( $data);
            }
         }else{
             //账号密码错误
             $errormsg=([
                'msg' => 0,
                'error' => '密码错误',
            ]);
            echo json_encode($errormsg,JSON_UNESCAPED_UNICODE);
             // echo "账号密码错误";
         }
    }else{
        // 账号不存在
        $nonemsg=([
            'msg' => 2,
            'eror' => '账号不存在',
        ]);
        echo json_encode($nonemsg,JSON_UNESCAPED_UNICODE);
    }
    
}

// 注册
function db_register()
{
    // $value="'效果','mmmmmmmmmmmmm','',''"; 
    $name=$_POST['name'];
    $pwd=md5($_POST['pwd']);
  
    $value="'$name','$pwd','',''"; 
    $insert=insert('users', $value);
    // dump($insert);
    if($insert){
        echo 1;
    }else{
        echo 0;
    }
}

// 退出
function db_out()
{
    // $value="'效果','mmmmmmmmmmmmm','',''"; 
    $name=$_POST['name'];
    $pwd=md5($_POST['pwd']);
  
    $value="'$name','$pwd','',''"; 
    $insert=insert('users', $value);
    // dump($insert);
    if($insert){
        echo 1;
    }else{
        echo 0;
    }
}



// 列表页数据渲染，页码 初始化
function db_goodslist()
{
    $page=$_POST['page'];
 
    $urlcanshu=$_POST['urlcanshu'];
    $qty=$_POST['qty'];
    $zdname=$_POST['zdname']; //排序字段名
    $setup=$_POST['setup']; //排序方法
    $select= goodlistselect('goodlist',$page,$qty,$zdname,$setup,"title like '%$urlcanshu%'");
   
    $selects= selects('goodlist',"title like '%$urlcanshu%'");//查数据库总数量
    // dump($selects);
        
    // dump($select);
// 数据库总数量
    $numrows=count($selects);
    $data=array(
        "num_rows"=>$numrows,
        "regs"=>$select,
        "page"=>$page,
        "qty"=>$qty,
    );
    if($select){
        echo  json_encode($data,JSON_UNESCAPED_UNICODE);
    }else{
        echo 0;
    }

    
}















