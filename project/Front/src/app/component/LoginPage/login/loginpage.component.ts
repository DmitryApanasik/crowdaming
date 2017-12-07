import {animate, Component, OnInit, state, style, transition, trigger} from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../../model/user';
import {UserService} from '../../../service/userService';
import {AuthenticationService} from '../../../service/AuthentificationService';
import {Http} from "@angular/http";
import {FormGroup, NgForm} from "@angular/forms";
import {NgFor} from "@angular/common";

@Component({
  selector: 'app-login-page',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
})
export class LoginPageComponent{
  error: string;
  protected change: boolean = false;
  protected user: User = new User();
  constructor(private authenticationService: AuthenticationService,
              private userServise: UserService,
              private router: Router) {
  }
  checkLogin() {}
  checkPassword() {}
  loading = false;
  returnUrl: string;
  errorMessage: string;
  login(data: any) {
    this.loading = true;
    this.errorMessage = null;
    this.authenticationService.login(this.user.userName, this.user.password)
      .flatMap(data => {
        return this.authenticationService.getMe();
      })
      .subscribe(
        data => {
          console.log(JSON.stringify(data));
          localStorage.setItem('currentUser', JSON.stringify(data));
          location.href="/profile";
        },
        error => {
          this.loading = false;
          console.log(this.errorMessage = error.json().message);
        }
      );
  }
  formReset(form: NgForm){
      form.reset();
  }
}
