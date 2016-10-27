"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var WeatherComponent = (function () {
    function WeatherComponent() {
    }
    WeatherComponent = __decorate([
        core_1.Component({
            selector: 'weather',
            template: "\n    \n      <iframe src=\"https://www.meteoblue.com/en/weather/widget/three/piscataway_united-states-of-america_5102713?geoloc=fixed&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&layout=image\"  frameborder=\"0\" scrolling=\"NO\" allowtransparency=\"true\" sandbox=\"allow-same-origin allow-scripts allow-popups\" style=\"width: 100%;height: 99%\"></iframe>\n    \n\n    <!-- \n    <iframe id=\"forecast_embed\" type=\"text/html\" frameborder=\"0\" height=\"245\" width=\"100%\" src=\"http://forecast.io/embed/#lat=42.3583&lon=-71.0603&name=Downtown Boston\"> </iframe>\n    -->\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WeatherComponent);
    return WeatherComponent;
}());
exports.WeatherComponent = WeatherComponent;
//# sourceMappingURL=weather.component.js.map