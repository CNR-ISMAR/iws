
var proxy = require('express-http-proxy');
var app = require('express')();
const { XMLParser, XMLBuilder } = require("fast-xml-parser");
const format = require('date-fns/format');
const querystring = require('node:querystring');
const process = require('process');


const ENV = {
  targetUrl: process.env.TARGET_URL || 'https://iws.ismar.cnr.it',
  currentDomain: process.env.CURRENT_DOMAIN || 'http://tds.proxy:5555',
  port: parseInt(process.env.PORT || '5555'),
}


const options = {
  ignoreAttributes: false,
}
const parser = new XMLParser(options);
const builder = new XMLBuilder(options);
const XML_PREFIX = '<?xml version="1.0" encoding="UTF-8"?>'
const DESCRIBE_DOMAIN_BASE = {
  Domains: {
    '@_xmlns': 'http://demo.geo-solutions.it/share/wmts-multidim/wmts_multi_dimensional.xsd',
    '@_xmlns:ows': 'http://www.opengis.net/ows/1.1',
    '@_version': '1.2',
    SpaceDomain: {
      BoundingBox: {
        '@_CRS': null,
        '@_minx': null,
        '@_miny': null,
        '@_maxx': null,
        '@_maxy': null,
      }
    },
    DimensionDomain: {
      'ows:Identifier': 'time',
      'Domain': null,
      'size': null
    }
  }
}

const GET_DOMAIN_VALUES_BASE = {
  DomainValues: {
    '@_xmlns': 'http://demo.geo-solutions.it/share/wmts-multidim/wmts_multi_dimensional.xsd',
    '@_xmlns:ows': 'http://www.opengis.net/ows/1.1',
    'ows:Identifier': 'time',
    Domain: null,
    Size: null,
    Limit: null,
    Sort: null
  }
}

const HISTOGRAM_BASE = {
  Histogram: {
    '@_xmlns': 'http://demo.geo-solutions.it/share/wmts-multidim/wmts_multi_dimensional.xsd',
    '@_xmlns:ows': 'http://www.opengis.net/ows/1.1',
    'ows:Identifier': 'time',
    Domain: null,
    Values: null,
  }
}

const OVERRIDE_LATEST = [
  [/TMES_sea_level_(\d{8})\.nc/g, 'TMES_sea_level_latest.nc'],
  [/TMES_waves_(\d{8})\.nc/g, 'TMES_waves_latest.nc'],
]

function replaceLatest(asked, res) {
  res.pathname = asked.pathname.replaceAll('latest', format(new Date(), 'yyyyMMdd'))
}

function replaceLatestWMTS(asked, res) {
  res.pathname = asked.pathname.replaceAll('latest', format(new Date(), 'yyyyMMdd'))
  res.pathname = res.pathname.replaceAll('/geoserver/gwc/service/wmts', '')
}

const REWRITE_PATHS = {
  '/thredds/wms/tmes/TMES_sea_level_latest.nc': replaceLatest,
  '/thredds/wms/tmes/TMES_sea_level_latest.nc/geoserver/gwc/service/wmts': replaceLatestWMTS,

  '/thredds/wms/tmes/TMES_waves_latest.nc': replaceLatest,
  '/thredds/wms/tmes/TMES_waves_latest.nc/geoserver/gwc/service/wmts': replaceLatestWMTS,
}

function sget(obj, attr) {
  if (obj[attr.toLowerCase()]) {
    return obj[attr.toLowerCase()]
  } else {
    return obj[attr.toUpperCase()]
  }
}


