import { Component} from "@angular/core";
import {UserService} from "../../../service/userService";
import {User} from "../../../model/user";
import {error} from "util";

@Component({
  selector: 'app-info-profile',
  templateUrl: './infoProfile.component.html',
  styleUrls: ['./infoProfile.component.css']
})

export class InfoProfileComponent {
  protected user: User;

  constructor()
  {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user);
  }
}
