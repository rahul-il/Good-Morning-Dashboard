"use strict";
var route_1 = require('./route');
var Stop = (function () {
    function Stop(xmlText) {
        this.routes = [];
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlText, "text/xml");
        var predictionsTag = xmlDoc.getElementsByTagName("predictions");
        for (var _i = 0, predictionsTag_1 = predictionsTag; _i < predictionsTag_1.length; _i++) {
            var prediction = predictionsTag_1[_i];
            this.title = prediction.getAttribute("stopTitle");
            if (prediction.getElementsByTagName("direction").length > 0) {
                var title = prediction.getAttribute("routeTitle");
                var predictions = [];
                var times = prediction.getElementsByTagName("direction")[0].getElementsByTagName("prediction");
                for (var _a = 0, times_1 = times; _a < times_1.length; _a++) {
                    var time = times_1[_a];
                    predictions.push(time.getAttribute("minutes"));
                }
                this.routes.push(new route_1.Route(title, predictions));
            }
        }
    }
    return Stop;
}());
exports.Stop = Stop;
//# sourceMappingURL=stop.js.map