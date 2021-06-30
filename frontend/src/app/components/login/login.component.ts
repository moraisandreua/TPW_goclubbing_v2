import { Component } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/auth.css', '../../../assets/css/index.css']
})
export class LoginComponent {
  title = 'Go Clubbing';
  message = {"type":"success", "body":"corpo da mensagem"};
  username:string="";
  password:string="";

  constructor(private authenticationService:AuthenticationService) { }

  setUsername(event:any):void{
    this.username=event.target.value;
  }

  setPassword(event:any):void{
    this.password=event.target.value;
  }

  login():void{
    console.log(this.username + " / " + this.password);
    if(this.username!="" && this.password!="")
      this.authenticationService.login(this.username, this.password).subscribe(t => {
        console.log(t);
      })
  }
}
