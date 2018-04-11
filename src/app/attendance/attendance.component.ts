import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css'],
  providers:[MyHttpService]
})
export class AttendanceComponent implements OnInit {
  attendance:any;
  plans:any;
  constructor(private myHttp: MyHttpService, public router:Router) { }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/plan/ongoing').subscribe(
      data => {
        this.plans = data;
      }
    );
  }
}
