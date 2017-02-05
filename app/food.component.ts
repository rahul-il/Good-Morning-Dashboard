import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Component({
  selector: 'food',
  template: `
    <br/>
    <div class="panel panel-default">
        <div class="panel-body">
            <p *ngIf="meals.length == 0">Loading meals from Busch Dining Hall</p>
            <div class="row">
                <div class="col-md-4" *ngFor="let meal of meals">
                    <b style="text-align:center">{{meal.title}}</b>
                        <p *ngFor="let entree of meal['entrees']">{{entree}}</p>
                </div>
            </div>
        </div>
    </div>
    <span style="text-align:center"><b *ngIf="target != ''">{{target}}: </b> {{insult}}</span>
  `
})
export class FoodComponent implements OnInit{

    meals = [];
    people = ["Meher", "Charlotte", "Mikio", "Tristen", "Nick"];
    target = "";
    insult = "";

    knightEntrees = [
        {'title' : '8" Hoagie Roll', 'entrees': ['Subs', 'Wraps', 'Chicken Fingers']},
        {'title' : 'Hamburger Bun 4"', 'entrees':  ['Hamburger', 'Hot Dogs']},
        {'title' : 'Bbq Chicken Wings', 'entrees':  ['Barbeque Chicken Wings', 'Chicken Nuggets', 'Honey Glazed Chicken Wings']},
        {'title' : 'Chicken Parmesan Busch', 'entrees':  ['Chicken Parmesan', 'Eggplant Parmesan', 'Italian Sausage' ]},
        {'title' : 'Chicken Buffalo Wings Fresh', 'entrees':  ['Buffalo Wings', 'Chicken Nuggets', 'Vegan Nuggets']}
    ]

    constructor(private http: Http){
    }

    ngOnInit(){
        this.updateFood();
        this.updateInsult();
        setInterval(() => { this.updateFood();}, 10000);
        setInterval(() => { this.updateInsult();}, 43200000);
    }


    updateFood(){
        this.http.get("https://crossorigin.me/https://rumobile.rutgers.edu/1/rutgers-dining.txt")
                .toPromise()
                .then(response => this.setFood(response.text()))
                .catch();

        
    }

    updateInsult(){
        this.http.get("https://crossorigin.me/http://www.insultgenerator.org/")
                .toPromise()
                .then(response => this.setInsult(response.text()))
                .catch();
    }

    setInsult(text){
        let el = document.createElement('html');
        el.innerHTML = text;

        this.insult = el.getElementsByClassName("wrap")[0].textContent.trim();
        this.target = this.people[this.insult.length % this.people.length];

    }

    setFood(text){
        this.meals = [];

        let data = JSON.parse(text);
        let busch = this.getBusch(data);
        
        if (!busch['meals'][0]['meal_avail']){
            this.meals.push({
                'title': 'Lunch',
                'entrees': ["Baked Haddock", "Fiery Fingers Chicken", "Italian Meatballs .5 Oz"]
            });
            this.meals.push({
                'title': 'Dinner',
                'entrees': ["Bacon Wrapped Maple Glazed Pork Loin", "Baked Breaded Pollock Fish", "Catch of the Day", "Coq Au Vin"]
            });
        }

        for (let meal of busch["meals"]){

            if (meal['genres'] && ["Knight Room", "Lunch", "Dinner"].indexOf(meal["meal_name"]) > -1){
                let entrees = null;

                for (let genre of meal['genres']){
                    if (genre['genre_name'].indexOf('Entrees') > -1 || genre['genre_name'] == "Knight Room"){
                        entrees = genre['items'];
                    }
                }

                //substitute for shorter Knight Room Entrees
                if (meal["meal_name"] == "Knight Room"){
                    for (let knightEntree of this.knightEntrees){
                        if (entrees.indexOf(knightEntree.title) > -1){
                            entrees = knightEntree.entrees;
                        }
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