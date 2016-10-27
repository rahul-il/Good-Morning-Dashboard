export class Route{
    title: string;
    predictions = [];

    constructor(title: string, predictions){
        this.title = title;
        this.predictions = predictions
    }

    predictionText(){
        let text = " ";

        for(let i = 0; i < this.predictions.length; i++){
            text += this.predictions[i];

            if (i < this.predictions.length -1){
                text += ", ";
            }
        }
        return text;
    }

    firstPrediction(){
        if (this.predictions.length > 0){
            return this.predictions[0];
        }
    }

    firstPredictionColor(){
        if (this.predictions.length > 0){
            let first = parseInt(this.predictions[0]);

            if (first < 2){
                return "#BD362F";
            }

            if (first < 5){
                return "#F89406";
            }
        }
        return "green";
    }

    tailPredictions(){
        let text = " ";

        for(let i = 1; i < this.predictions.length; i++){
            text += this.predictions[i];

            if (i < this.predictions.length -1){
                text += ", ";
            }
        }
        return text;
    }
}