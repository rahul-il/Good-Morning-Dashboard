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
        this.people = ["Meher", "Charlotte", "Mikio", "Tristen", "Nick"];
        this.target = "";
        this.insult = "";
        this.knightEntrees = [
            { 'title': '8" Hoagie Roll', 'entrees': ['Subs', 'Wraps', 'Chicken Fingers'] },
            { 'title': 'Hamburger Bun 4"', 'entrees': ['Hamburger', 'Hot Dogs'] },
            { 'title': 'Bbq Chicken Wings', 'entrees': ['Barbeque Chicken Wings', 'CHicken Nuggets', 'Honey Glazed Chicken Wings'] },
            { 'title': 'Chicken Parmesan Busch', 'entrees': ['Chicken Parmesan', 'Eggplant Parmesan', 'Italian Sausage'] },
            { 'title': 'Chicken Buffalo Wings Fresh', 'entrees': ['Buffalo Wings', 'Chicken Nuggets', 'Vegan Nuggets'] }
        ];
    }
    FoodComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.updateFood();
        this.updateInsult();
        setInterval(function () { _this.updateFood(); }, 10000);
        setInterval(function () { _this.updateInsult(); }, 43200000);
    };
    FoodComponent.prototype.updateFood = function () {
        var _this = this;
        this.http.get("https://crossorigin.me/https://rumobile.rutgers.edu/1/rutgers-dining.txt")
            .toPromise()
            .then(function (response) { return _this.setFood(response.text()); })
            .catch();
    };
    FoodComponent.prototype.updateInsult = function () {
        var _this = this;
        this.http.get("https://crossorigin.me/http://www.insultgenerator.org/")
            .toPromise()
            .then(function (response) { return _this.setInsult(response.text()); })
            .catch();
    };
    FoodComponent.prototype.setInsult = function (text) {
        var el = document.createElement('html');
        el.innerHTML = text;
        this.insult = el.getElementsByClassName("wrap")[0].textContent.trim();
        this.target = this.people[this.insult.length % this.people.length];
    };
    FoodComponent.prototype.setFood = function (text) {
        this.meals = [];
        var data = JSON.parse(text);
        var busch = this.getBusch(data);
        for (var _i = 0, _a = busch["meals"]; _i < _a.length; _i++) {
            var meal = _a[_i];
            if (meal['genres'] && ["Knight Room", "Lunch", "Dinner"].indexOf(meal["meal_name"]) > -1) {
                var entrees = null;
                for (var _b = 0, _c = meal['genres']; _b < _c.length; _b++) {
                    var genre = _c[_b];
                    if (genre['genre_name'].indexOf('Entrees') > -1 || genre['genre_name'] == "Knight Room") {
                        entrees = genre['items'];
                    }
                }
                //substitute for shorter Knight Room Entrees
                if (meal["meal_name"] == "Knight Room") {
                    for (var _d = 0, _e = this.knightEntrees; _d < _e.length; _d++) {
                        var knightEntree = _e[_d];
                        if (entrees.indexOf(knightEntree.title) > -1) {
                            entrees = knightEntree.entrees;
                        }
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
            template: "\n    <br/>\n    <div class=\"panel panel-default\">\n        <div class=\"panel-body\">\n            <p *ngIf=\"meals.length == 0\">Loading meals from Busch Dining Hall</p>\n            <div class=\"row\">\n                <div class=\"col-md-4\" *ngFor=\"let meal of meals\">\n                    <b style=\"text-align:center\">{{meal.title}}</b>\n                        <p *ngFor=\"let entree of meal['entrees']\">{{entree}}</p>\n                </div>\n            </div>\n        </div>\n    </div>\n    <br/>\n    <b *ngIf=\"target != ''\">{{target}}: </b> {{insult}}\n  "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FoodComponent);
    return FoodComponent;
}());
exports.FoodComponent = FoodComponent;
//# sourceMappingURL=food.component.js.map