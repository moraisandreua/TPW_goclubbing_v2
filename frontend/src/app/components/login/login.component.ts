import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../assets/css/auth.css', '../../../assets/css/index.css']
})
export class LoginComponent {
  title = 'Go Clubbing';
  message = {"type":"success", "body":"corpo da mensagem"};
}
