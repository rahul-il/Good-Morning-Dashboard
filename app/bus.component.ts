import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Stop } from './stop';

@Component({
  selector: 'bus',
  template: `
    <div *ngFor="let stop of stops">
        <br/>
        <div class="panel panel-default" *ngIf="stop != null">
            <div class="panel-body">
                <!-- <h3 style="text-align:center">{{stop.title}}</h3> -->
                <div class="row" *ngFor="let route of stop.routes">
                    <div class="col-md-6">
                        <p style="font-size:1.5em">
                            <b>{{route.title}}</b>
                        </p>
                    </div>

                    <div class="col-md-6" style="text-align:right">
                        <p style="font-size:1.2em" >
                            <b [style.color]="route.firstPredictionColor()">{{route.firstPrediction()}} min</b> <br/>
                            <span style="color:#373D3F"> {{route.tailPredictions()}} min </span>
                        </p>
                    </div>
                    <hr />
                </div>
                        
            </div>
        </div>
    </div>
  `
})
export class BusComponent implements OnInit{

    stops: Stop[] = [];
    stopIds = ['1008'];

    constructor(private http: Http){
        for (let stopId of this.stopIds){
            this.stops.push(null);
        }
    }
    ngOnInit(){
        this.updateStops();
        setInterval(() => { this.updateStops();}, 10000);
        
    }


    updateStops(){
        for (let i = 0; i < this.stops.length; i++){
            this.http.get("http://webservices.nextbus.com/service/publicXMLFeed?command=predictions&a=rutgers&stopId="+this.stopIds[i])
                .toPromise()
                .then(response => this.stops[i] = new Stop(response.text()))
                .catch();
        }
    }

}