import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RouterModule }   from '@angular/router';
import { HttpModule }    from '@angular/http';

import { WeatherComponent } from './weather.component';
import { BusComponent } from './bus.component';
import { HomeComponent } from './home.component';
import { FoodComponent } from './food.component';

@NgModule({
  imports:      [ 
    BrowserModule, 
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ])
  ],
  declarations: [ AppComponent, WeatherComponent, BusComponent, HomeComponent, FoodComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
