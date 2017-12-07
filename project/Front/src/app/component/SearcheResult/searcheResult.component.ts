import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {Subscription} from "rxjs/Subscription";
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../service/projectService";
import {sendRequest} from "selenium-webdriver/http";

@Component({
  selector: 'app-searche-result',
  templateUrl:'./searcheResult.component.html',
  styleUrls:['./searcheResult.component.css']
})

export class SearcheResultComponent implements OnDestroy,OnInit{
  protected projects:Project[] = [];
  protected request:string;
  protected parseRequest:string;
  private subscribtion:Subscription;
  constructor(private activateRouter: ActivatedRoute,
              private projectService: ProjectService){
    this.subscribtion = this.activateRouter.params.subscribe(params => this.request = params["request"]);
  }
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  ngOnInit(){
    if(this.request.indexOf("tag",0) != -1) {
      this.parseRequest = this.request.split("tag",2)[1];
      console.log(this.parseRequest);
      this.sendRequestByTags(this.parseRequest);
    }else {
      this.sendRequestFromHeader(this.request.split("searche",2)[1]);
    }
  }
  sendRequestByTags(tag:string){
    this.projectService.getProjectByTags(tag).subscribe(data =>{
      this.projects = data.json();
    });
  }
  sendRequestFromHeader(searcheRequest:string){
    return this.projectService.sendSearcheRequest(searcheRequest).subscribe(data =>{
      this.projects = data.json();
        console.log(data);
      })
  }
}
