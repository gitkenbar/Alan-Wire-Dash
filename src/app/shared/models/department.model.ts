import { UserChart } from "./user-chart.model";

export class Department {
  public department_name: string;
  public chart_array: UserChart[];

  constructor(department_name:string, chart_array:UserChart[]){
    this.department_name = department_name;
    this.chart_array = chart_array;
  }
}
