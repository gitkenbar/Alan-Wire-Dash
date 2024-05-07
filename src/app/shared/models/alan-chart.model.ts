export class AlanChart {
  //Inorder to function properly, an AlanChart has a chart_title and a chart_data, both of which are strings
  //VERY IMPORTANT: chart_data is a Chart.js chart configuration saved as a JSON string
  //This ensures it goes smoothly into the rails DB as a text blob. We unpack it on this side in components where charts are rendered

  public chart_title: string;
  public chart_data: string;

  constructor(chart_title:string, chart_data:string){
    this.chart_title = chart_title;
    this.chart_data = chart_data;
  }
}
