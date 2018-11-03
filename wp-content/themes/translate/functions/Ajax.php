<?php 

class TranslateAjax {

    /**
     * Wordpress user id
     *
     * @var integer
     */
    private $user_id;

    /**
     * Wordpress security token
     *
     * @var string
     */
    private $recieved_nonce;

    /**
     * Data to manipulate
     *
     * @var array
     */
    private $data;

    /**
     * @param integer $user_id
     * @param string $wp_nonce
     */
    function __construct($user_id, $recieved_nonce, $data) {
        $this->user_id = $user_id;   
        $this->recieved_nonce = $recieved_nonce; 
        $this->data = $data; 
        $this->securityCheck();
    }

    /**
     * @return void
    */
    function securityCheck() {
        if(!wp_verify_nonce($this->recieved_nonce, 'gecktranslate')) {
            die('Security error');
        }
        if (!is_user_logged_in()) {
            die('You must be logged in!');    
        }
        else {
            $user_id = get_current_user_id();
            if ($user_id != $this->user_id) {
                die("You're requesting other user's data"); 
            }
        }
    }

    /**
     * @return void
    */
    function createList() {
        extract($this->data);
        $category_arr = wp_insert_term($listName, 'category', ['slug' => generateRandomString(64)]);
        if ($cat_id = $category_arr["term_id"]) {
            if ($cat_ids_json = get_field("lists", "user_".$this->user_id)) {
                $cat_ids_array = json_decode($cat_ids_json);   
                array_push($cat_ids_array, $cat_id);
                $cat_ids_json = json_encode($cat_ids_array);
                update_field("lists", $cat_ids_json, "user_".$this->user_id);
            } else {
                update_field("lists", json_encode([$cat_id]), "user_".$this->user_id);       
            }
        }   
        else {
            die("list wasn't created");
        }
    }

    function test() {
        echo 'test';
    }
}