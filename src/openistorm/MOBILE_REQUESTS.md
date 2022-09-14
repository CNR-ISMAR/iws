# User registration
```
curl -X POST http://iws.inkode.it:4443/oauth/register/ \
  -H 'Accept: application/json' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -d '{
      "username": "giorgio",
      "email": "giorgio@inkode.it",
      "password": "ciaociao",
      "confirm_password": "ciaociao",
      "grant_type": "password",
      "client_id": "ohZEFwRrhDK23uUwtMBsxcdiH7rzCOWrm4iB0ksq",
      "client_secret": "bcPqFd9EOhESj3RMMrm9rNUPK3CM9Vk6vuOa3gUeVwj9udv45HGoQTg48lGZOvkd2eB0ftPZBxbfpAr4lO6tcxXyiw91Eehfk2zD0rmeFXvextFPTm6uZnmWFNhFd42u"
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

# Authentication
```
curl -X POST http://iws.inkode.it:4443/oauth/token/ \
  -H 'Accept: application/json' \
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
Accept: application/json
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

# Device registration (after login!)

### POST (create) /openistorm/devices/ (NEEDS AUTH)
```bash
curl -X POST \
  http://localhost/openistorm/devices/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer OiGe9iJmE14eIGL3QfPE4iy1MoUKKw' \
  -H 'Content-Type: application/json' \
  -d '{
    "type": "android",
    "push_key": "1234567891myFCMkey"
}'
```

##### JSON PARAMETERS
```json
{
    "type": "android",
    "push_key": "1234567891myFCMkey"
}
```

| Parameter | Optional                         | Descrition | Example                                         |
|-----------|-------------------------------------|----------|------------------------------------------------|
|type  |   false | device type: ios | android |  [ios, android] |
|push_key  |   false | FCM KEY |  eg: 1234567891myFCMkey |


##### RESPONSE
```json
{
    "type": "android",
    "push_key": "1234567891myFCMkey",
}
```

# User settings

### GET (item) /openistorm/settings/ (NEEDS AUTH)
```bash
curl -X GET \
  http://localhost/openistorm/settings/ \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer OiGe9iJmE14eIGL3QfPE4iy1MoUKKw' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
```

##### RESPONSE
```json
{
    "sl_reference": null,
    "sl_notification_threshold": null,
}
```

### PUT (update) /openistorm/settings/ (NEEDS AUTH)
```bash
curl -X PUT \
  http://localhost/openistorm/settings/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer OiGe9iJmE14eIGL3QfPE4iy1MoUKKw' \
  -H 'Content-Type: application/json' \
  -d '{
        "sl_reference": 20.0,
        "sl_notification_threshold": 50.0
    }'
```

##### JSON PARAMETERS
```json
{
    "sl_reference": 20.0,
    "sl_notification_threshold": 50.0
}
```

| Parameter | Optional                         | Descrition | Example                                         |
|-----------|-------------------------------------|----------|------------------------------------------------|
|sl_reference  |   true | integer Sea level reference (to translate measures) |  can be: 20, 50, 100 |
|sl_notification_threshold  |   true | integer Sea level notification threshold (to notify if forecast is bigger) |  100 |


##### RESPONSE
```json
{
    "sl_reference": 20.0,
    "sl_notification_threshold": 50.0
}
```

# Notifications

### GET (list) /openistorm/notifications/ (NEEDS AUTH)
```
GET /openistorm/notifications/ HTTP/1.1
Host: localhost
Authorization: Bearer 6ud3G1CydyqQWK3FDinexWcfXmEQ55
Accept: application/json
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



### DELETE (destroy) /openistorm/notifications/{id}/ (NEEDS AUTH)

```
curl -X DELETE \
  http://iws.inkode.it:4443/openistorm/notifications/14/ \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer kytmgKOtyapCuIkj997jzc9A2rsXNS' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
```



### PUT (mark as read) /openistorm/notifications/{id}/markasread/ (NEEDS AUTH)

```
PUT /openistorm/notifications/5/notifications/ HTTP/1.1
Host: localhost
Authorization: Bearer IrEx4uSopFJ4CHjAPrjLihMlRjQc2w
Accept: application/json
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
  -H 'Accept: application/json' \
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


