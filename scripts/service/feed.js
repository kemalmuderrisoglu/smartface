const Http = require("sf-core/net/http");
const http = new Http();

exports.getFeed = function(pageIndex) {
    pageIndex = pageIndex || 1;
    return new Promise(function(resolve, reject) {
        http.request({
            'url': 'https://training-alperozisik.c9users.io/feed?page=' + pageIndex,
            'headers': {
                "Content-type": "application/json"
            },
            'method': 'GET',
            onLoad: function(response) {
                response.body = response.body.toString();
                if (response.statusCode === 200)
                    resolve(JSON.parse(response.body));
                else {
                    reject(response.body);
                }
            },
            onError: function(e) {
                // Handle error like:
                if (e.statusCode === 500) {
                    reject("Internal Server Error Occurred.");
                }
                else if (e.statusCode === 401) {
                    reject("invalid Logon");
                }
                else {
                    reject("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
                }
            }
        });
    });


};
