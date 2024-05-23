import { AlanChart } from "./alan-chart.model";

export class Department {
  public department_name: string;
  public chart_array: AlanChart[];
  public uid?: number;

  constructor(department_name:string, chart_array:AlanChart[], uid?:number){
    this.department_name = department_name;
    this.chart_array = chart_array;
    this.uid = uid;
  }
}
