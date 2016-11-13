import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Stop } from './stop';

@Component({
  selector: 'bus',
  template: `
    
        <br/>
    <div class="panel panel-default">
        <div class="panel-body">
            <div *ngFor="let stop of stops">
                <span *ngIf="stop">
                    <div class="row" *ngFor="let route of stop.routes">
                        <div class="col-md-6">
                            <p>
                                <b style="font-size:2em; vertical-align:middle">{{route.title}}</b>
                                &nbsp;&nbsp;<b [style.color]="route.firstPredictionColor()" style="font-size:1.5em; vertical-align:middle">{{route.firstPrediction()}} min</b> <br/>
                            </p>
                        </div>

                        <div class="col-md-6" style="text-align:right">
                            <p style="color:#373D3F">
                                <span style="font-size:2em; vertical-align:middle">&nbsp;</span>
                                <span style="font-size:1.5em; vertical-align:middle">{{route.tailPredictions()}} min &nbsp;</span>
                            </p>
                            
                        </div>
                        <hr /> <br/>
                    </div>
                </span>
            </div>
        </div>
    </div>
  `
})
export class BusComponent implements OnInit{

    stops: Stop[] = [];
    stopIds = ['1008','1056'];

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