import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'weather',
  template: `
    
      <iframe src="https://www.meteoblue.com/en/weather/widget/three/piscataway_united-states-of-america_5102713?geoloc=fixed&days=4&tempunit=FAHRENHEIT&windunit=MILE_PER_HOUR&layout=image"  frameborder="0" scrolling="NO" allowtransparency="true" sandbox="allow-same-origin allow-scripts allow-popups" style="width: 100%;height: 99%"></iframe>
    

    <!-- 
    <iframe id="forecast_embed" type="text/html" frameborder="0" height="245" width="100%" src="http://forecast.io/embed/#lat=42.3583&lon=-71.0603&name=Downtown Boston"> </iframe>
    -->
  `
})
export class WeatherComponent{


}