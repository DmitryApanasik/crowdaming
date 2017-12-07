import { Component} from "@angular/core";
import {AuthGuard} from "../../../service/guards/auth.guards";
import {User} from "../../../model/user";

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menuProfile.component.html',
  styleUrls: ['./menuProfile.component.css']
})
export class appMenuProfileComponent{
  protected user:User = new User();
  constructor(private authGuard: AuthGuard) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user);
  }
  displayInfoProfile: boolean = true;
  displayEditProfile: boolean = true;

  changeDisplayInfo () {
    this.displayInfoProfile = !this.displayInfoProfile;
  }
  changeDisplayEdit() {
    this.displayEditProfile = !this.displayEditProfile;
  }
}
