<?php
// 引入mysql文件
include('./mysql.php');
// 获取访问的方法
$fn = $_GET['fn'];
// add()  get() 
$fn();
// 添加数据的方法
function add(){
   // echo 222;
    $idea = $_GET['idea'];
    $title = $_GET['title'];
    $pos = $_GET['pos'];
  //  die;
  $sql = "insert into problem values(null,'$title','$idea','$pos')";
  $res = query($sql);
  echo $res;
}


// 获取数据的方法
function get(){
    // 规定每一页数据长度
    $length = 4;
  
    // 当前页码数
    $page = $_GET['page'];
      // 开始位置  (当前页码-1)*长度 
      $start = ($page-1)*$length;

    // 获取长度
    $sql1 = 'select  count(id) cou from problem';
    $res = select($sql1);
    $count = $res[0]['cou'];
    // 计算总的页数
    $cPage = ceil($count/$length);
    //  print_r( $cPage);die;

    $sql = "select * from problem order by id limit $start, $length";
    
    $res = select($sql);
    print_r(json_encode([
      'pData'=>$res,
      'cPage'=> $cPage
    ]));
}

// 删除数据的方法
function del(){
    $id = $_GET['infoId'];
    $sql = 'delete from problem where id='.$id;
    $res = query($sql);
    echo $res;
}
//修改数据的方法
function mod(){
  $idea = $_GET['idea'];
  $title = $_GET['title'];
  $pos = $_GET['pos'];
  $sql = "insert into problem values(null,'$title','$idea','$pos')";
  $res = query($sql);
  echo $res;
}
?>