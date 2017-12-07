import {Injectable} from "@angular/core";

@Injectable()
export class Project{
  idproject: number;
  name: string;
  dwy:string;
  image:string;
  userName:string;
  rating:number;
  content:string;
  purpose:string;
  money:number;
  statusEntity:string;
  tags:string[];
  user:number;
  cash:number;
}
