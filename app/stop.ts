import { Route } from './route';


export class Stop{
    title: string;
    routes: Route[] = [];

    constructor(xmlText: string){

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(xmlText, "text/xml");


        let predictionsTag = <HTMLScriptElement[]><any>xmlDoc.getElementsByTagName("predictions");

        console.log(JSON.stringify(xmlText));
        console.log(xmlDoc);

        for (let prediction of predictionsTag){
            this.title = prediction.getAttribute("stopTitle");

            if (prediction.getElementsByTagName("direction").length > 0){
                let title = prediction.getAttribute("routeTitle");
                let predictions = [];

                let times = <HTMLScriptElement[]><any>prediction.getElementsByTagName("direction")[0].getElementsByTagName("prediction");
                
                for (let time of times){
                    predictions.push(time.getAttribute("minutes"));
                }

                this.routes.push(new Route(title, predictions));
            }

        }
    }
}