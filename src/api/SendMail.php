<?php

  //邮箱配置
  $config=array(
    'MAIL_ADDRESS'  => '676486347@qq.com',
    'MAIL_SMTP'      => 'smtp.qq.com',
    'MAIL_LOGINNAME'  => '676486347@qq.com',
    'MAIL_PASSWORD' => 'hwapxnfzjymybfda',
    );
  

// 发送邮件
require("phpmailer/class.phpmailer.php");
require("phpmailer/class.smtp.php");
function SendMail($address,$title,$message)
{
    // vendor('PHPMailer.class#PHPMailer');
    $mail=new PHPMailer();          // 设置PHPMailer使用SMTP服务器发送Email
    $mail->IsSMTP();                // 设置邮件的字符编码，若不指定，则为'UTF-8'
    $mail->CharSet='UTF-8';         // 添加收件人地址，可以多次使用来添加多个收件人
    $mail->AddAddress($address);    // 设置邮件正文
    $mail->Body=$message;           // 设置邮件头的From字段。
    $mail->From='676486347@qq.com';  // 设置发件人名字
    $mail->FromName='验证码提示';  // 设置邮件标题
    $mail->Subject=$title;          // 设置SMTP服务器。
    $mail->Host='smtp.qq.com';     // 设置为"需要验证" ThinkPHP 的config方法读取配置文件
    $mail->SMTPAuth=true;           // 设置用户名和密码。
    $mail->Username='676486347@qq.com';
    $mail->Password='hwapxnfzjymybfda'; // 发送邮件。
    $result=$mail->Send();
    return($result);

}



$user_email=$_POST['zhao'];
$emailyzm=$_POST['yzm'];
        
$title="验证码";
$code= $emailyzm;
// 设置cookie
setcookie('codeyz', $code, 3600,'/');
$content='您的验证码为'.$code;
$a=sendMail($user_email,$title,$content);

// SendMail($address,$title,$message);





















//   var_dump ($config['MAIL_SMTP']);