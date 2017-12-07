import {Component, Input} from "@angular/core";
import {ProjectService} from "../../../service/projectService";

@Component ({
  selector: 'app-pay-project',
  templateUrl:'./payProject.component.html',
  styleUrls:['./payProject.component.css']
})

export class PayProjectComponent {
  @Input() moneyForProject:number;
  muchMoney:number;

  constructor(private projectService:ProjectService){}

  sendMoney(){
    console.log(this.moneyForProject);
    this.projectService.sendMoneyForProject(this.moneyForProject,this.muchMoney).subscribe(data =>{console.log(data)});
  }
}