### GET (geojson) /openistorm/favorites/geojson (NEEDS AUTH)
```
curl -X GET http://iws.inkode.it:4443/openistorm/favorites/geojson \
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
  ```
##### RESPONSE
```json
{
    "crs": {
        "type": "name",
        "properties": {
            "name": "EPSG:4326"
        }
    },
    "type": "FeatureCollection",
    "features": [
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    0.000101855029332,
                    0.000399950086745
                ]
            },
            "type": "Feature",
            "properties": {
                "title": "myplace",
                "address": "via piero gobetti 101, 40129 Bologna (BO)"
            }
        }
    ]
}
```


### POST (store) /openistorm/favorites (NEEDS AUTH)

```
curl -X POST \
  http://iws.inkode.it:4443/openistorm/favorites/ \
  -H 'Accept: application/json' \
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
  -H 'Accept: application/json' \
  -H 'Authorization: Bearer kytmgKOtyapCuIkj997jzc9A2rsXNS' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
```


# Layers query

### Get point parameters on a single moment (aka GetFeatureInfo)

##### GET /openistorm/layers/info/ (AUTH NOT NEEDED)
```
curl -X GET \
  'http://localhost/openistorm/layers/info/?bbox=18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865&x=1&y=1&time=2019-09-16T00:00:00.000Z&width=2&height=2&station=SL02' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
  ```
  
##### GET PARAMETERS
| Parameter | Optional                         | Descrition | Example                                         |
|-----------|-------------------------------------|----------|------------------------------------------------|
|bbox  |   false | north,west,south,est |  18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865  |
|x  |   false | 1 |  1  |
|y  |   false | 1 |  1  |
|time  |   false | datetime iso format  eg: 2019-07-02T23:59.000Z |  2019-09-16T00:00:00.000Z  |
|width  |   false | 2 |  2  |
|height  |   false | 2 |  2  |
|station  |   true | the station id (if clicked on) |  SL02  |
 
##### RESPONSE
```json
{
    "latitude": 40.60532227935265,
    "results": {
        "wsh": {
            "std": 1.0332842,
            "mean": 3.1656795
        },
        "wmp": {
            "std": 2.6368585,
            "mean": 5.637971
        },
        "sea_level": {
            "std": 0.08736138,
            "mean": -0.4610096
        },
        "wmd": {
            "std": 16.86169,
            "mean": 152.14888
        }
    },
    "longitude": 18.566036549314436,
    "time": "2019-09-16T00:00:00.000Z"
}
```
    

# Layers query

### Geojson stations (sea_level & waves)

##### GET /openistorm/stations/ (AUTH NOT NEEDED)
```
curl -X GET \
  'http://localhost/openistorm/stations/?type=sea_level' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  ```
  
##### GET PARAMETERS
| Parameter | Values       |
|-----------|--------------|
|type | [sea_level, waves] |
 
##### RESPONSE
```json
{
    "type": "FeatureCollection",
    "features": [
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.2,
                    43.75
                ]
            },
            "type": "Feature",
            "properties": {
                "nothing1": 32,
                "institute_code": "PP2",
                "parameters": [
                    "sea_surface_height",
                    "wind_direction",
                    "wind_speed",
                    "sea_surface_pressure",
                    "air_temperature",
                    "relative_humidity",
                    "sea_water_temperature",
                    "sea_water_salinity"
                ],
                "nothing2": " Aigio",
                "institute": "ISMAR",
                "name": "",
                "map_name": "AN-SNG",
                "the_geom": "POINT (13.2 43.75)",
                "id": null,
                "field_1": "SL_15"
            }
        },
        {
            "geometry": {
                "type": "Point",
                "coordinates": [
                    13.51,
                    43.62
                ]
            },
            "type": "Feature",
            "properties": {
                "nothing1": null,
                "institute_code": "ISPRA",
                "parameters": [
                    "sea_surface_height",
                    "sea_water_temperature",
                    "air_temperature",
                    "wind_speed",
                    "wind_direction"
                ],
                "nothing2": "",
                "institute": "ISPRA",
                "name": " Ancona",
                "map_name": "Ancona",
                "the_geom": "POINT (13.51 43.62)",
                "id": 21,
                "field_1": "SL_49"
            }
        }
    ]
}
```

