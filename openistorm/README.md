# Authentication
```
curl -X POST http://localhost/oauth/token/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H 'Postman-Token: 34229228-4336-475a-a464-67b03a7a19cf' \
  -d 'client_id=X5g8j8qS5jVLXIgOFXihNGHPRi3H07wnDQxzlYiV&client_secret=257rHXNorBAWKI173vgVVqRcNpDElElwLYyBt5h5Jsx2wB5YAkD3TtRJP75TjHDpxoDNp8QZswCSxyQ3M7poMqz2ag5h5VpsLOKWM2GBYaoQN97n9bqNzLNz8TLzTW8Y&grant_type=password&password=giorgio&username=giorgio'
  ```
### PARAMETERS
| Parameter | Value |
|------|-------|
|client_id|X5g8j8qS5jVLXIgOFXihNGHPRi3H07wnDQxzlYiV|
|client_secret|257rHXNorBAWKI173vgVVqRcNpDElElwLYyBt5h5Jsx2wB5YAkD3TtRJP75TjHDpxoDNp8QZswCSxyQ3M7poMqz2ag5h5VpsLOKWM2GBYaoQN97n9bqNzLNz8TLzTW8Y|
|grant_type|password|
|password|giorgio|
|username|giorgio|

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


## Favorites

### GET (list) /openistorm/favorites (NEEDS AUTH)
```
curl -X GET http://localhost/openistorm/favorites/geojson \
  -H 'Accept: application/json, text/plain, */*' \
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
        },
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
        },
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
  http://localhost/openistorm/favorites/ \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: bc38088e-cab6-41d9-9047-7b5a39993a50' \
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


## Layers

### Get list of layers in a period

##### GET /openistorm/layers (AUTH NOT NEEDED)
```
curl -X GET http://localhost/openistorm/layers \
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
    "from": "2019-08-30T23:00:00.000Z",
    "min": "2019-08-30T23:00:00.000Z",
    "max": "2019-08-31T21:00:00.000Z",
    "results": {
        "2019-08-30T23:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567198800,
            "date": "2019-08-30T23:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567198800.json",
            "wave_image": "http://localhost/layerdata/waves_1567198800.png"
        },
        "2019-08-31T00:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567202400,
            "date": "2019-08-31T00:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567202400.json",
            "wave_image": "http://localhost/layerdata/waves_1567202400.png"
        },
        "2019-08-31T01:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567206000,
            "date": "2019-08-31T01:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567206000.json",
            "wave_image": "http://localhost/layerdata/waves_1567206000.png"
        },
        "2019-08-31T02:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567209600,
            "date": "2019-08-31T02:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567209600.json",
            "wave_image": "http://localhost/layerdata/waves_1567209600.png"
        },
        "2019-08-31T03:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567213200,
            "date": "2019-08-31T03:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567213200.json",
            "wave_image": "http://localhost/layerdata/waves_1567213200.png"
        },
        "2019-08-31T04:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567216800,
            "date": "2019-08-31T04:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567216800.json",
            "wave_image": "http://localhost/layerdata/waves_1567216800.png"
        },
        "2019-08-31T05:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567220400,
            "date": "2019-08-31T05:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567220400.json",
            "wave_image": "http://localhost/layerdata/waves_1567220400.png"
        },
        "2019-08-31T06:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567224000,
            "date": "2019-08-31T06:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567224000.json",
            "wave_image": "http://localhost/layerdata/waves_1567224000.png"
        },
        "2019-08-31T07:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567227600,
            "date": "2019-08-31T07:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567227600.json",
            "wave_image": "http://localhost/layerdata/waves_1567227600.png"
        },
        "2019-08-31T08:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567231200,
            "date": "2019-08-31T08:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567231200.json",
            "wave_image": "http://localhost/layerdata/waves_1567231200.png"
        },
        "2019-08-31T09:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567234800,
            "date": "2019-08-31T09:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567234800.json",
            "wave_image": "http://localhost/layerdata/waves_1567234800.png"
        },
        "2019-08-31T10:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567238400,
            "date": "2019-08-31T10:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567238400.json",
            "wave_image": "http://localhost/layerdata/waves_1567238400.png"
        },
        "2019-08-31T11:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567242000,
            "date": "2019-08-31T11:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567242000.json",
            "wave_image": "http://localhost/layerdata/waves_1567242000.png"
        },
        "2019-08-31T12:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567245600,
            "date": "2019-08-31T12:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567245600.json",
            "wave_image": "http://localhost/layerdata/waves_1567245600.png"
        },
        "2019-08-31T13:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567249200,
            "date": "2019-08-31T13:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567249200.json",
            "wave_image": "http://localhost/layerdata/waves_1567249200.png"
        },
        "2019-08-31T14:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567252800,
            "date": "2019-08-31T14:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567252800.json",
            "wave_image": "http://localhost/layerdata/waves_1567252800.png"
        },
        "2019-08-31T15:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567256400,
            "date": "2019-08-31T15:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567256400.json",
            "wave_image": "http://localhost/layerdata/waves_1567256400.png"
        },
        "2019-08-31T16:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567260000,
            "date": "2019-08-31T16:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567260000.json",
            "wave_image": "http://localhost/layerdata/waves_1567260000.png"
        },
        "2019-08-31T17:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567263600,
            "date": "2019-08-31T17:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567263600.json",
            "wave_image": "http://localhost/layerdata/waves_1567263600.png"
        },
        "2019-08-31T18:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567267200,
            "date": "2019-08-31T18:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567267200.json",
            "wave_image": "http://localhost/layerdata/waves_1567267200.png"
        },
        "2019-08-31T19:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567270800,
            "date": "2019-08-31T19:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567270800.json",
            "wave_image": "http://localhost/layerdata/waves_1567270800.png"
        },
        "2019-08-31T20:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567274400,
            "date": "2019-08-31T20:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567274400.json",
            "wave_image": "http://localhost/layerdata/waves_1567274400.png"
        },
        "2019-08-31T21:00:00.000Z": {
            "dataset": "waves",
            "timestamp": 1567278000,
            "date": "2019-08-31T21:00:00.000Z",
            "wave_metadata": "http://localhost/layerdata/waves_1567278000.json",
            "wave_image": "http://localhost/layerdata/waves_1567278000.png"
        }
    },
    "current": "2019-08-30T23:00:00.000Z",
    "to": "2019-08-31T21:00:00.000Z"
}
```

### Get min and max dates in layers

##### POST /openistorm/layers/boundaries (AUTH NOT NEEDED)

```
curl -X POST \
  http://localhost/openistorm/layers/boundaries/ \
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

