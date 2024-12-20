var cluster = require('cluster');
var crypto = require('crypto');
var express = require('express');
var sleep = require('sleep-promise');

var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        // Create a worker
        cluster.fork();
    }
} else {
    // Workers share the TCP connection in this server
    var app = express();

    app.get('/', function (req, res) {
        // Simulate route processing delay
        var randSleep = Math.round(10000 + (Math.random() * 10000));
       
      sleep(2000).then(function() {
      
    
      });
      var numChars = Math.round(5000 + (Math.random() * 5000));
      var randChars = crypto.randomBytes(numChars).toString('hex');
      
      res.send(randChars);
    });

    // All workers use this port
    app.listen(8080);
}