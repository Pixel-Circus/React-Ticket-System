<?php
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

$DB_HOST='192.168.0.233';
$DB_NAME='pixel_react_tickets';
$DB_USER='pixel_wpuser';
$DB_PASS='EtkOM1H3lCYwbqwr0GTb';
if ( $_SERVER['SERVER_NAME'] == 'tickets.pixelcircus.d3v' ) {
    $DB_HOST='localhost';
    $DB_NAME='react_tickets';
    $DB_USER='root';
    $DB_PASS='root';
}
define('DB_HOST',$DB_HOST);
define('DB_NAME',$DB_NAME);
define('DB_USER',$DB_USER);
define('DB_PASS',$DB_PASS);