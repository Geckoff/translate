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