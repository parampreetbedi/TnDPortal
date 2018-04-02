import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service'
import { Router, ActivatedRoute } from '@angular/router'

const emptyUser = { result: { password: '', email: '' } };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers : [MyHttpService]
})
export class LoginComponent implements OnInit {
  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }
  email;
  password;
  err;
 ngOnInit() {
 }

 login() {
  this.myHttp.postData('http://localhost:3000/user/login',{email:this.email,password:this.password})
  .subscribe(
    data => {
      localStorage.setItem('_user_token', data.data);
      localStorage.setItem('_user_email', data.email);
      this.router.navigate(['/']);
    },
    error => {
      console.log("err",error);
      this.router.navigate(['/login']);
    }
  );
 }
}
