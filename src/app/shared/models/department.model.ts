import { Chart } from "./chart.model";

export class Department {
  public department_name: string;
  public chart_array: Chart[];

  constructor(department_name:string, chart_array:Chart[]){
    this.department_name = department_name;
    this.chart_array = chart_array;
  }
}
