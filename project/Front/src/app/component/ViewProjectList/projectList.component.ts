import {Component, OnInit} from "@angular/core";
import {ProjectService} from "../../service/projectService";
import {Observable} from "rxjs/Observable";
import { CoreService} from "../../service/coreService";
import {Http,Response} from "@angular/http";
import {Project} from "../../model/project";
import {ProjectAndTagsRequestDto} from "../../model/ProjectAndTagsRequestDto";
import {ProjectRequestDto} from "../../model/ProjectRequestDto";

@Component({
  selector: 'app-view-list-project',
  templateUrl: './projectList.component.html',
  styleUrls:['./projectList.component.css']
})

export class ProjectListComponent implements OnInit{
  projects: Project[] = [];
  name:string;
  constructor( private projectService: ProjectService, private http:Http){
  }
  ngOnInit() {
    this.getSortProject(0);
  }

  getSortProject(data: number){
    this.projectService.getProjects(data)
      .subscribe((resp: Response) => {
        console.log(resp);
        for(let index in resp){
          console.log(resp[index]);
          this.projects[index]= resp[index];
        }
      });
  }

}
