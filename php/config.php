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

define('DB_HOST','192.168.0.233');
define('DB_NAME','pixel_react_tickets');
define('DB_USER','pixel_wpuser');
define('DB_PASS','EtkOM1H3lCYwbqwr0GTb');