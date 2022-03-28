<?php
  $user = $_GET['user'];
  if($user){ // 存在
     echo 1;
  }else{  // 不存在
     echo 2;
  }
?>