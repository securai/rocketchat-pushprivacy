# rocketchat-pushprivacy
A lot of information get's send out to external server. 
To prevent this, rocketchat-pushprivacy is a proxy to relay the push notification over your server to clean 
from any unwanted data.

Send Out:
```
{"token":"[some token]","options":{"_id":"CP......N6Pp","createdAt":"2016-08-31T11:10:03.930Z","createdBy":"<SERVER>","from":"push","title":"<some Title>","text":"<some Text>","payload":{"host":"https://rocketchat.local","rid":"5nQ...........6","sender":{"_id":"5n.....j","username":"nv1t"},"type":"d","name":null},"badge":1,"sound":"chime","apn":{"text":"<some Text>"},"query":{"userId":"ji2BWno....D6"}}}
```

Actualy needed:
```
{"token":"[some token]","options":{"badge":1,"sound":"chime","apn":{"text":"<some Text>"}}}
```

## Deploy
```
$ npm i rocketchat-pushprivacy
$ rocketchat-pushprivacy -p 4444 -i 127.0.0.1 -m "Securai needs you!"
```

Now you can redirect push notification in your administration interface over your proxy :)
Only the token and the defined proxy will get send out! 
