import {animate, Component, state, style, transition, trigger} from '@angular/core';
import {User} from "../../../model/user";
import {UserService} from "../../../service/userService";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {ValidationData} from "../../../service/validationData";

@Component({
  selector: 'app-register-page',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],

})
export class RegisterComponent {
  protected user: User = new User();
  isPasswordConfirm = false;
  passwordConfirm: string;
  protected errorMessage: string;
  form: FormGroup;
  formErrors = {
    passwordConfirm: ''
  };
  constructor(private userService: UserService,
              private validationService:ValidationData)
  {}

  static setErrors(answer: string) {
    return answer === null;
  }
  controller() {}
  checkFirstName(){}
  checkLastName(){}
  checkEmail(){}
  checkNick(){}
  checkPasswordConfirm(){
    this.formErrors.passwordConfirm = this.validationService.confirmPassword(this.user.password, this.passwordConfirm);
    this.isPasswordConfirm = RegisterComponent.setErrors(this.formErrors.passwordConfirm);
  }
  register(data: any) {
    this.userService.register(this.user).subscribe(data => {
      console.log(data);
    },
      error =>{
        console.log(this.errorMessage = error.json().message);
      })
  }
}
