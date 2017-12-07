import {Component, Input} from "@angular/core";
import {Project} from "../../../model/project";

@Component ({
  selector:'app-contaner-for-project',
  templateUrl:'./contanerForProject.component.html',
  styleUrls:['./contanerForProject.component.css']
})

export class ContanerForProjectComponent{
  @Input() project: Project = new Project();
  redirectToProject(){
    location.href="view/project/" + this.project.idproject;
  }
}
