<?php

require_once "Ajax.php";

/**
 * @param class $class
 * 
 * @return object
*/
function instAjax($class) {
    return new $class($_POST['userId'], $_POST['security'], $_POST['data']);
}

/**
 * Ajax function call
 * 
 * @param function $callback
 * @param class $class
 * 
 * @return void
*/
function initApi($callback, $class) {
    try {
        $trajax = instAjax($class);
        call_user_func(array($trajax, $callback));        
    }
    catch (Error $e) {
        echo "Translation application API error! - ".$e->getMessage();
    }
    die();   
}

/**
 * @return void
*/
// function test() {
//     initApi(__FUNCTION__);
// }

/**
 * @return void
*/
function createList() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function deleteList() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function updateList() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function getList() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function getLists() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function getAllLists() {
    initApi(__FUNCTION__, 'Lists');  
}

/**
 * @return void
*/
function addUpdateWord() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function deleteWord() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWord() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWordsByList() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWordsByNumber() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWordsByLatestForgotten() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWordsByMostForgotten() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function updateWordForgot() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function updateWordRan() {
    initApi(__FUNCTION__, 'Words');  
}

/**
 * @return void
*/
function getWordsByIds() {
    initApi(__FUNCTION__, 'Words');  
}