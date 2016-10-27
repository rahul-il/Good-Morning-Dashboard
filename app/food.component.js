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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var FoodComponent = (function () {
    function FoodComponent(http) {
        this.http = http;
        this.meals = [];
    }
    FoodComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateFood();
        setInterval(function () { _this.updateFood(); }, 10000);
    };
    FoodComponent.prototype.updateFood = function () {
        var _this = this;
        this.http.get("https://crossorigin.me/https://rumobile.rutgers.edu/1/rutgers-dining.txt")
            .toPromise()
            .then(function (response) { return _this.setFood(response.text()); })
            .catch();
    };
    FoodComponent.prototype.setFood = function (text) {
        this.meals = [];
        var data = JSON.parse(text);
        var busch = this.getBusch(data);
        for (var _i = 0, _a = busch["meals"]; _i < _a.length; _i++) {
            var meal = _a[_i];
            if (["Knight Room", "Lunch", "Dinner"].indexOf(meal["meal_name"]) > -1) {
                var entrees = null;
                for (var _b = 0, _c = meal['genres']; _b < _c.length; _b++) {
                    var genre = _c[_b];
                    if (genre['genre_name'].indexOf('Entrees') > -1 || genre['genre_name'] == "Knight Room") {
                        entrees = genre['items'];
                    }
                }
                if (entrees != null) {
                    this.meals.push({
                        'title': meal['meal_name'],
                        'entrees': entrees
                    });
                }
            }
        }
    };
    FoodComponent.prototype.getBusch = function (data) {
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var location_1 = data_1[_i];
            if (location_1['location_name'] == "Busch Dining Hall") {
                return location_1;
            }
        }
        return { 'meals': [] };
    };
    FoodComponent = __decorate([
        core_1.Component({
            selector: 'food',
            template: "\n    <br/>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <h3 style=\"text-align:center\">Entrees</h3>\n\n            <div class=\"row\">\n                <div class=\"col-md-4\" *ngFor=\"let meal of meals\">\n                    <b style=\"text-align:center\">{{meal.title}}</b>\n                        <p *ngFor=\"let entree of meal['entrees']\">{{entree}}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FoodComponent);
    return FoodComponent;
}());
exports.FoodComponent = FoodComponent;
//# sourceMappingURL=food.component.js.map