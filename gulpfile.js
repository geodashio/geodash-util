var gulp = require('gulp');
var gutil = require('gulp-util');
var pkg = require('./package.json');
var fs = require('fs');
var jsdoc = require('gulp-jsdoc3');
var child_process = require('child_process');
var Server = require('karma').Server;
var YAML = require("yamljs");

var extract = require("geodash-extract");

var rootConfig = YAML.parse(fs.readFileSync("config.yml", 'utf8'));

gulp.task('docs', function (cb) {
  var src = extract("src.docs", rootConfig, []);
  var config = extract("jsdoc.config", rootConfig);
  gulp.src(src, {read: false}).pipe(jsdoc(config, cb));
});

// See https://github.com/karma-runner/gulp-karma/pull/23#issuecomment-232313832
gulp.task('tests', function (done) {
  var server = new Server({
      configFile: __dirname + '/karma.conf.js',
      singleRun: true
  });
  server.on('run_complete', function (browsers, results) {
      if (results.error || results.failed) {
          done(new Error('There are test failures'));
      }
      else {
          done();
      }
  });
  server.start();
});

gulp.task('default', [
  'docs',
  'tests'
]);
