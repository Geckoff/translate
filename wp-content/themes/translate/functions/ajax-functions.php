<?php

require_once "Ajax.php";

/**
 * @return object
*/
function instAjax() {
    return new TranslateAjax($_POST['userId'], $_POST['security'], $_POST['data']);
}

/**
 * Ajax function call
 * 
 * @return void
*/
function initApi($callback) {
    try {
        $trajax = instAjax();
        call_user_func(array($trajax, $callback));
        
    }
    catch (Error $e) {
        echo $e->getMessage();
    }
    die();   
}

/**
 * @return void
*/
function test() {
    initApi(__FUNCTION__);
}

/**
 * @return void
*/
function createList() {
    initApi(__FUNCTION__);  
}