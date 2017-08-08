<?php
/**
 * Created by PhpStorm.
 * User: fimion
 * Date: 8/7/2017
 * Time: 11:06 PM
 */
include('config.php');

$ch = curl_init(APIURL.USERNAME.'/posts');
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$posts=curl_exec($ch);
curl_close($ch);
file_put_contents('posts.json', 'var INITIALPOSTS='.$posts);

