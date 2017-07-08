<?php
/**
 * Created by PhpStorm.
 * User: fimion
 * Date: 7/2/2017
 * Time: 9:00 AM
 */

require_once 'config.php';


// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    die();
}

$stuff = json_decode(file_get_contents("php://input"), true);
$result = array("msg"=>'');
if($stuff['username'] == USERNAME && $stuff['password'] == PASSWORD){
    $ch = curl_init('https://jsonbin.org/_/bearer');
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('authorization: token '.APIKEY));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $success = curl_exec($ch);
    if($success !== false){
        $result = json_decode($success, true);
        $result['msg'] = 'OK';
    }


}else{
    header('HTTP/1.0 401 Unauthorized');
    $result['msg']="ACCESS Denied";
}

header('Content-Type: application/json');
echo json_encode($result);