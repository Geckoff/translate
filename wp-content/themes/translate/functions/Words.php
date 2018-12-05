<?php 
class Words extends Lists {

    /**
     * @param integer $user_id
     * @param string $wp_nonce
     * @param array $wp_nonce
     */
    function __construct($user_id, $recieved_nonce, $data) {
        parent::__construct($user_id, $recieved_nonce, $data);
        $this->checkDataRequirements();   
    }

    /**
     * Check if data meets the requirenments
     * 
     * @return void
     */
    private function checkDataRequirements() {
        if (is_array($this->data)) {
            extract($this->data);
        }        
        if (isset($lists)) {
            if (!$this->isAllListsBelong($lists)) {
                throw new Error("Not all lists belong to the current user");
            }
        }
        if (isset($word) && strlen($word) < 1) {
            throw new Error('Word cannot be blank');
        }
        if (isset($prim_trans) && strlen($prim_trans) < 1) {
            throw new Error('Word must have translation');
        }
        if (isset($sec_trans)) {
            foreach ($sec_trans as $single_sec_trans) {
                if (strlen($single_sec_trans['translation']) < 1) {
                    throw new Error('Secondary translation cannot be blank');   
                }
            }
        }
        if (isset($id)) {
            if ($post = get_post($id)) {
                if ($post->post_author != $this->user_id) {
                    throw new Error('You cannot access words that blong to another users');    
                }
            }
            else {
                throw new Error('get_post error');     
            }
        }
        if (isset($words_count) && !is_numeric($words_count) ) {
            throw new Error('Amount of words should be a number');  
        }
        if (isset($words_ids)) {
            if (!is_array($words_ids)) {
                throw new Error('You have to pass list of words ids you wnat to get'); 
            }
            else {
                if (!$this->isAllWordsBelong($words_ids)) {
                    throw new Error("It looks like you're trying to access the word that doesn't belong to current user.");    
                }
            }
        }
    }

    private function isAllWordsBelong($words_ids) {
        $words = get_posts([
            'author' => $this->user_id,
            'post_type' => 'words',
            'post_status' => "any",
            'posts_per_page' => -1,
            'post__in' => $words_ids
        ]);
        return count($words) === count($words_ids);
    }

    /**
     * Add new word and update word
     * 
     * @return void
     */
    public function addUpdateWord() {
        $this->checkIssetRecievedParams(['word', 'prim_trans', 'lists']);
        extract($this->data);
        $word = wp_strip_all_tags($word);
        $args = [
            'post_title' => $word,
            'post_type' => 'words',
            'post_category' => $lists,
            'post_status' => 'publish',
            'post_author' => $this->user_id
        ];
        if (isset($id)) {
            $args['ID'] = $id;  
        }
        if ($id = wp_insert_post($args, true)) {
            update_post_meta($id, 'primary_translation', wp_strip_all_tags($prim_trans));
            update_post_meta($id, 'primary_translation_pos', wp_strip_all_tags($prim_trans_pos));
            if (isset($args['ID'])) {
                $rows = get_field('secondary_translations', $id);
                if ($rows) {
                    $rows_count = count($rows);
                    for ($i = 0; $i < $rows_count; $i++) {
                        delete_row( 'secondary_translations', 1, $id);
                    }
                }     
            }
            if (isset($sec_trans)) {
                foreach($sec_trans as $single_sec_trans) {
                    $single_sec_trans_translation = wp_strip_all_tags($single_sec_trans['translation']);
                    $single_sec_trans_pos = wp_strip_all_tags($single_sec_trans['pos']);
                    $row = [
                        'translation' => $single_sec_trans_translation,   
                        'pos' => $single_sec_trans_pos   
                    ];
                    add_row('secondary_translations', $row , $id);    
                }
            }            
        }
        else {
            throw new Error('wp_insert_post error');
        }
    }

    /**
     * Update statistics if the word was forgotten
     * 
     * @return void
     */
    public function updateWordForgot() {
        $this->checkIssetRecievedParams(['words_ids']);
        extract($this->data);
        foreach($words_ids as $word_id) {
            update_field('last_forgot', time(), $word_id);
            $times_forgot = get_field('times_forgot', $word_id);
            $times_forgot_new = $times_forgot ? ++$times_forgot : 1;
            update_field('times_forgot', 1, $word_id); 
        }
    }

    /**
     * Update statistics if the words was a part of the test
     * 
     * @return void
     */
    public function updateWordRan() {
        $this->checkIssetRecievedParams(['words_ids']);
        extract($this->data);
        foreach($words_ids as $word_id) {
            update_field('last_ran', time(), $word_id);
            $times_ran = get_field('times_ran', $word_id);
            $times_ran_new = $times_ran ? ++$times_ran : 1;
            update_field('times_ran', $times_ran_new, $word_id); 
            //update_field('times_ran', 1, $word_id); 
        }
    }