const LAYER_STYLES = {
  'sea_level-mean': {
    STYLES: 'boxfill/alg2',
    colorscalerange: '-0.8,0.8',
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    numcolorbands: 100,
  },
  'sea_level-std': {
    STYLES: 'boxfill/redblue',
    colorscalerange: '-0.4,0.4',
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
  },
  'wsh-mean': {
    STYLES: 'boxfill/occam',
    colorscalerange: '0,8',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },
  'wmp-mean': {
    STYLES: 'boxfill/alg',
    colorscalerange: '0,10',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },
  'wmd-mean': {
    STYLES: 'prettyvec/greyscale',
    colorscalerange: '0,360',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },

  'wmp-std': {
    STYLES: 'boxfill/alg',
    colorscalerange: '-5,5',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },
  'wsh-std': {
    STYLES: 'boxfill/occam',
    colorscalerange: '-2,2',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },
  'wmd-std': {
    STYLES: '',
    colorscalerange: '-10,10',
    markerscale: 15,
    markerspacing: 12,
    abovemaxcolor: 'extend',
    belowmincolor: 'extend',
    markerclipping: true,
  },
}

const LAYER_PALETTE = {
  'sea_level-mean': {
    palette: 'alg2',
    colorbaronly: true,
  },
  'sea_level-std': {
    palette: 'redblue',
    colorbaronly: true,
  },
  'wsh-mean': {
    palette: 'occam',
    colorbaronly: true,
  },
  'wmp-mean': {
    colorbaronly: true,
    palette: 'alg',
  },
  'wmd-mean': {
    palette: 'rainbow',
    colorbaronly: true,
  },

  'wmp-std': {
    palette: 'alg',
    colorbaronly: true,
  },
  'wsh-std': {
    palette: 'occam',
    colorbaronly: true,
  },
  'wmd-std': {
    palette: 'rainbow',
    colorbaronly: true,
  },
}

function manageQS(qs) {
  let res = {}
  if (sget(qs, 'REQUEST') === 'GetMap') {
    const extra = LAYER_STYLES[sget(qs, 'layers')] ? LAYER_STYLES[sget(qs, 'layers')] : {}
    res = {
      ...qs,
      ...extra,
      uppercase: false,
    }

    if (sget(qs, 'time')) {
      qs.TIME = sget(qs, 'time').replaceAll(/\:\d{2}:\d{2}\.\d{3}Z/g, ':00:00.000Z')
      qs.time = null;
      delete qs.time;
    }
  } else if (sget(qs, 'REQUEST') === 'DescribeDomains') {
    res = {
      service: 'WMS',
      REQUEST: 'GetCapabilities',
      layer: qs.layer,
    }
  } else if (sget(qs, 'REQUEST') === 'GetDomainValues') {
    res = {
      service: 'WMS',
      REQUEST: 'GetCapabilities',
      layer: qs.layer,
    }
  } else if (sget(qs, 'REQUEST') === 'GetHistogram') {
    res = {
      service: 'WMS',
      REQUEST: 'GetCapabilities',
      layer: qs.layer,
    }

  } else if (sget(qs, 'REQUEST') === 'GetLegendGraphic') {
    const extra = LAYER_PALETTE[sget(qs, 'layers')] ? LAYER_PALETTE[sget(qs, 'layers')] : {};
    res = {
      ...qs,
      ...extra,
    }
  } else {
    return qs;
  }

  return res
}

function handle_dataset_latest(req) {
  let url = req.url;
  const asked_url = new URL(url, ENV.targetUrl);
  let res_url = new URL(url, ENV.targetUrl);

  if (REWRITE_PATHS[asked_url.pathname]) {
    REWRITE_PATHS[asked_url.pathname](asked_url, res_url) 
  }

  let qs = querystring.parse(asked_url.search.substring(1))
  qs = manageQS(qs)

  return res_url.pathname + '?' + querystring.stringify(qs);
}

function overrideBase(body) {
  return body.replaceAll(ENV.targetUrl, ENV.currentDomain)
}


function overrideDatasetLatest(body) {
  let res = body;
  for (let entry of OVERRIDE_LATEST) {
    res = res.replaceAll(entry[0], entry[1]);
  }
  return res;
}

const PROCESS_ONLY = [
  'application/xml;charset=UTF-8',
  'application/xml',
]


