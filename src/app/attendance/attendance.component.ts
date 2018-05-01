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
    this.myHttp.getData('http://localhost:3000/plan/attendance').subscribe(
      data => {
        this.plans = data;
        Promise
          .all(
            this.plans.map(
              plan => this.getEmployees(this, plan)
          )).then(employees => {
            this.plans = employees
          })
      }
    );
  }

  getEmployees(thisObj,plan){
    var promise = new Promise((resolve, reject) => {
      thisObj.myHttp.getData('http://localhost:3009/employees/empDetailBriefId/'+plan.trainer).subscribe(
        (data:any) => {
          plan.trainer = data.fld_empFirstName+' '+data.fld_empLastName;
          resolve(plan);
        })
    })
    return promise;
  }
}