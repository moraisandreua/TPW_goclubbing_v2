import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../assets/css/auth.css', '../../../assets/css/index.css']
})
export class SignupComponent {
  message: any = {"type":"error", "body":"corpo da mensagem"};
}
