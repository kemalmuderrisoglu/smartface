const Http = require("sf-core/net/http");
const http = new Http();

exports.login = function(username,password){
 return new Promise(function(resolve,reject) {
     http.request({
     'url':'https://training-alperozisik.c9users.io/login',
     'headers': {
         "Content-Type":"application/json"
      },
     'method':'POST',
     'body': 
     JSON.stringify({
       username: username,
       password: password
     }),
     onLoad: function(response){
      if(response.statusCode === 200){
         resolve("Success");
      }
      else {
        reject(response.body);
      }
         
     },
     onError: function(e){
         // Handle error like:
         if(e.statusCode === 500){
             reject("Invalid Login");
         }
         else{
             reject("Server responsed with: " + e.statusCode + ". Message is: " + e.message);
         }
     }
 });
  
 });

}

