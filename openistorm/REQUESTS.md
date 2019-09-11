# Authentication
```
curl -X POST http://iws.inkode.it:4443/oauth/token/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
      "grant_type": "password",
      "client_id": "ohZEFwRrhDK23uUwtMBsxcdiH7rzCOWrm4iB0ksq",
      "client_secret": "bcPqFd9EOhESj3RMMrm9rNUPK3CM9Vk6vuOa3gUeVwj9udv45HGoQTg48lGZOvkd2eB0ftPZBxbfpAr4lO6tcxXyiw91Eehfk2zD0rmeFXvextFPTm6uZnmWFNhFd42u",
      "username": "giorgio",
      "password": "ciaociao"
    }'
```

##### JSON PARAMETERS
```json
{
  "grant_type": "password",
  "client_id": "ohZEFwRrhDK23uUwtMBsxcdiH7rzCOWrm4iB0ksq",
  "client_secret": "bcPqFd9EOhESj3RMMrm9rNUPK3CM9Vk6vuOa3gUeVwj9udv45HGoQTg48lGZOvkd2eB0ftPZBxbfpAr4lO6tcxXyiw91Eehfk2zD0rmeFXvextFPTm6uZnmWFNhFd42u",
  "username": "giorgio",
  "password": "ciaociao"
}
```
### RESPONSE:

```json
{
    "access_token": "vbyQyJg1mCFpvqet2y29FGwShGdiBV",
    "token_type": "Bearer",
    "expires_in": 36000,
    "refresh_token": "7A99u9FroIvrRfF6nEHvUlqBHKO8bx",
    "scope": "read write groups"
}
```


# User profile

### GET /oauth/me (NEEDS AUTH)
```
GET /oauth/me HTTP/1.1
Authorization: Bearer InMBy9w9pXBqznm5LaMIDMfMU7gZYb
Accept: application/json, text/plain, */*
Content-Type: application/json



  ```
##### RESPONSE
```json
{
    "id": 1000,
    "last_login": "2019-09-09T15:15:10.474878Z",
    "is_superuser": true,
    "username": "admin",
    "first_name": "",
    "last_name": "",
    "email": "ad@m.in",
    "is_staff": true,
    "is_active": true,
    "date_joined": "2011-06-09T13:15:27Z",
    "organization": null,
    "profile": null,
    "position": null,
    "voice": null,
    "fax": null,
    "delivery": null,
    "city": null,
    "area": null,
    "zipcode": null,
    "country": null,
    "language": "en",
    "timezone": "",
    "groups": [
        1
    ],
    "user_permissions": []
}
```

# Notifications

### GET (list) /openistorm/notifications/ (NEEDS AUTH)
```
GET /openistorm/notifications/ HTTP/1.1
Host: localhost
Authorization: Bearer 6ud3G1CydyqQWK3FDinexWcfXmEQ55
Accept: application/json, text/plain, */*
Cache-Control: no-cache
Content-Type: application/json
cache-control: no-cache

  ```
##### RESPONSE
```json
[
    {
        "id": 4,
        "title": "Altro?",
        "description": "altro,.",
        "position": "SRID=3857;POINT (1506726.7015573945827782 5412502.5738232750445604)",
        "read": false,
        "user": 1000,
        "favorite": null
    },
    {
        "id": 3,
        "title": "ECCOLO",
        "description": "un'altra incredibile notizia",
        "position": "SRID=3857;POINT (1597228.1430470433551818 5211830.0836553489789367)",
        "read": false,
        "user": 1000,
        "favorite": 8
    },
    {
        "id": 1,
        "title": "AAAAAA",
        "description": "vvvvvv",
        "position": "SRID=3857;POINT (1753771.1769750842358917 5162323.5260628005489707)",
        "read": false,
        "user": 1000,
        "favorite": null
    }
]
```



### DELETE (destroy) /openistorm/favorites/{id}/ (NEEDS AUTH)

```
curl -X DELETE \
  http://iws.inkode.it:4443/openistorm/favorites/14/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer kytmgKOtyapCuIkj997jzc9A2rsXNS' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
```



### PUT (mark as read) /openistorm/favorites/{id}/markasread/ (NEEDS AUTH)

```
PUT /openistorm/notifications/5/markasread/ HTTP/1.1
Host: localhost
Authorization: Bearer IrEx4uSopFJ4CHjAPrjLihMlRjQc2w
Accept: application/json, text/plain, */*
Cache-Control: no-cache
Content-Type: application/json
Accept-Encoding: gzip, deflate
cache-control: no-cache
```
### RESPONSE:

```json
{
    "id": 5,
    "longitude": 5358566.684976625,
    "latitude": 1536078.5204189022,
    "title": "aaaa",
    "description": "aaaaaa",
    "position": "SRID=3857;POINT (1536078.5204189021605998 5358566.6849766252562404)",
    "read": true,
    "user": 1000,
    "favorite": null
}
```

# Favorites

