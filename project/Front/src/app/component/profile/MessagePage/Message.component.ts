import {Component, OnInit} from "@angular/core";
import {UserService} from "../../../service/userService";
import {MessageRequestDto} from "../../../model/MessageRequestDto";

@Component ({
  selector:'app-message-component',
  templateUrl:'./Message.component.html',
  styleUrls:['./Message.component.css']
})

export class MessageComponent implements OnInit{
  protected messages:MessageRequestDto[] =[];
  blockedList: number[] = [];
  constructor(private userService:UserService) {

  }
  ngOnInit(){
    this.userService.getMessage().
    subscribe((resp: Response) =>{
      console.log(resp);
      for(let index in resp){
        console.log(resp[index]);
        this.messages[index] = resp[index];
      }
    });
  }
  confirm(choose:number,id:number){
    this.blockedList.unshift(choose);
    this.blockedList.push(id);
    console.log(this.blockedList);
    this.userService.confirm(this.blockedList).subscribe(data =>{ console.log(data);})
    this.blockedList.splice(0,1);
  }
}
