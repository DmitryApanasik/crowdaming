import {animate, Component, state, style, transition, trigger} from '@angular/core';
import {LoginPageComponent} from "./login/loginpage.component";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginPageComponent]

})
export class LoginComponent {

  constructor(private loginpage:LoginPageComponent){}
  activeLinkLogin: boolean = true;
  activeLinkRegister: boolean = false;

  changeActiveLogin(){
    this.activeLinkLogin = true;
    this.activeLinkRegister=false;
  }
  changeActiveRegister() {
    this.activeLinkRegister = true;
    this.activeLinkLogin = false;
  }
}
