<?php

/**
 * @ config.php
 * 
 */

$_CONFIGS = array(

	'db'	=>	array(
		'db_host'		=>	'localhost',
		'db_port'		=>	'3306',
		'db_user'		=>	'root',
		'db_password'	=>	'',
		'db_name'		=>	'lx',
	),

);


/**
 * @ common.php
 *
 */

/**
 * @ 格式化输出信息
 * @ params:
 * @	mixed $data : 要输出的数据
 * @	boolean $i : 是否在输出的时候同时输出数据类型，默认为false
 * @ return:
 * @	void
 */
function dump($data, $i=false) {
	echo '<pre>';
	if ($i) {
		var_dump($data);
	} else {
		print_r($data);
	}
	echo '</pre>';
}