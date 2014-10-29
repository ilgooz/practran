'use strict';

require.config({
    baseUrl: chrome.extension.getURL('/'),
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        underscore: '../bower_components/underscore/underscore-min',
        backbone: '../bower_components/backbone/backbone',
        text: '../bower_components/requirejs-text/text',
        mustache: '../bower_components/mustache.js/mustache'
    }
});

require([
    'dialog/dialog.ctrl'
], function(){});