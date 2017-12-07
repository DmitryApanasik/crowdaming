import {Component, OnInit} from "@angular/core";
import {Project} from "../../../model/project";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {ProjectService} from "../../../service/projectService";
import {User} from "../../../model/user";


@Component({
  selector: 'app-info-project',
  templateUrl: './projectInfo.component.html',
  styleUrls: ['./projectInfo.component.css']
})

export class ProjectInfoComponent implements OnInit{
  protected projects: Project[] = [];
  protected user:User = new User();
  constructor (protected router: Router,
               private projectService: ProjectService,
               private http:Http){
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.getProject(this.user.id);
  }

  getProject(data: any){
    this.projectService.getUserProjects(data)
      .subscribe((resp: Response) => {
        console.log(resp);
        for(let index in resp){
          console.log(resp[index]);
          this.projects[index]= resp[index];
        }
      });
  }
}
