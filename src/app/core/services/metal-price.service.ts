import { Injectable } from '@angular/core';
import { AlanChart } from '../../shared/models/alan-chart.model';
import { HttpDataService } from './http-data.service';

@Injectable({
  providedIn: 'root'
})
export class MetalPriceService {
  metalPrice: any;
  metalPriceChart:AlanChart | null = null;

  constructor(private http:HttpDataService) {
    this.fetchMetalPrices();
    }

    fetchMetalPrices(){
    this.http.getMetalPrices().subscribe({
      next: (data:any) => {
        this.metalPrice = data;
        this.constructChart();
      },
      error: (error:any) => {
        console.error(error)
      }
    })
  }

  constructChart(){
    let chartData = `
    {
      "type": "bar",
      "data": {
        "labels": ["Low", "Price", "Ask", "Bid", "High"],
        "datasets": [{
          "label": "Monthly Sales",
          "data": [ ${this.metalPrice.rate.low}, ${this.metalPrice.rate.price}, ${this.metalPrice.rate.ask}, ${this.metalPrice.rate.bid}, ${this.metalPrice.rate.high}],
          "backgroundColor": "coral",
          "borderColor": "coral",
          "borderWidth": 1
        }]
      },
      "options": {
        "scales": {
          "y": {
            "beginAtZero": false
          }
        }
      }
    }
`;

  this.metalPriceChart = new AlanChart(this.metalPrice.metal.toUpperCase(), chartData)
  }
}
