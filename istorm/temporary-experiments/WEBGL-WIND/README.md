## WebGL Wind — [Demo](https://mapbox.github.io/webgl-wind/demo/)

A WebGL-powered visualization of wind power.
Capable of rendering up to 1 million wind particles at 60fps.

This project is heavily inspired by the work of:

- [Cameron Beccario](https://twitter.com/cambecc)
and his wonderful [Earth project](https://earth.nullschool.net/)
with its [open-source version](https://github.com/cambecc/earth).
- [Fernanda Viégas and Martin Wattenberg](http://hint.fm/) and their
[US Wind Map project](http://hint.fm/projects/wind/).
- [Chris Wellons](http://nullprogram.com) and his WebGL tutorials,
in particular [A GPU Approach to Particle Physics](http://nullprogram.com/blog/2014/06/29/).
- [Greggman](http://games.greggman.com/game/) and his [WebGL Fundamentals](http://webglfundamentals.org/) guide.

### Running the demo locally

```bash
npm install
npm run build
npm start
# open http://127.0.0.1:1337/demo/
```

### Downloading weather data

1. Install [ecCodes](https://confluence.ecmwf.int//display/ECC/ecCodes+Home) (e.g. `brew install eccodes`).
2. Edit constants in `data/download.sh` for desired date, time and resolution.
3. Run `./data/download.sh <dir>` to generate wind data files (`png` and `json`) for use with the library.



# IWS INKODE VERSION

## source: https://github.com/mapbox/webgl-wind

## ECCODES INSTALLATION
```bash
wget "https://software.ecmwf.int/wiki/download/attachments/45757960/eccodes-2.13.0-Source.tar.gz"
tar -xzf eccodes-2.13.0-Source.tar.gz
mkdir build213
cd build213
cmake -DENABLE_ECCODES_OMP_THREADS=ON -DENABLE_PNG=ON -DENABLE_JPG=ON -DENABLE_AEC=ON -DENABLE_MEMFS=ON ../eccodes-2.13.0-Source
make
ctest
make install

```

