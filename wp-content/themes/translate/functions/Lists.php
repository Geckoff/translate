<?php 

class Lists extends TranslateAjax {

    /**
     * Array of categories ids that are used as lists
     *
     * @var array
     */
    private $list_ids_array;

    /**
     * @param integer $user_id
     * 
     * @return void
     */
    function __construct($user_id, $recieved_nonce, $data) {
        parent::__construct($user_id, $recieved_nonce, $data);
        $cat_ids_json = get_field("lists", "user_".$user_id);
        $cat_ids_json = !$cat_ids_json ? "[]" : $cat_ids_json;
        $this->list_ids_array = json_decode($cat_ids_json); 
    }

    /**
     * Method returns position of the list id in list ids json object saved in user profile
     * If list id wasn't found the function returns false. So it can be used for determimning
     * if the list belongs to the current user.
     * 
     * @return integer|bool
    */
    protected function listUserPosition($id) {
        return array_search($id, $this->list_ids_array);
    }

    /**
     * Create translations list
     * 
     * @return void
    */
    public function createList() {
        $this->checkIssetRecievedParams(['listName']);
        extract($this->data);
        $listName = wp_strip_all_tags($listName);
        $category_arr = wp_insert_term($listName, 'category', ['slug' => generateRandomString(64)]);
        if ($cat_id = $category_arr["term_id"]) {
            $cat_ids_array = $this->list_ids_array;  
            array_push($cat_ids_array, $cat_id);
            $cat_ids_json = json_encode($cat_ids_array);
            // var_dump($cat_ids_array);
            // die();
            update_field("lists", $cat_ids_json, "user_".$this->user_id);
        }   
        else {
            throw new Error("wp_insert_term error");
        }
    }

    /**
     * Delete translation list
     * 
     * @return void
    */
    public function deleteList() {
        $this->checkIssetRecievedParams(['id']);
        extract($this->data);
        $user_id = $this->user_id;
        $cat_ids_array = $this->list_ids_array;  
        if ($this->listUserPosition($id) !== false) {
            if (wp_delete_term($id, 'category')) {
                $cat_ids_array = array_values(array_diff($cat_ids_array, [$id]));
                $cat_ids_json = json_encode($cat_ids_array);
                update_field("lists", $cat_ids_json, "user_".$user_id);
            }
            else {
                throw new Error('wp_delete_term error');        
            }
        }
        else {
            throw new Error('list id doesnt belong to the current user');
        }
    }

    /**
     * Update translation list name
     * 
     * @return void
    */
    public function updateList() {
        $this->checkIssetRecievedParams(['id', 'name']);
        extract($this->data);
        $cat_ids_array = $this->list_ids_array;  
        $name = wp_strip_all_tags($name);
        $args = [
            'name' => $name
        ];
        if ($this->listUserPosition($id) !== false) {
            if (!wp_update_term($id, 'category', $args)) {
                throw new Error('wp_update_term error');  
            }
        }
        else {
            throw new Error('list id doesnt belong to the current user');
        }
    }

    /**
     * Get translation list name
     * 
     * @return void
    */
    public function getList() {
        $this->checkIssetRecievedParams(['id']);
        extract($this->data);    
        if ($this->listUserPosition($id) !== false) {
            if ($name = get_the_category_by_ID($id)) {
                $return_args = json_encode([
                    'name' => $name,
                    'id' => $id
                ]);    
                echo $return_args;  
            }
            else {
                throw new Error('get_the_category_by_ID error');
            }
        }
        else {
            throw new Error('list id doesnt belong to the current user');
        }
    }

    /**
     * Get multiple translation lists name
     * 
     * @return void
    */
    public function getLists() {
        $this->checkIssetRecievedParams(['ids']);
        extract($this->data); 
        if ($this->isAllListsBelong($ids)) {
            $cats = get_categories([
                "hide_empty" => 0,
                'include' => $ids
            ]);
            if (count($cats) > 0) {
                $cats_return = [];
                foreach($cats as $cat) {
                    $cats_return_single = [
                        'id' => $cat->term_id,
                        'name' => $cat->name,
                    ];
                    array_push($cats_return, $cats_return_single);    
                }
                echo json_encode($cats_return);
            }   
            else {
                throw new Error('no categories');    
            }    
        } 
        else {
            throw new Error('not all list ids belong to the current user');
        }
    }

    /**
     * Get all translation lists name
     * 
     * @return void
    */
    public function getAllLists() {
        $ids = $this->list_ids_array;
        if ($this->isAllListsBelong($ids)) {
            $cats = get_categories([
                "hide_empty" => 0,
                'include' => $ids
            ]);
            if (count($cats) > 0) {
                $cats_return = [];
                foreach($cats as $cat) {
                    $cats_return_single = [
                        'id' => $cat->term_id,
                        'name' => $cat->name,
                    ];
                    array_push($cats_return, $cats_return_single);    
                }
                echo json_encode($cats_return);
            }   
            else {
                throw new Error('no categories');    
            }    
        } 
        else {
            throw new Error('not all list ids belong to the current user');
        }
    }

    /**
     * Check if all passed list ids belong to the current user
     * 
     * @param array $lists
     * 
     * @return void
    */
    protected function isAllListsBelong($lists) {
        return count(array_intersect($lists, $this->list_ids_array)) == count($lists);
    }
}