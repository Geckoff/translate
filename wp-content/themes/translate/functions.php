<?php 

add_action( 'wp_enqueue_scripts', 'enqueue_parent_styles' );

function enqueue_parent_styles() {
   wp_enqueue_style( 'parent-style', get_template_directory_uri().'/style.css' );
}

require_once get_stylesheet_directory()."/functions/ajax-functions.php";

/**
* Words custom post type
**/
function tr_words() {
    register_post_type('words', array(
        'public' => true,
        'menu_icon' => 'dashicons-hammer',
        'labels' => array(
            'name' => 'Words',
            'all_items' => 'All Words',
            'add_new' => 'New Word',
            'add_new_item' => 'Add New Word',
        ),
        'taxonomies' => array(
            'category'
        )
    ));
}

add_action('init', 'tr_words');

/**
* Save token on user registration and log in
**/
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

// function saveToken() {
//     if (is_user_logged_in()) {
//         $user_id = get_current_user_id();
//         $token = get_field('token', "test", 'user_'.$user_id);  
//         if (!$token) {
//             update_field('token', generateRandomString(32), 'user_'.$user_id);   
//         }
//     }
// }

// add_action('init', 'saveToken');

/**
* Ajax function registration
**/

add_action('wp_ajax_test', 'test'); //Ajax check string

// Lists
add_action('wp_ajax_createList', 'createList'); // Create list
add_action('wp_ajax_deleteList', 'deleteList'); // Delete list
add_action('wp_ajax_updateList', 'updateList'); // Update list
add_action('wp_ajax_getList', 'getList'); // Get list
add_action('wp_ajax_getLists', 'getLists'); // Get list
add_action('wp_ajax_getAllLists', 'getAllLists'); // Get list

add_action('wp_ajax_addUpdateWord', 'addUpdateWord'); // Add and update word
add_action('wp_ajax_deleteWord', 'deleteWord'); // Delete word
add_action('wp_ajax_getWord', 'getWord'); // Get single word
add_action('wp_ajax_getWordsByList', 'getWordsByList'); // Get words associated with a list
add_action('wp_ajax_getWordsByNumber', 'getWordsByNumber'); // Get random words
add_action('wp_ajax_getWordsByLatestForgotten', 'getWordsByLatestForgotten'); // Get the latest forgotten words
add_action('wp_ajax_getWordsByMostForgotten', 'getWordsByMostForgotten'); // Get the most forgotten words


add_filter('allowed_http_origins', 'add_allowed_origins');

function add_allowed_origins($origins) {
    $origins[] = 'http://translate.local:8888';
    $origins[] = 'http://translate.local';
    $origins[] = 'http://translate.local:8888/';
    $origins[] = 'http://translate.local/';
    return $origins;
}