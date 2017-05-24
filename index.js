#!/usr/bin/env node
'use strict';

var http = require('http'),
    https = require('https'),
    argv = require('optimist')
      .usage('Usage: $0 -i [ip] -p [port] -m [message]')
      .alias('i','ip')
      .alias('m','message')
      .alias('p','port')
      .describe('i','IP Address to Listen on  [127.0.0.1]')
      .describe('m','Message to send in Push Notification [Securai needs you!]')
      .describe('p','Port to Listen on [4444]')
      .default({
        i:'127.0.0.1',
        p:4444,
        m:'Securai needs you!'
      })
      .argv;

var log = (level,message) => {
  console.log(new Date()+' - '+message)
}

http.createServer((req, res) => {
  if(req.method == 'POST') {
    var body = '';
    req.on('data', (data) => {
      body += data;
    });

    req.on('end', () => {
      log('info','POST Request received')
      var json = JSON.parse(body);
      var data = JSON.stringify({'token':json['token'],'options': {'badge':1,'sound':'chime','apn': {'text':argv.message}}});


      var notificationreq = https.request({
        host: 'gateway.rocket.chat',
        port: 443,
        method: 'POST',
        path: '/push/apn/send',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(data)
        }
      }, (res) => {
        var result = '';
        res.on('data', (chunk) => {
          result += chunk;
        });
        res.on('end', () => {
          log('info',result);
        });
        res.on('error', (err) => {
          log('error',err);
        })
      });
      // req error
      notificationreq.on('error', (err) => {
        log('error',err);
      });
      notificationreq.write(data);
      notificationreq.end();
    });
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('post received');
  } else {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
  }
}).listen(argv.port,argv.ip);

log('info','RocketChat-PushPrivacy was started '+argv.ip+':'+argv.port+' sending message "'+argv.message+'"');
