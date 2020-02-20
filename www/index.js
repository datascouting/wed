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

const defaultTEI = "<TEI version=\"3.3.0\" xmlns=\"http://www.tei-c.org/ns/1.0\">\n" +
    " <teiHeader>\n" +
    "  <fileDesc>\n" +
    "   <titleStmt>\n" +
    "    <title>The shortest TEI Document Imaginable</title>\n" +
    "   </titleStmt>\n" +
    "   <publicationStmt>\n" +
    "    <p>First published as part of TEI P2, this is the P5\n" +
    "         version using a name space.</p>\n" +
    "   </publicationStmt>\n" +
    "   <sourceDesc>\n" +
    "    <p>No source: this is an original work.</p>\n" +
    "   </sourceDesc>\n" +
    "  </fileDesc>\n" +
    " </teiHeader>\n" +
    " <text>\n" +
    "  <body>\n" +
    "   <p>This is about the shortest TEI document imaginable.</p>\n" +
    "  </body>\n" +
    " </text>\n" +
    "</TEI>";

/* global Promise */
define(function f(require) {
    "use strict";

    const wed = require("wed");
    const $ = require("jquery");
    const globalConfig = require("global-config");
    const mergeOptions = require("merge-options");

    function getOptions() {
        return {
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
        window.wed_editor.init(defaultTEI);
    });
});



