<?php 
class Words extends Lists {

    /**
     * @param integer $user_id
     * @param string $wp_nonce
     * @param array $wp_nonce
     */
    function __construct($user_id, $recieved_nonce, $data) {
        parent::__construct($user_id, $recieved_nonce, $data);
        if (isset($this->data['lists'])) {
            if (!$this->isAllListsBelong($this->data['lists'])) {
                throw new Error("Not all lists belong to the current user");
            }
        }
    }

    /**
     * Check if all the translations are not blank
     * 
     * @param string $word
     * @param string $prim_trans
     * @param array $sec_trans
     */
    private function checkWordsRequirements($word, $prim_trans, $sec_trans = []) {
        if (strlen($word) < 1) {
            throw new Error('Word cannot be blank');
        }
        if (strlen($prim_trans) < 1) {
            throw new Error('Word must have translation');
        }
        foreach ($sec_trans as $single_sec_trans) {
            if (strlen($single_sec_trans) < 1) {
                throw new Error('Secondary translation cannot be blank');   
            }
        }
    }

    /**
     * Add new word
     * 
     * @return void
     */
    public function addWord() {
        $this->checkIssetRecievedParams(['word', 'prim_trans', 'sec_trans', 'lists']);
        extract($this->data);
        $this->checkWordsRequirements($word, $prim_trans, $sec_trans);
        $args = [
            'post_title' => $word,
            'post_type' => 'words',
            'post_category' => $lists
        ];
        if ($id = wp_insert_post($args, true)) {
            update_post_meta($id, 'primary_translation', $prim_trans);
            foreach($sec_trans as $single_sec_trans) {
                $row = [
                    'translation' => $single_sec_trans   
                ];
                add_row('secondary_translations', $row , $id);    
            }
        }
        else {
            throw new Error('wp_insert_post error');
        }
    }
}