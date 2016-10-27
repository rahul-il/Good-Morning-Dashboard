import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weather',
  template: `
    <iframe src="https://www.meteoblue.com/en/weather/widget/three/piscataway_united-states-of-america_5102713?geoloc=fixed&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&layout=image"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups" style="width: 100%;height: 100%"></iframe>
  `
})
export class WeatherComponent{


}