import {Injectable} from "@angular/core";
import {ProjectRequestDto} from "./ProjectRequestDto";
import {User} from "./user";

@Injectable()
export class ProjectAndTagsRequestDto{
  projectRequestDto:ProjectRequestDto;
  tags:string[];
  comment:string[];
  user:User[];
}
