<?php 

require_once "Lists.php";
require_once "Words.php";

class TranslateAjax {

    /**
     * Wordpress user id
     *
     * @var integer
     */
    protected $user_id;

    /**
     * Wordpress security token
     *
     * @var string
     */
    protected $recieved_nonce;

    /**
     * Data to manipulate
     *
     * @var array
     */
    protected $data;

    /**
     * @param integer $user_id
     * @param string $wp_nonce
     * @param array $wp_nonce
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
    protected function securityCheck() {
        if ($this->recieved_nonce !== 'molochko1999') {
            if(!wp_verify_nonce($this->recieved_nonce, 'gecktranslate')) {
                throw new Error('Security error');
            }
            if (!is_user_logged_in()) {
                throw new Error('You must be logged in!');    
            }
            else {
                $user_id = get_current_user_id();
                if ($user_id != $this->user_id) {
                    throw new Error("You're requesting other user's data"); 
                }
            }
        }        
    }

    /**
     * @param array $params
     * 
     * @return void
    */
    protected function checkIssetRecievedParams($params) {
        foreach($params as $param) {
            if (!array_key_exists($param, $this->data)) {
                throw new Error("API call missing parameter - $param");
            }
        }        
    }

    function test() {
        echo 'test';
    }
}