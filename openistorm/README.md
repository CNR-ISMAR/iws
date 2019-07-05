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
# Favorites

## GET list /favorites
```
curl -X GET http://localhost/favorites/geojson \
  -H 'Accept: application/json, text/plain, */*' \
  -H 'Authorization: Bearer 65Inl6eWbYCSxFocZp69Y7Aj8aX3PC' \
  -H 'Cache-Control: no-cache' \
  -H 'Content-Type: application/json'
  ```
### RESPONSE
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


## POST store /favorites

```
curl -X POST \
  http://localhost/favorites/ \
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

### JSON PARAMETERS
```json
{
	"title": "myplace",
	"address": "via piero gobetti 101, 40129 Bologna (BO)",
	"latitude": 44.522240,
	"longitude": 11.338450
}
```


### RESPONSE
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

