const style = {
  "version": 8,
  "name": "Dark IWS",
  "metadata": {
    "openmaptiles:version": "3.x"
  },
  "sources": {
    "openmaptiles": {
      "type": "vector",
      "url": "https://nose-cnr-backend.arpa.sicilia.it/data/v3.json"
    }
  },
  "sprite": "https://nose-cnr-backend.arpa.sicilia.it/styles/dark-nose/sprite",
  "glyphs": "https://nose-cnr-backend.arpa.sicilia.it/fonts/{fontstack}/{range}.pbf",
  "layers": [
    {
      "id": "background",
      "type": "background",
      "paint": {
        "background-color": "rgba(50, 50, 50, 0.2)"
      }
    },
    {
      "id": "water",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "water",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "!=",
          "brunnel",
          "tunnel"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-antialias": false,
        "fill-color": "rgba(127, 127, 127, 0)"
      }
    },
    {
      "id": "landcover_ice_shelf",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "subclass",
          "ice_shelf"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(12,12,12)",
        "fill-opacity": 0.7
      }
    },
    {
      "id": "landcover_glacier",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "subclass",
          "glacier"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "hsl(0, 1%, 2%)",
        "fill-opacity": {
          "base": 1,
          "stops": [
            [
              0,
              1
            ],
            [
              8,
              0.5
            ]
          ]
        }
      }
    },
    {
      "id": "landuse_residential",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "maxzoom": 9,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "residential"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(52, 50, 50)",
        "fill-opacity": 0.4
      }
    },
    {
      "id": "landcover_wood",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landcover",
      "minzoom": 10,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "wood"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(61, 92, 64)",
        "fill-opacity": {
          "base": 0.3,
          "stops": [
            [
              8,
              0
            ],
            [
              10,
              0.8
            ],
            [
              13,
              0.4
            ]
          ]
        },
        "fill-pattern": "wood-pattern",
        "fill-translate": [
          0,
          0
        ]
      }
    },
    {
      "id": "landuse_park",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "landuse",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "park"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(61, 92, 64)"
      }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "openmaptiles",
      "source-layer": "waterway",
      "filter": [
        "==",
        "$type",
        "LineString"
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(127, 127, 127)"
      }
    },
    {
      "id": "water_name",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 500,
        "text-field": "{name:latin} {name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Italic"
        ],
        "text-rotation-alignment": "map",
        "text-size": 12
      },
      "paint": {
        "text-color": "rgba(99, 99, 99, 0.7)",
        "text-halo-color": "rgb(168, 168, 168)"
      }
    },
    {
      "id": "water_name-it",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "water_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 500,
        "text-field": "{name:it} {name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Italic"
        ],
        "text-rotation-alignment": "map",
        "text-size": 12
      },
      "paint": {
        "text-color": "rgba(99, 99, 99, 0.7)",
        "text-halo-color": "rgb(168, 168, 168)"
      }
    },
    {
      "id": "building",
      "type": "fill",
      "source": "openmaptiles",
      "source-layer": "building",
      "minzoom": 12,
      "filter": [
        "==",
        "$type",
        "Polygon"
      ],
      "paint": {
        "fill-antialias": true,
        "fill-color": "rgb(48, 48, 48)",
        "fill-outline-color": "rgb(68, 64, 64)"
      }
    },
    {
      "id": "aeroway-taxiway",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 12,
      "filter": [
        "all",
        [
          "in",
          "class",
          "taxiway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(106, 106, 106)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "aeroway-runway-casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(142, 142, 142, 0.8)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              5
            ],
            [
              17,
              55
            ]
          ]
        }
      }
    },
    {
      "id": "aeroway-area",
      "type": "fill",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 4,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "in",
          "class",
          "runway",
          "taxiway"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-color": "rgb(38, 38, 38)",
        "fill-opacity": 1
      }
    },
    {
      "id": "aeroway-runway",
      "type": "line",
      "metadata": {
        "mapbox:group": "1444849345966.4436"
      },
      "source": "openmaptiles",
      "source-layer": "aeroway",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "in",
          "class",
          "runway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(82, 82, 82)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.5,
          "stops": [
            [
              11,
              4
            ],
            [
              17,
              50
            ]
          ]
        }
      }
    },
    {
      "id": "road_area_pier",
      "type": "fill",
      "metadata": {},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Polygon"
        ],
        [
          "==",
          "class",
          "pier"
        ]
      ],
      "layout": {
        "visibility": "visible"
      },
      "paint": {
        "fill-antialias": true,
        "fill-color": "rgb(50, 50, 50)"
      }
    },
    {
      "id": "road_pier",
      "type": "line",
      "metadata": {},
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "pier"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-color": "rgb(12,12,12)",
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              15,
              1
            ],
            [
              17,
              4
            ]
          ]
        }
      }
    },
    {
      "id": "highway_path",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "path"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(114, 106, 106)",
        "line-dasharray": [
          1.5,
          1.5
        ],
        "line-opacity": 0.9,
        "line-width": {
          "base": 1.2,
          "stops": [
            [
              13,
              1
            ],
            [
              20,
              10
            ]
          ]
        }
      }
    },
    {
      "id": "highway_minor",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "minor",
          "service",
          "track"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(106, 106, 106)",
        "line-opacity": 0.9,
        "line-width": {
          "base": 1.55,
          "stops": [
            [
              13,
              1.8
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(142, 142, 142, 0.8)",
        "line-dasharray": [
          12,
          0
        ],
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              10,
              3
            ],
            [
              20,
              23
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(100, 100, 100)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              10,
              2
            ],
            [
              20,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "highway_major_subtle",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "maxzoom": 11,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "in",
          "class",
          "primary",
          "secondary",
          "tertiary",
          "trunk"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(124, 124, 124)",
        "line-width": {
          "stops": [
            [
              6,
              0
            ],
            [
              8,
              2
            ]
          ]
        }
      }
    },
    {
      "id": "highway_motorway_casing",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "butt",
        "line-join": "miter",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgba(142, 142, 142, 0.8)",
        "line-dasharray": [
          2,
          0
        ],
        "line-opacity": 1,
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              5.8,
              0
            ],
            [
              6,
              3
            ],
            [
              20,
              40
            ]
          ]
        }
      }
    },
    {
      "id": "highway_motorway_inner",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": {
          "stops": [
            [
              5.8,
              "rgba(255, 255, 255, 0.53)"
            ],
            [
              6,
              "rgb(82, 82, 82)"
            ]
          ]
        },
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ],
            [
              20,
              30
            ]
          ]
        }
      }
    },
    {
      "id": "road_oneway",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "oneway",
          1
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 200,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": 0,
        "icon-size": {
          "stops": [
            [
              15,
              0.5
            ],
            [
              19,
              1
            ]
          ]
        }
      },
      "paint": {
        "icon-opacity": 0.5
      }
    },
    {
      "id": "road_oneway_opposite",
      "type": "symbol",
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "oneway",
          -1
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "icon-image": "oneway",
        "symbol-spacing": 200,
        "icon-padding": 2,
        "icon-rotation-alignment": "map",
        "icon-rotate": 180,
        "icon-size": {
          "stops": [
            [
              15,
              0.5
            ],
            [
              19,
              1
            ]
          ]
        }
      },
      "paint": {
        "icon-opacity": 0.5
      }
    },
    {
      "id": "highway_motorway_subtle",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "maxzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(106, 106, 106)",
        "line-width": {
          "base": 1.4,
          "stops": [
            [
              4,
              2
            ],
            [
              6,
              1.3
            ]
          ]
        }
      }
    },
    {
      "id": "railway_transit",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(117, 117, 117)",
        "line-width": 3
      }
    },
    {
      "id": "railway_transit_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "transit"
          ],
          [
            "!in",
            "brunnel",
            "tunnel"
          ]
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(94, 94, 94)",
        "line-dasharray": [
          3,
          3
        ],
        "line-width": 2
      }
    },
    {
      "id": "railway_minor",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(117, 117, 117)",
        "line-width": 3
      }
    },
    {
      "id": "railway_minor_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 16,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "all",
          [
            "==",
            "class",
            "rail"
          ],
          [
            "has",
            "service"
          ]
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(94, 94, 94)",
        "line-dasharray": [
          3,
          3
        ],
        "line-width": 2
      }
    },
    {
      "id": "railway",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "rail"
        ],
        [
          "!has",
          "service"
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(117, 117, 117)",
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              16,
              3
            ],
            [
              20,
              7
            ]
          ]
        }
      }
    },
    {
      "id": "railway_dashline",
      "type": "line",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation",
      "minzoom": 13,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "rail"
        ],
        [
          "!has",
          "service"
        ]
      ],
      "layout": {
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-color": "rgb(94, 94, 94)",
        "line-dasharray": [
          3,
          3
        ],
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              16,
              2
            ],
            [
              20,
              6
            ]
          ]
        }
      }
    },
    {
      "id": "highway_name_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "!=",
          "class",
          "motorway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": "{name:latin} {name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-max-angle": 30,
        "text-pitch-alignment": "viewport",
        "text-rotation-alignment": "map",
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(162, 160, 160)",
        "text-halo-blur": 0,
        "text-halo-color": "rgb(82, 82, 82)",
        "text-halo-width": 1,
        "text-translate": [
          0,
          0
        ]
      }
    },
    {
      "id": "highway_name_other-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "!=",
          "class",
          "motorway"
        ],
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": "{name:it} {name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-max-angle": 30,
        "text-pitch-alignment": "viewport",
        "text-rotation-alignment": "map",
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(162, 160, 160)",
        "text-halo-blur": 0,
        "text-halo-color": "rgb(82, 82, 82)",
        "text-halo-width": 1,
        "text-translate": [
          0,
          0
        ]
      }
    },
    {
      "id": "highway_name_motorway",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "b6371a3f2f5a9932464fa3867530a2e5"
      },
      "source": "openmaptiles",
      "source-layer": "transportation_name",
      "filter": [
        "all",
        [
          "==",
          "$type",
          "LineString"
        ],
        [
          "==",
          "class",
          "motorway"
        ]
      ],
      "layout": {
        "symbol-placement": "line",
        "symbol-spacing": 350,
        "text-field": "{ref}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-pitch-alignment": "viewport",
        "text-rotation-alignment": "viewport",
        "text-size": 10,
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(176, 176, 176)",
        "text-translate": [
          0,
          2
        ]
      }
    },
    {
      "id": "boundary_state",
      "type": "line",
      "metadata": {
        "mapbox:group": "a14c9607bc7954ba1df7205bf660433f"
      },
      "source": "openmaptiles",
      "source-layer": "boundary",
      "filter": [
        "==",
        "admin_level",
        4
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round",
        "visibility": "visible"
      },
      "paint": {
        "line-blur": 0.4,
        "line-color": "hsl(0, 0%, 21%)",
        "line-dasharray": [
          2,
          2
        ],
        "line-opacity": 1,
        "line-width": {
          "base": 1.3,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              15
            ]
          ]
        }
      }
    },
    {
      "id": "boundary_country_z0-4",
      "type": "line",
      "metadata": {
        "mapbox:group": "a14c9607bc7954ba1df7205bf660433f"
      },
      "source": "openmaptiles",
      "source-layer": "boundary",
      "maxzoom": 5,
      "filter": [
        "all",
        [
          "==",
          "admin_level",
          2
        ],
        [
          "!has",
          "claimed_by"
        ]
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-blur": {
          "base": 1,
          "stops": [
            [
              0,
              0.4
            ],
            [
              22,
              4
            ]
          ]
        },
        "line-color": "hsl(0, 0%, 23%)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.1,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "boundary_country_z5-",
      "type": "line",
      "metadata": {
        "mapbox:group": "a14c9607bc7954ba1df7205bf660433f"
      },
      "source": "openmaptiles",
      "source-layer": "boundary",
      "minzoom": 5,
      "filter": [
        "==",
        "admin_level",
        2
      ],
      "layout": {
        "line-cap": "round",
        "line-join": "round"
      },
      "paint": {
        "line-blur": {
          "base": 1,
          "stops": [
            [
              0,
              0.4
            ],
            [
              22,
              4
            ]
          ]
        },
        "line-color": "hsl(0, 0%, 23%)",
        "line-opacity": 1,
        "line-width": {
          "base": 1.1,
          "stops": [
            [
              3,
              1
            ],
            [
              22,
              20
            ]
          ]
        }
      }
    },
    {
      "id": "place_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "class",
          "hamlet",
          "isolated_dwelling",
          "neighbourhood"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "text-offset": [
          0.5,
          0
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_other-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "in",
          "class",
          "hamlet",
          "isolated_dwelling",
          "neighbourhood"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "text-offset": [
          0.5,
          0
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_suburb",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "suburb"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "text-offset": [
          0.5,
          0
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_suburb-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "suburb"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "center",
        "text-offset": [
          0.5,
          0
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_village",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "village"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-size": 0.4,
        "text-anchor": "left",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_village-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "village"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-size": 0.4,
        "text-anchor": "left",
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_town",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "town"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_town-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 15,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "town"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_city",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "city"
        ],
        [
          ">",
          "rank",
          3
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_city-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 14,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "city"
        ],
        [
          ">",
          "rank",
          3
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_city_large",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          3
        ],
        [
          "==",
          "class",
          "city"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 14,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_city_large-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          3
        ],
        [
          "==",
          "class",
          "city"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "icon-image": {
          "base": 1,
          "stops": [
            [
              0,
              "circle-11"
            ],
            [
              9,
              ""
            ]
          ]
        },
        "icon-size": 0.4,
        "text-anchor": {
          "base": 1,
          "stops": [
            [
              0,
              "left"
            ],
            [
              8,
              "center"
            ]
          ]
        },
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-justify": "left",
        "text-offset": [
          0.5,
          0.2
        ],
        "text-size": 14,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "icon-opacity": 0.7,
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_state",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "state"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_state-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 12,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "state"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": 10,
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-blur": 1,
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1
      }
    },
    {
      "id": "place_country_other",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "!has",
          "iso_a2"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Italic"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              9
            ],
            [
              1,
              11
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    },
    {
      "id": "place_country_other-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "!has",
          "iso_a2"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Italic"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              9
            ],
            [
              1,
              11
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    },
    {
      "id": "place_country_minor",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          ">=",
          "rank",
          2
        ],
        [
          "has",
          "iso_a2"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              10
            ],
            [
              6,
              12
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    },
    {
      "id": "place_country_minor-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 8,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          ">=",
          "rank",
          2
        ],
        [
          "has",
          "iso_a2"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1,
          "stops": [
            [
              0,
              10
            ],
            [
              6,
              12
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    },
    {
      "id": "place_country_major",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          1
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "has",
          "iso_a2"
        ],
        [
          "!has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:latin}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.4,
          "stops": [
            [
              0,
              10
            ],
            [
              3,
              12
            ],
            [
              4,
              14
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    },
    {
      "id": "place_country_major-it",
      "type": "symbol",
      "metadata": {
        "mapbox:group": "101da9f13b64a08fa4b6ac1168e89e5f"
      },
      "source": "openmaptiles",
      "source-layer": "place",
      "maxzoom": 6,
      "filter": [
        "all",
        [
          "==",
          "$type",
          "Point"
        ],
        [
          "<=",
          "rank",
          1
        ],
        [
          "==",
          "class",
          "country"
        ],
        [
          "has",
          "iso_a2"
        ],
        [
          "has",
          "name:it"
        ]
      ],
      "layout": {
        "text-anchor": "center",
        "text-field": "{name:it}\n{name:nonlatin}",
        "text-font": [
          "Open Sans Semibold",
          "Noto Sans Regular"
        ],
        "text-size": {
          "base": 1.4,
          "stops": [
            [
              0,
              10
            ],
            [
              3,
              12
            ],
            [
              4,
              14
            ]
          ]
        },
        "text-transform": "uppercase",
        "visibility": "visible"
      },
      "paint": {
        "text-color": "rgb(255, 255, 255)",
        "text-halo-color": "rgba(154, 154, 154, 0.7)",
        "text-halo-width": 1.4
      }
    }
  ],
  "id": "cover",
  "center": [
    15.216170534637513,
    36.976308027508
  ],
  "zoom": 13.523205336848397
};


export default style;
