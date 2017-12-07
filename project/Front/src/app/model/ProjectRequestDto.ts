import {Injectable} from "@angular/core";

@Injectable()
export class ProjectRequestDto{
  user:number;
  name: string;
  dwy:string;
  image:string;
  rating:number;
  content:string;
  purpose:string;
  money:number;
  status:string;
  cash:number;
}
