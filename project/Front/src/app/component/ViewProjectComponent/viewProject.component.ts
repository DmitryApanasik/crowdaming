import {Component, OnDestroy, OnInit} from "@angular/core";
import {Project} from "../../model/project";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ProjectService} from "../../service/projectService";
import {User} from "../../model/user";
import {Comments} from "../../model/comments";
import {ProjectAndTagsRequestDto} from "../../model/ProjectAndTagsRequestDto";
import {ProjectRequestDto} from "../../model/ProjectRequestDto";
import {AuthGuard} from "../../service/guards/auth.guards";


@Component({
  selector: 'app-project-view',
  templateUrl:'./viewProject.component.html',
  styleUrls: ['./viewProject.component.css']
})

export class ViewProjectComponent implements OnDestroy,OnInit{
  protected project: Project = new Project;
  protected projectAndTagsResponse:ProjectAndTagsRequestDto;
  protected projectRequestDto: ProjectRequestDto;
  protected name:string;
  protected flag:string;
  protected tags:string[];
  protected idproject:number;
  private user:User = new User();
  private subscribtion:Subscription;
  protected comment:Comments = new Comments();
  protected authGuard:boolean = true;

  constructor(private  router:Router,
              private activateRouter: ActivatedRoute,
              private projectService: ProjectService){
    this.subscribtion = this.activateRouter.params.subscribe(params => this.idproject = params["idproject"]);
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if(this.user == null){
      this.authGuard = false;
    }
    console.log(this.user);
    this.sendIdProject();

  }
  ngOnDestroy(){
    this.subscribtion.unsubscribe();
  }
  ngOnInit(){
    console.log(this.projectAndTagsResponse);
    console.log(this.projectRequestDto);
    console.log(this.projectRequestDto);
  }
  sendIdProject(){
    this.projectService.sendIdProject(this.idproject)
      .subscribe(
        data => {
          this.projectAndTagsResponse = data;
          this.projectRequestDto = this.projectAndTagsResponse.projectRequestDto;
          console.log(this.projectRequestDto);
          console.log(this.projectAndTagsResponse);
        }, error2 => {
          console.log(error2);
        });
  }
  switched(tag:string){
    location.href='/searcheResults/tag'+tag;
  }
  sendComment(data:any){
    this.comment.idproject = this.idproject;
    this.comment.iduser = this.user.id;
    console.log(this.comment);
    this.projectService.sendComment(this.comment).subscribe(data =>{
      console.log(data);

    });
  }
  rating(rating:number){
    this.projectService.sendRating(rating,this.idproject,this.user.id).subscribe(data =>{console.log(data)})
  }
}
