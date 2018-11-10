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
 * @param string action
 * @param array data
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
        // .catch(function(error) {
        //     console.log(error);
        // });
};

export const getAllLists = data => {
    return apiRequest('getAllLists', data);    
}
