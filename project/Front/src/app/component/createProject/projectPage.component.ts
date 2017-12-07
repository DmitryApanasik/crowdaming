import { Component} from "@angular/core";
import {ImageComponent} from "../imageArea/image.component";
import {Project} from "../../model/project";
import {ProjectService} from "../../service/projectService";
import {DateModel} from "ng2-datepicker";
import {AuthGuard} from "../../service/guards/auth.guards";
// import {Tags} from "../../model/tags";
import {stringify} from "@angular/core/src/util";
import {User} from "../../model/user";

@Component({
  selector: 'app-project-page',
  templateUrl: './projectPage.component.html',
  styleUrls: ['./projectPage.component.css'],
})

export class ProjectPageComponent {
  protected project: Project = new Project;
  id_image: any;
  user:User;
  calendar:DateModel;
  loading = false;
  tags:string[];
  errorMessage: string;
  constructor(private projectService:ProjectService,
              protected authGuard: AuthGuard) {
    this.project.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505210950/azufvfotm2nypj55ebnm.png';
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }
  updateImg(value: any) {
    this.project.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505169254/' + value + '.jpg';
  }
  sendData(value:any){
    this.project.user = this.user.id;
    this.projectService.sendProjectData(this.project, this.tags).subscribe( error => {
      this.loading = false;
    });
  }
}
