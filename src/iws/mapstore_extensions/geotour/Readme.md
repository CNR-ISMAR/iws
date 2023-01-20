#  

Cloniamo la repo in `src/iws`

`cd msext_geotour`

installiamo i pacchetti

`npm install`

Creiamo la directory `static/mapstore/extensions` dove verrà spostata la extension compilata (vedi postCompile.js)

Per compilare l'extension

`npm run compile`

questo crea una directory `GeoTour` in `static/mapstore/extensions` 


# Integrazione dell'extension 

- Creiamo il file `static/mapstore/extensions/index.json`

```
{
    "GeoTour": {
        "bundle": "/GeoTour/index.js",
        "translations": "/GeoTour/translations",
        "assets": "/GeoTour/assets"
    }
}
```

- modifichiamo il file `templates/geonode-mapstore-client/_geonode_config.html` in modo da _pushare_ l'extension nel map_viewer
```
{% extends 'geonode-mapstore-client/_geonode_config.html' %}
{% block override_local_config %}
<script>
    window.__GEONODE_CONFIG__.overrideLocalConfig = function(localConfig, _) {
        // Here the localConfig can be overridden and/or extended
        localConfig.plugins.map_viewer.push({ "name": "GeoTour" });
        return localConfig;
    };
</script>
{% endblock %}
```

# Development environment

Per poter utilizzare i _dev endpoint_ come descritto qui https://training.geonode.geo-solutions.it/GN4/mapstore_client/005_EXTENSION.html#develop-the-extension dobbiamo operare in questo modo

- Modifichiamo il file `static/mapstore/extensions/index.json` per utilizzare i dev endpoint

```
{
    "GeoTour": {
        "bundle": "http://localhost:8082/extension/index.js",
        "translations": "http://localhost:8082/extension/translations",
        "assets": "http://localhost:8082/extension/assets"
    }
}
```
NOTA non commentare altri plugins essendo un json

- modifichiamo `templates/geonode-mapstore-client/_geonode_config.html` escludendo il default path alle extensionFolder per puntare a un path empty

```
{% extends 'geonode-mapstore-client/_geonode_config.html' %}
{% block override_local_config %}
<script>
    window.__GEONODE_CONFIG__.overrideLocalConfig = function(localConfig, _) {
        // Here the localConfig can be overridden and/or extended
        localConfig.extensionsFolder = "";
        localConfig.plugins.map_viewer.push({ "name": "GeoTour" });
        return localConfig;
    };
</script>
{% endblock %}
```

Lanciamo il plugin in development mode
```
src/iws/msext_geotour$ npm start
```