### GET (list) /openistorm/favorites (NEEDS AUTH)
```
curl -X GET http://iws.inkode.it:4443/openistorm/favorites \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
  ```
##### RESPONSE
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "title": "myplace",
            "latitude": 44.52224,
            "longitude": 11.33845,
            "address": "via piero gobetti 101, 40129 Bologna (BO)",
            "position": "SRID=3857;POINT (11.3384499999999999 44.5222399999999965)",
            "user": 1001
        },
        {
            "id": 1,
            "title": "myplace",
            "latitude": 44.52224,
            "longitude": 11.33845,
            "address": "via piero gobetti 101, 40129 Bologna (BO)",
            "position": "SRID=3857;POINT (11.3384499999999999 44.5222399999999965)",
            "user": 1001
        }
    ]
}
```


### GET (geojson) /openistorm/favorites (NEEDS AUTH)
```
curl -X GET http://iws.inkode.it:4443/openistorm/favorites/geojson \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
  ```
##### RESPONSE
```json
{
    "count": 2,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 2,
            "title": "myplace",
            "latitude": 44.52224,
            "longitude": 11.33845,
            "address": "via piero gobetti 101, 40129 Bologna (BO)",
            "position": "SRID=3857;POINT (11.3384499999999999 44.5222399999999965)",
            "user": 1001
        },
        {
            "id": 1,
            "title": "myplace",
            "latitude": 44.52224,
            "longitude": 11.33845,
            "address": "via piero gobetti 101, 40129 Bologna (BO)",
            "position": "SRID=3857;POINT (11.3384499999999999 44.5222399999999965)",
            "user": 1001
        }
    ]
}
```


### POST (store) /openistorm/favorites (NEEDS AUTH)

```
curl -X POST \
  http://iws.inkode.it:4443/openistorm/favorites/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
	"title": "myplace",
	"address": "via piero gobetti 101, 40129 Bologna (BO)",
	"latitude": 44.522240,
	"longitude": 11.338450
}'
```

##### JSON PARAMETERS
```json
{
	"title": "myplace",
	"address": "via piero gobetti 101, 40129 Bologna (BO)",
	"latitude": 44.522240,
	"longitude": 11.338450
}
```


##### RESPONSE
```json
{
    "id": 7,
    "title": "myplace",
    "latitude": 44.52224,
    "longitude": 11.33845,
    "address": "via piero gobetti 101, 40129 Bologna (BO)",
    "user": 1001
}
```



### DELETE (destroy) /openistorm/favorites/{id}/ (NEEDS AUTH)

```
curl -X DELETE \
  http://iws.inkode.it:4443/openistorm/favorites/14/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer kytmgKOtyapCuIkj997jzc9A2rsXNS' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
```


# Layers

### Get list of layers in a period

##### GET /openistorm/layers (AUTH NOT NEEDED)
```
curl -X GET http://iws.inkode.it:4443/openistorm/layers \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
  ```
  

##### GET PARAMETERS
| Parameter | Description                         | Optional | Values                                         | Default                   |
|-----------|-------------------------------------|----------|------------------------------------------------|---------------------------|
| from      | start date or datetime for the list | true     | datetime iso format eg: 2019-08-31T00:00.000Z  | today at 00.00            |
| to        | end date or datetime for the list   | true     | datetime iso format  eg: 2019-07-02T23:59.000Z | (today + 3 days) at 23:59 |

  
##### RESPONSE
```json
{
    "min": "2019-08-30T23:00:00.000Z",
    "max": "2019-08-31T21:00:00.000Z",
    "from": "2019-08-30T23:00:00.000Z",
    "to": "2019-08-31T21:00:00.000Z",
    "current": "2019-08-30T23:00:00.000Z",
    "results": {
        "2019-08-30T23:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567198800,
            "date": "2019-08-30T23:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567198800.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567198800.png"
        },
        "2019-08-31T00:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567202400,
            "date": "2019-08-31T00:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567202400.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567202400.png"
        },
        "2019-08-31T01:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567206000,
            "date": "2019-08-31T01:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567206000.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567206000.png"
        },
        "2019-08-31T19:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567270800,
            "date": "2019-08-31T19:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567270800.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567270800.png"
        },
        "2019-08-31T20:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567274400,
            "date": "2019-08-31T20:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567274400.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567274400.png"
        },
        "2019-08-31T21:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567278000,
            "date": "2019-08-31T21:00:00.000Z",
            "wave_metadata": "http://iws.inkode.it:4443/layerdata/waves_1567278000.json",
            "wave_image": "http://iws.inkode.it:4443/layerdata/waves_1567278000.png"
        }
    }
}
```

### Get min and max dates in layers

##### POST /openistorm/layers/boundaries (AUTH NOT NEEDED)

```
curl -X POST \
  http://iws.inkode.it:4443/openistorm/layers/boundaries/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Content-Type: application/json' \
```

##### RESPONSE
```json
{
    "max": "2019-08-31T21:00:00.000Z",
    "min": "2019-08-29T23:00:00.000Z"
}
```

