import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'food',
  template: `
    <br/>
    <div class="panel panel-default">
        <div class="panel-body">
            <h3 style="text-align:center">Entrees</h3>

            <div class="row">
                <div class="col-md-4" *ngFor="let meal of meals">
                    <b style="text-align:center">{{meal.title}}</b>
                        <p *ngFor="let entree of meal['entrees']">{{entree}}</p>
                </div>
            </div>
        </div>
    </div>
  `
})
export class FoodComponent implements OnInit{

    meals = [];

    constructor(private http: Http){
    }

    ngOnInit(){
        this.updateFood();
        setInterval(() => { this.updateFood();}, 10000);
        
    }


    updateFood(){
        this.http.get("https://crossorigin.me/https://rumobile.rutgers.edu/1/rutgers-dining.txt")
                .toPromise()
                .then(response => this.setFood(response.text()))
                .catch();
    }

    setFood(text){
        this.meals = [];

        let data = JSON.parse(text);
        let busch = this.getBusch(data);

        for (let meal of busch["meals"]){

            if (meal['genres'] && ["Knight Room", "Lunch", "Dinner"].indexOf(meal["meal_name"]) > -1){
                let entrees = null;

                for (let genre of meal['genres']){
                    if (genre['genre_name'].indexOf('Entrees') > -1 || genre['genre_name'] == "Knight Room"){
                        entrees = genre['items'];
                    }
                }

                if (entrees != null){
                    this.meals.push({
                        'title': meal['meal_name'],
                        'entrees': entrees
                    });
                }
            }

        }

    }

    getBusch(data){
        for(let location of data){
            if (location['location_name'] == "Busch Dining Hall"){
                return location;
            }
        }
        return {'meals': []};
    }

}