    /**
     * Delete word
     * 
     * @return void
     */
    public function deleteWord() {
        $this->checkIssetRecievedParams(['id']);
        extract($this->data);
        if (!wp_delete_post($id)) {
            throw new Error('wp_delete_post error');   
        }
    }

    /**
     * Get single word
     * 
     * @return void
     */
    public function getWord() {
        $this->checkIssetRecievedParams(['id']);
        extract($this->data);
        $post = get_post($id);
        $word = $post->post_title;
        $lists = wp_get_post_categories($id);
        $prims_trans = get_field('primary_translation', $id);
        $prims_trans_pos = get_field('primary_translation_pos', $id);
        $sec_trans = get_field('secondary_translations', $id);
        if (!is_array($sec_trans)) {
            $sec_trans_mapped = [];    
        } 
        else {
            $sec_trans_mapped = array_map(function($elem){
                return [
                    'translation' => $elem["translation"],
                    'pos' => $elem["pos"]
                ];
            }, $sec_trans);
        }   
        $times_ran = get_field('times_ran', $id);
        $times_forgot = get_field('times_forgot', $id);
        $last_forgot = get_field('last_forgot', $id);
        $last_ran = get_field('last_ran', $id);

        $return_data = [
            'id' => $id,
            'word' => $word,
            'lists' => $lists,
            'prims_trans' => $prims_trans,
            'prims_trans_pos' => $prims_trans_pos,
            'sec_trans' => $sec_trans_mapped,
            'times_ran' => $times_ran,   
            'times_forgot' => $times_forgot,   
            'last_forgot' => $last_forgot,   
            'last_ran' => $last_ran
        ];

        echo json_encode($return_data);
    }

    /**
     * Get multiple words
     * 
     * @return void
     */
    private function getWords($add_args = []) {
        $args = [
            'author' => $this->user_id,
            'post_type' => 'words',
            'post_status' => "any", 
            'posts_per_page' => -1
        ];
        $args = array_merge($args, $add_args);  
        $posts = get_posts($args);  
        $posts_return = array_map(function($post){
            $id = $post->ID;
            $word = $post->post_title;
            $lists = wp_get_post_categories($id);
            $prims_trans = get_field('primary_translation', $id);
            $prims_trans_pos = get_field('primary_translation_pos', $id);
            $sec_trans = get_field('secondary_translations', $id);
            $sec_trans_mapped = array_map(function($elem){
                return [
                    'translation' => $elem["translation"],
                    'pos' => $elem["pos"]
                ];
            }, $sec_trans);
            $times_ran = get_field('times_ran', $id);
            $times_forgot = get_field('times_forgot', $id);
            $last_forgot = get_field('last_forgot', $id);
            $last_ran = get_field('last_ran', $id); 
            
            return  [
                'id' => $id,
                'word' => $word,
                'lists' => $lists,
                'prims_trans' => $prims_trans,
                'prims_trans_pos' => $prims_trans_pos,
                'sec_trans' => $sec_trans_mapped,
                'times_ran' => $times_ran,   
                'times_forgot' => $times_forgot,   
                'last_forgot' => $last_forgot,   
                'last_ran' => $last_ran
            ];
        }, $posts);
        
        echo json_encode($posts_return);
    }

    /**
     * Get specific list of words
     * 
     * @return void
     */
    public function getWordsByList() {
        $this->checkIssetRecievedParams(['lists']);
        extract($this->data);        
        $this->getWords(['category__in' => $lists]);      
    }

    /**
     * Get list of words by words ids
     * 
     * @return void
     */
    public function getWordsByIds() {
        $this->checkIssetRecievedParams(['words_ids']);
        extract($this->data);        
        $this->getWords(['post__in' => $words_ids]);      
    }

    /**
     * Get specific random number of words
     * 
     * @return void
     */
    public function getWordsByNumber() {
        $this->checkIssetRecievedParams(['words_count']);
        extract($this->data);    
        $this->getWords(['orderby' => 'rand', 'posts_per_page' => $words_count]);      
    }

    /**
     * Get latest forgotten words
     * 
     * @return void
     */
    public function getWordsByLatestForgotten() {
        $this->checkIssetRecievedParams(['words_count']);
        extract($this->data);    
        $this->getWords([
            'meta_key' => 'last_forgot',
            'orderby'   => 'meta_value_num',
            'meta_query' => [
                [
                    'key' => 'last_forgot',
                    'value' => 0,
                    'compare' => '>'
                ]
            ],
            'posts_per_page' => $words_count
        ]);      
    }

    /**
     * Get most forgotten words
     * 
     * @return void
     */
    public function getWordsByMostForgotten() {
        $this->checkIssetRecievedParams(['words_count', 'lists']);
        extract($this->data);    
        $this->getWords([
            'meta_key' => 'times_forgot',
            'orderby'   => 'meta_value_num',
            'meta_query' => [
                [
                    'key' => 'times_forgot',
                    'value' => 0,
                    'compare' => '>'
                ]
            ],
            'posts_per_page' => $words_count,
            'category__in' => $lists
        ]);      
    }
}