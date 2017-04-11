# GeoDash Util (geodash-util)

A collection of low-level utility functions for [GeoDash](http://geodash.io) that can be used during building or runtime.

```
var util = require("geodash-util");

if(util.isString("aaa")) {
  ...
}

if(util.getHashValue("zoom")) {
  ...
}
```

## GeoDash

GeoDash is a modern web framework and approach for quickly producing visualizations of geospatial data. The name comes from "geospatial dashboard".

The framework is built to be extremely extensible. You can use GeoDash Server (an implementation), the front-end framework, backend code, or just the Gulp pipeline. Have fun!

See [http://geodash.io](http://geodash.io) for more details.

# Install

Install with [npm](https://npmjs.org/package/geodash-util)

```
npm install geodash-util --save-dev
```

# Usage

This collection of low-level utility functions can be used independently or as `geodash.util.*` in [GeoDashJS](https://npmjs.org/package/geodash.js).

**Independently**

```
var flatten = require("geodash-util");
if(util.isString("aaa")) {
  ...
}

if(util.getHashValue("zoom")) {
  ...
}
```

**In GeoDashJS**

```
if(geodash.util.isString("aaa")) {
  ...
}

if(geodash.util.getHashValue("zoom")) {
  ...
}
```

# Building

## docs

To build the custom docs template used in the website, you'll need to install a custom version of docstrap.git on top of the default version.  The below command will install the custom version.

```
npm install git+https://git@github.com/geodashio/docstrap.git\#geodash # Install custom docs template with font awesome
```

You can just build docs with:
```
npm run build:docs # or gulp docs since run the same thing
```

# Tests

Only [jshint](http://jshint.com/about/) is supported right now.  Run tests with the following command.

```
npm run tests
```

# Contributing

Happy to accept pull requests!

# License

See `LICENSE` file.
