import {Injectable} from "@angular/core";
import {User} from "./user";

@Injectable()
export class MessageRequestDto{
  text:string;
  image:string;
  user:User;
}
