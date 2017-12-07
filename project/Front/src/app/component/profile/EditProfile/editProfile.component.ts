import { Component} from "@angular/core";
import {UserService} from "../../../service/userService";
import {User} from "../../../model/user";
import {ImageComponent} from "../../imageArea/image.component";
import {FormGroup} from "@angular/forms";
import {ValidationData} from "../../../service/validationData";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './editProfile.component.html',
  styleUrls: ['./editProfile.component.css'],
  providers: [ImageComponent]
})

export class EditProfileComponent {
  protected user: User = new User();
  isPasswordConfirm = false;
  passwordConfirm: string;
  form: FormGroup;
  formErrors = {
    passwordConfirm: ''
  };
  constructor (private userService: UserService,
               private imageComponent: ImageComponent,
               private validationService: ValidationData) {
    this.user.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505169795/sy6afdedllqhpbh8zebq.jpg';
  }
  static setErrors(answer: string) {
    return answer === null;
  }
  checkPasswordConfirm(){
    this.formErrors.passwordConfirm = this.validationService.confirmPassword(this.user.password, this.passwordConfirm);
    this.isPasswordConfirm = EditProfileComponent.setErrors(this.formErrors.passwordConfirm);
  }
  updateProfile(data: any) {
    console.log(this.user.image);
    this.userService.updateProfile(this.user).subscribe(data => {
      console.log(this.user);
      localStorage.setItem("currentUser",JSON.stringify(data.json()));
    });
  }
  updateImg(value: any){
    this.user.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505169254/' + value + '.jpg';
    localStorage.setItem("image",this.user.image);
  }
}
