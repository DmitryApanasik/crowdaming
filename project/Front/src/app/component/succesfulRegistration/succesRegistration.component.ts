import {Component, OnInit} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthenticationService} from "../../service/AuthentificationService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector:'app-succes-register',
  templateUrl:'./succesRegistration.component.html',
  styleUrls:['./seccesRegistration.component.css'],
  providers: [AuthenticationService]
})

export class SuccesRegistrationComponent{

  private token:string;
  private urlPage:string;
  constructor (){
  }
}
