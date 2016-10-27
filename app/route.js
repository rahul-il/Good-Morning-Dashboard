"use strict";
var Route = (function () {
    function Route(title, predictions) {
        this.predictions = [];
        this.title = title;
        this.predictions = predictions;
    }
    Route.prototype.predictionText = function () {
        var text = " ";
        for (var i = 0; i < this.predictions.length; i++) {
            text += this.predictions[i];
            if (i < this.predictions.length - 1) {
                text += ", ";
            }
        }
        return text;
    };
    Route.prototype.firstPrediction = function () {
        if (this.predictions.length > 0) {
            return this.predictions[0];
        }
    };
    Route.prototype.firstPredictionColor = function () {
        if (this.predictions.length > 0) {
            var first = parseInt(this.predictions[0]);
            if (first < 2) {
                return "#BD362F";
            }
            if (first < 5) {
                return "#F89406";
            }
        }
        return "green";
    };
    Route.prototype.tailPredictions = function () {
        var text = " ";
        for (var i = 1; i < this.predictions.length; i++) {
            text += this.predictions[i];
            if (i < this.predictions.length - 1) {
                text += ", ";
            }
        }
        return text;
    };
    return Route;
}());
exports.Route = Route;
//# sourceMappingURL=route.js.map