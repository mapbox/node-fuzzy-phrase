## Node Fuzzy Phrase

Node.js wrapper using [Neon](https://www.neon-bindings.com/) for the [fuzzy-phrase](https://github.com/mapbox/fuzzy-phrase/pulls) Rust module.

<br>
### Install
To install `node-fuzzy-phrase` run:

`npm install`

By default, binaries are provided for 64 bit OS X >= 10.8 and 64 bit Linux (>= Ubuntu Trusty). On those platforms no external dependencies are needed.

Other platforms will fall back to a source compile: see [Source Build](#Source Build) for details

<br>
### Source build
- To build from source run: `yarn build` || `neon build`. This will automatically build the binaries.

- To do a full rebuild run: `neon clean`

<br>
### Publishing
This project includes `script/publish.sh` which builds binaries and published them to s3.

1. Merge your branch into `master`
2. Update version number in `package.json`
3. `git commit -m 'releasing 0.1.0 [publish binary]'`
