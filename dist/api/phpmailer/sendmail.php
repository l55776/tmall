<?php 	




 

 public function sendemail()
	{
		 $emali='2041566370@qq.com';
		 $title='xiaom';
		 $comtent='maidasdv';
		 $a=sendMail($emali,$title,$comtent);
		 var_dump($a);
	

	}