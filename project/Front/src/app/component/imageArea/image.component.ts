import {Component, Input} from "@angular/core";
import {UserService} from "../../service/userService";
import {User} from "../../model/user";

@Component({
  selector: 'app-image-area',
  templateUrl:'./image.component.html',
  styleUrls: ['./image.component.css']
})

export class ImageComponent {
  protected user: User = new User();
  @Input() image:string;
  constructor(){
    if(this.image != null) {
      this.user.image = this.image;
    }else
    this.user.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505169795/sy6afdedllqhpbh8zebq.jpg';
  }
  updateImg(value: any){
    this.user.image = 'http://res.cloudinary.com/crowbanding/image/upload/v1505169254/' + value + '.jpg';
  }

}
