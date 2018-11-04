$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "test",
        userId: window.userData.userId,
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "createList",
        userId: window.userData.userId,
        data: {
            listName: 'ajax list'
        }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "deleteList",
        userId: window.userData.userId,
        data: {
            id: 28
        }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "updateList",
        userId: window.userData.userId,
        data: {
            id: 30,
            name: "New Ajax Name"
        }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "getList",
        userId: window.userData.userId,
        data: {
            id: 30
        }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "getLists",
        userId: window.userData.userId,
        data: {
            ids: [30, 33]
        }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});

fetch('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=dict.1.1.20181026T231057Z.2ae7b2159b6e0f44.1b76f2af5640739f6fd89d91834369f1788a54fb&lang=en-ru&text=on time').then(res => res.json()).then(res => console.log(res))

$.ajax({
    type: "POST",
    url: window.userData.url,
    data: {
        security: window.userData.nonce,
        action: "addWord",
        userId: window.userData.userId,
        data: {
            'word': 'word to translate',
            'prim_trans': "translation primary",
            'sec_trans': [
                'sec trans 1',
                'sec trans 2',
            ],
            'lists': [33, 31]
            }
    },
    success: function(res) {
        console.log(res);
    },
    error: function(err) {
        console.log(err);
    }
});