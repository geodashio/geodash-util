// Karma configuration
// Generated on Tue Jan 17 2017 19:17:30 GMT+0000 (UTC)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: './',

    /*commonjsPreprocessor: {
      modulesRoot: 'src/'
    },*/

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    //frameworks: ['browserify', 'jasmine'],
    //frameworks: ['jasmine'],
    frameworks: ['browserify', 'mocha'],
    //frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [
      //'node_modules/geodash-extract/index.js',
      'node_modules/jquery/jquery.min.js',
      'node_modules/angular/angular.min.js',
      'src/**/*.js'
    ],

    // list of files to exclude
    exclude: ['karma.conf.js', 'gulpfile.js'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify']
    },

    browserify: {
      debug: true
      // plus whatever else; package.json settings will be read as well
    },

    plugins: [
      //'karma-jasmine',
      'karma-phantomjs-launcher',
      'karma-spec-reporter',
      'karma-browserify',
      'karma-mocha'
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['spec'], //


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
