/**
 * @module DataScouting
 * @desc Prototype module of ECARLE
 * @authors Iordanis Kostelidis, Ioakeim James Theologou
 * @license MPL 2.0
 * @copyright Mangalam Research Center for Buddhist Languages
 * @modified DataScouting
 */

getDocHtmlUrlPattern = () => {
    return "http://localhost:8088/schemas/tei-doc/ref-${name:s(\":\",\"_\")}.html";
};

let makeRequest = function (url, method) {

    // Create the XHR request
    let request = new XMLHttpRequest();

    // Return it as a Promise
    return new Promise(function (resolve, reject) {

        // Setup our listener to process compeleted requests
        request.onreadystatechange = function () {

            // Only run if the request is complete
            if (request.readyState !== 4) return;

            // Process the response
            if (request.status >= 200 && request.status < 300) {
                // If successful
                resolve(request);
            } else {
                // If failed
                reject({
                    status: request.status,
                    statusText: request.statusText
                });
            }

        };

        // Setup our HTTP request
        request.open(method || 'GET', url, true);

        // Send the request
        request.send();

    });
};

const defaultTeiFile = "http://localhost:8088/example.tei.xml";

/* global Promise */
define(function f(require) {
    "use strict";

    const wed = require("wed");
    const $ = require("jquery");
    const globalConfig = require("global-config");
    const mergeOptions = require("merge-options");

    function getOptions() {
        return {
            "schema": "../schemas/test.js",
            "ajaxlog": {
                "url": "/storage/log.txt"
            },
            "save": {
                "path": "./wed/savers/ajax",
                "options": {
                    "url": "/storage/save.txt"
                }
            }
        }
    }

    $(function ready() {
        var widget = document.getElementById("widget");
        var finalOptions = mergeOptions({}, globalConfig.config, getOptions());
        window.wed_editor = wed.makeEditor(widget, finalOptions);

        return makeRequest(defaultTeiFile)
            .then(response => response.responseText)
            .then(content => window.wed_editor.init(content));
    });
});



