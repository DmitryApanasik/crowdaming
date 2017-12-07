import { Injectable} from "@angular/core";
import {CoreService} from "./coreService";
import {Project} from "../model/project";
import {Http,Response,Headers} from "@angular/http";
import {AuthConfigConsts, AuthHttp} from 'angular2-jwt';
import {Comments} from "../model/comments";
import {Tags} from "../model/tags";

@Injectable()
export class ProjectService extends CoreService{
  private project:Project = new Project;
  constructor(private http: Http,
              private authHttp: AuthHttp){
    super();
  }
  sendProjectData(projectRequestDto: any, tags:string[]){
    projectRequestDto.dwy=projectRequestDto.dwy.formatted;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME))
    console.log(projectRequestDto,tags);
    return this.authHttp.post(`${this.webService}sendData`, JSON.stringify({projectRequestDto,tags}),
      {headers}).map((response: Response) => response).do(data => {
      location.href="/profile";
    });
  }
  getProjects(data: number){
    return this.authHttp.post(`${this.webService}getProjects`,data).map(res => res.json());
  }
  getUserProjects(data: any){
    return this.authHttp.post(`${this.webService}getUserProjects`,data).map(res => res.json());
  }
  sendIdProject(data: any){
    return this.authHttp.post(`${this.webService}idProject`,data).map(res => res.json());
  }
  sendComment(comment: Comments){
    console.log(comment);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME))
    return this.authHttp.post(`${this.webService}comment`, JSON.stringify(comment),{headers})
      .map((response:Response)=>response)
      .do(data => {
        location.href="view/project/"+comment.idproject;
      });
  }
  sendMoneyForProject(idProject:number,money:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME))
    return this.http.post(`${this.webService}projectMoney`, JSON.stringify({idProject,money}),{headers})
      .map((response:Response)=>response).do(data=> {
        location.href="view/project/"+idProject;
      });
  }
  sendRating(rating:number,idproject:number,iduser:number){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME))
    return this.authHttp.post(`${this.webService}rating`,JSON.stringify({rating,idproject,iduser}),{headers})
      .map((response:Response)=>response).do(data=> {
        location.href="view/project/"+idproject;
      });
  }
  getProjectByTags(tag:string){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', localStorage.getItem(AuthConfigConsts.DEFAULT_TOKEN_NAME))
    return this.authHttp.post(`${this.webService}searcheTag`,JSON.stringify(tag),{headers})
      .map((response:Response)=>response);
  }
  sendSearcheRequest(data:string){
    return this.http.post(`${this.webService}searche`,data).map((response:Response) =>response);
  }
}