app.use('/', proxy(ENV.targetUrl, {
  proxyReqPathResolver: handle_dataset_latest,
  userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
    if (proxyRes.statusCode !== 200) {
      console.log(proxyResData.toString('utf-8'));
    }

    if (PROCESS_ONLY.includes(proxyRes.headers['content-type'])) {
      let body = proxyResData.toString('utf-8')
      body = overrideBase(body);
      body = overrideDatasetLatest(body);

      if (userReq.url.indexOf('DescribeDomain') > -1) {
        jsonResponse = parser.parse(body);

        res = { 
          ...DESCRIBE_DOMAIN_BASE,
        };

        try {
          timeDimensions = jsonResponse.WMS_Capabilities.Capability.Layer.Layer.Layer.Dimension['#text'].split(',');

          timeDimensions.sort()
          timeDimensions = [timeDimensions[0], timeDimensions[timeDimensions.length - 1]]
          res.Domains.DimensionDomain.Domain = timeDimensions.join('--')
          res.Domains.DimensionDomain.Size = timeDimensions.length


          bbox = jsonResponse.WMS_Capabilities.Capability.Layer.Layer.Layer.BoundingBox;
          res.Domains.SpaceDomain.BoundingBox['@_CRS'] = bbox['@_CRS']
          res.Domains.SpaceDomain.BoundingBox['@_maxx'] = bbox['@_maxx']
          res.Domains.SpaceDomain.BoundingBox['@_maxy'] = bbox['@_maxy']
          res.Domains.SpaceDomain.BoundingBox['@_minx'] = bbox['@_minx']
          res.Domains.SpaceDomain.BoundingBox['@_miny'] = bbox['@_miny']

        } catch(e) {
          console.error(e);
        }

        return XML_PREFIX + builder.build(res)
      }

      if (userReq.url.indexOf('GetDomainValues') > -1) {
        jsonResponse = parser.parse(body)
        const asked_url = new URL(userReq.url, ENV.targetUrl);
        let qs = querystring.parse(asked_url.search.substring(1));

        res = { 
          DomainValues: {
            ...GET_DOMAIN_VALUES_BASE.DomainValues,
            Sort: qs.sort,
            Limit: qs.limit,
          }
        };

        try {
          timeDimensions = jsonResponse.WMS_Capabilities.Capability.Layer.Layer.Layer.Dimension['#text'].split(',');

          timeDimensions.sort()
          if (qs.sort === 'desc') {
            timeDimensions.reverse()
          }
          if (qs.fromValue) {
            from = new Date(qs.fromValue)
            timeDimensions = timeDimensions.filter(t => qs.sort === 'asc' ? new Date(t) > from : new Date(t) < from)
          }

          timeDimensions.length = parseInt(qs.limit)
          res.DomainValues.Domain = timeDimensions.join(',')
          res.DomainValues.Size = timeDimensions.length
        } catch(e) {
          console.error(e);
        }
        
        return XML_PREFIX + builder.build(res)
      }
      
      if (userReq.url.indexOf('GetHistogram') > -1) {
        jsonResponse = parser.parse(body)
        const asked_url = new URL(userReq.url, ENV.targetUrl);
        let qs = querystring.parse(asked_url.search.substring(1));

        res = { 
          Histogram: {
            ...HISTOGRAM_BASE.Histogram,
          }
        };

        try {
          timeDimensions = jsonResponse.WMS_Capabilities.Capability.Layer.Layer.Layer.Dimension['#text'].split(',');
          res.Histogram.Domain = timeDimensions.join(',')
          res.Histogram.Values = ''
        } catch(e) {
          console.error(e);
        }
        
        return XML_PREFIX + builder.build(res)
      }

      return body;
    }
    return proxyResData;
  },
  proxyErrorHandler: function(err, res, next) {
    console.log(err);
    next(err);
  }
}));

app.listen(ENV.port)