### get next SEA LEVEL minimum & maximum

##### GET /openistorm/layers/sea_level_min_max/ (AUTH NOT NEEDED)
```
curl -X GET \
  'http://localhost/openistorm/layers/sea_level_min_max/?bbox=18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865&x=1&y=1&time=2019-09-16T00:00:00.000Z&width=2&height=2' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
  ```
  
##### GET PARAMETERS
| Parameter | Optional                         | Descrition | Example                                         |
|-----------|-------------------------------------|----------|------------------------------------------------|
|bbox  |   false | north,west,south,est |  18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865  |
|x  |   false | 1 |  1  |
|y  |   false | 1 |  1  |
|time  |   false | datetime iso format  eg: 2019-07-02T23:59.000Z |  2019-09-16T00:00:00.000Z  |
|width  |   false | 2 |  2  |
|height  |   false | 2 |  2  |
 
##### RESPONSE
```json
{
    "max": {
        "value": -0.22010869,
        "time": "2019-09-16T05:00:00.000Z"
    },
    "min": {
        "value": -0.39257224,
        "time": "2019-09-16T12:00:00.000Z"
    }
}
```
    

### Get point timeseries in a time period (from.. to..)

##### GET /openistorm/layers/timeseries/ (AUTH NOT NEEDED)
```
curl -X GET \
  'http://localhost/openistorm/layers/timeseries/?bbox=18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865&x=1&y=1&from=2019-09-16T00:00:00.000Z&width=2&height=2&to=2019-09-16T23:00:00.000Z&station=SL02' \
  -H 'Accept: application/json' \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache'
  ```
  
##### GET PARAMETERS
| Parameter | Optional                         | Descrition | Example                                         |
|-----------|-------------------------------------|----------|------------------------------------------------|
|bbox  |   false | north,west,south,est |  18.562486834444055,40.60442396407557,18.56721978760456,40.608017225183865  |
|x  |   false | 1 |  1  |
|y  |   false | 1 |  1  |
|from  |   false | datetime iso format  eg: 2019-07-02T23:59.000Z |  2019-09-16T00:00:00.000Z  |
|to  |   false | datetime iso format  eg: 2019-07-02T23:59.000Z |  2019-09-16T23:00:00.000Z  |
|width  |   false | 2 |  2  |
|height  |   false | 2 |  2  |
|station  |   true | the station id (if clicked on) |  SL02  |
 
##### RESPONSE
```json
{
  "sea_level-mean": [
    {
      "y": -0.4610096,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": -0.41884536,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": -0.36439973,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": -0.31998542,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wmd-mean": [
    {
      "y": 152.14888,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 152.06793,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 151.9691,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 151.7926,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wmp-mean": [
    {
      "y": 5.637971,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 5.8108377,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 5.928382,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 6.0165963,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "sea_level-std": [
    {
      "y": 0.08736138,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 0.08436876,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 0.07268434,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 0.06769079,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wmp-std": [
    {
      "y": 2.6368585,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 2.5191052,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 2.4427688,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 2.394145,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wmd-std": [
    {
      "y": 16.86169,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 16.747337,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 16.309095,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 15.555597,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wsh-mean": [
    {
      "y": 3.1656795,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 3.2859263,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 3.3842921,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 3.4502816,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "wsh-std": [
    {
      "y": 1.0332842,
      "x": "2019-09-16T00:00:00.000Z"
    },
    {
      "y": 0.86383164,
      "x": "2019-09-16T01:00:00.000Z"
    },
    {
      "y": 0.7510895,
      "x": "2019-09-16T02:00:00.000Z"
    },
    {
      "y": 0.63364094,
      "x": "2019-09-16T03:00:00.000Z"
    }
  ],
  "latitude": 40.60532227935265,
  "longitude": 18.566036549314436
}
```