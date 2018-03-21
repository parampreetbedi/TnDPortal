import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers : [MyHttpService]
})
export class RegisterComponent implements OnInit {
  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }
  email;
  password;
  err;
  register() {
    this.myHttp.postData('http://localhost:3000/user/register',{email:this.email,password:this.password}).subscribe(
      data => {
        this.router.navigate(['/']);
      },
      error => {
        this.router.navigate(['/register']);
      }
  );
  }

  ngOnInit() {
  }
}
