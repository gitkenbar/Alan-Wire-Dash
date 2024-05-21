export class Position {
  id: number;
  position_title: string;

  constructor(position:any){
    this.id = position.id;
    this.position_title = position.position_title;
  }
}
