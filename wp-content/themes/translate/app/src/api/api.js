import axios from "axios";
import stringify from "qs-stringify";

let baseUrl, security, userId;

/**
 * Setting api calls credentials depending on environment
 */
if (process.env.hasOwnProperty('REACT_APP_BASEURL')) {
    [baseUrl, security, userId] = [process.env.REACT_APP_BASEURL, process.env.REACT_APP_SECURITY, process.env.REACT_APP_USERID];
}
else if (window.hasOwnProperty("userData")) {
    [baseUrl, security, userId] = window.userData;
}

const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
    }
});

const initData = {
    security: security,
    userId: userId
};

/**
 * Get most forgotten words
 * 
 * @param {string} action
 * @param {array} data
 * 
 * @return void
 */
export const apiRequest = (action, data = {}) => {
    const submitData = stringify({
        ...initData,
        action,   
        data
    });

    return instance
        .post("", submitData)
};

/**
 * Get all lists
 * 
 * @param {Object} data - empty object
 */
export const getAllLists = data => {
    return apiRequest('getAllLists', data);    
}

/**
 * Create list
 * 
 * @param {Object} data
 * @param {string} data.listName - name of the list
 */
export const createList = data => {
    return apiRequest('createList', data);    
}

/**
 * Get single list
 * 
 * @param {Object} data
 * @param {integer} data.id - id of the list
 */
export const getList = data => {
    return apiRequest('getList', data);    
}

/**
 * Update list
 * 
 * @param {Object} data
 * @param {integer} data.id - id of the list
 * @param {string} data.name - new name of the list
 */
export const updateList = data => {
    return apiRequest('updateList', data);    
}

/**
 * Delete list
 * 
 * @param {Object} data
 * @param {integer} data.id - id of the list
 */
export const deleteList = data => {
    return apiRequest('deleteList', data);    
}

/**
 * Add or update word. If id is passed as a parameter edit functinality is used. Otherwise the function adds the word
 * 
 * @param {Object} data
 * @param {integer=} data.id - id of the word
 * @param {string} data.word - translated word
 * @param {string} data.prim_trans - primary translation
 * @param {string} data.prim_trans_pos - part of the spich for the primary translation
 * @param {array} data.sec_trans - array if secondary translations
 * @param {array} data.sec_trans[].translation - single secondary translation
 * @param {array} data.sec_trans[].pos - part of the spich for the single secondary translation
 * @param {array} data.lists - array of lists the word is assigned to
 * @param {integer} data.lists[] - id of the list
 */
export const addUpdateWord = data => {
    return apiRequest('addUpdateWord', data);    
}

/**
 * Get single word
 * 
 * @param {Object} data
 * @param {integer} data.id - id of the word
 */
export const getWord = data => {
    return apiRequest('getWord', data);    
}

/**
 * Delete word
 * 
 * @param {Object} data
 * @param {integer} data.id - id of the word
 */
export const deleteWord = data => {
    return apiRequest('deleteWord', data);    
}
