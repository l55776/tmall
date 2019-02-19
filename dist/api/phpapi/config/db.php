<?php
/**
 * @index.php
 */
require('config.php');


// 链接数据库
$host=$_CONFIGS['db']['db_host'];
$name=$_CONFIGS['db']['db_user'];
$pwd=$_CONFIGS['db']['db_user'];
$db_name=$_CONFIGS['db']['db_name'];

$conn=new mysqli($host,$name,$pwd,$db_name);


// limit查询
/**
 * 1表名，
 * 4，排序字段名
 * 5，升序黄降序
 */
function select($bname,$page,$qty,$zdname,$setup){
    $page=isset( $page)?$page:0;
    $qty=isset($qty)?$qty:5;
    $sql="select *from $bname order by $zdname $setup limit $page,$qty";//根据条数查询
    $res=$GLOBALS['conn']->query($sql);
    $reg=$res->fetch_all(MYSQLI_ASSOC);
    return $reg;
    // dump($reg);
}




// 根据标题查询
/**
 * 1表名，
 * 4，排序字段名
 * 5，升序黄降序
 * 6,条件
 */
function goodlistselect($bname,$page,$qty,$zdname,$setup,$why){
    $page=isset( $page)?$page:0;
    $qty=isset($qty)?$qty:5;
    $sql="select *from $bname where $why order by $zdname $setup limit $page,$qty";//根据条数查询
//    dump($sql);
    $res=$GLOBALS['conn']->query($sql);
    $reg=$res->fetch_all(MYSQLI_ASSOC);
    return $reg;
    // dump($reg);
}


// 条件查询
function selects($bname,$why){
    $sql="select *from $bname where $why";//根据条件查询
    // var_dump($sql);
    $res=$GLOBALS['conn']->query($sql);
  
    if($res){
           return $reg=$res->fetch_all(MYSQLI_ASSOC);
       }else{
          return 0;
       }
    // dump($reg);
}

// 查询所有
function selectall($bname){
    $sql="select *from $bname ";//根据条数查询
    $res=$GLOBALS['conn']->query($sql);
  
    if($res){
           return $res;
       }else{
          return 0;
       }
    // dump($reg);
}

// selects('users','username=1111');

// update("users",'uid="1"','username','小明');
// 1:表名
// 2：id
// 3：字段名：
// 4：修改的值
function update($bname,$why,$name,$value){
    $msg="更新失败";
    $sql="update $bname set $name='$value' where $why";//根据条数查询
    dump($sql);
    $res=$GLOBALS['conn']->query($sql);
   if($res){
       return 1;
   }else{
      return 0;
   }
}


// 1:表名 $bnanme="users";
// $value="'效果','mmmmmmmmmmmmm','',''";  用法
// insert($bnanme,$value);
function insert($bname,$value){
    $sql="insert into $bname values ('',$value)";//
    $res=$GLOBALS['conn']->query($sql);
    // dump($sql);
   if($res){
       return 1;
   }else{
      return 0;
   }
}



/**
 * 删除
 * delete('users','uid=8');表名，条件
 */
function delete($bname,$why){
    $msg="删除失败";
    $sql="delete from $bname where $why";//
// dump($sql);
    $res=$GLOBALS['conn']->query($sql);
  
   if($res){
    dump(1);
       return 1;
   }else{
    dump(0);
      return 0;
   }
}






// select('users',0,3);













