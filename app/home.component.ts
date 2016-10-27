import { Component } from '@angular/core';

@Component({
  selector: 'home',
  template: `
    <div class="row">
        <div class="col-md-6">
            <weather></weather>
        </div>
        <div class="col-md-6">
            <bus></bus>
            <food></food>
        </div>
    </div>
  `
})
export class HomeComponent { }
