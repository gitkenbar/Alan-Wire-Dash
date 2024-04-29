import { Chart } from "./chart.model";

export class Department {
  public departmentName: string;
  public chartArr: Chart[];

  constructor(departmentName:string, chartArr:Chart[]){
    this.departmentName = departmentName;
    this.chartArr = chartArr;
  }
}
