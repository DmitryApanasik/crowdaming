import { Injectable} from "@angular/core";
import { UserService} from "./userService";

@Injectable()
export class ValidationData{
  errors = {
    password: "INVALID_PASSWORD",
    confirmPass: "PASSWORDS_NOT_EQUALS",
  }
  confirmPassword(password: string, confirm: string) {
    if(password === confirm) {
      return null;
    } else {
      return this.errors.confirmPass;
    }
  }
}
