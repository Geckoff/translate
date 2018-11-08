import axios from "axios";
import stringify from "qs-stringify";

let baseUrl, security, userId;

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

export const apiRequest = (action, data) => {
    const submitData = stringify({
        ...initData,
        action,   
        data
    });

    instance
        .post("", submitData)
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
};
