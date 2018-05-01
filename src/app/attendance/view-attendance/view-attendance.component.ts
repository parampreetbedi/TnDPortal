import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css'],
  providers: [MyHttpService]
})
export class ViewAttendanceComponent implements OnInit {

  attendance:any = {
    plan:'',
    date:{year:0,month:0,day:0},
    classConducted:0,
    traineesPresent:[],
  }
  attendances:any;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/attendance?plan='+this.route.snapshot.params['id']).subscribe(
      data => {
        this.attendances = data;
        Promise
          .all(
            this.attendances.map(
              atnd => this.getAttendance(this, atnd)
          ))
          .then((results:any) => {
            this.attendances = results;
          })
      }
    );
  }
  getAttendance(thisObj, atnd){
    var promise = new Promise((resolve, reject) => {
      Promise.all( atnd.traineesPresent.map(
        trainee => thisObj.getEmployees(thisObj, trainee)
      )).then(tp => {
        atnd.traineesPresent = tp;
        resolve(atnd)
      })
    })
    return promise;
  }

  getEmployees(thisObj,tId){
    var promise = new Promise((resolve, reject) => {
      thisObj.myHttp.getData('http://localhost:3009/employees/empDetailBriefId/'+tId).subscribe(
        (data:any) => {
          tId = data.fld_empFirstName+' '+data.fld_empLastName
          resolve(tId);
        })
    })
    return promise;
  }
}
