import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router'
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css'],
  providers: [MyHttpService]
})
export class AddAttendanceComponent implements OnInit {
  attendance: any = {
    plan: '',
    classDate: new Date(),
    classConducted: 0,
    traineesPresent: []
  };
  users = [];

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  save() {
    if (this.route.snapshot.routeConfig.path == 'attendance/edit/:id') {
      this.myHttp.putData('http://localhost:3000/attendance/' + this.route.snapshot.params['id'], this.attendance).subscribe(
        data => {
          this.router.navigate(['/attendance']);
        }
      );
    } else if(this.route.snapshot.routeConfig.path == 'attendance/add/:id'){
      this.attendance.plan = this.route.snapshot.params['id'];
      this.attendance.classDate=this.attendance.classDate.year+'-'+this.attendance.classDate.month+'-'+this.attendance.classDate.day;
      this.myHttp.postData('http://localhost:3000/attendance', this.attendance).subscribe(
        data => {
          this.router.navigate(['/attendance']);
        }
      );
    }
  }

  ngOnInit() {
    this.myHttp.getDataObservable('http://localhost:3000/trained-employee/?plan='+this.route.snapshot.params['id']).subscribe(
			data => {
        this.attendance.traineesPresent = data;
        Promise
          .all(
            this.attendance.traineesPresent.map(
              tId => this.getEmployees(this, tId)
          ))
          .then((results:any) => {
            this.attendance.traineesPresent = [];
            this.users = results;
          })
        //this.attendance.traineesPresent = data;
				//this.tempTrainees = this.attendance.trainees;
      }
    )
	  
    if(this.route.snapshot.routeConfig.path == 'attendance/edit/:id'){
      // this.myHttp.getDataObservable('http://localhost:3000/attendance/'+this.route.snapshot.params['id']).subscribe(
      //     (data:any) => {
      //       this.attendance.plan = data.plan;
      //       this.attendance.date = new Date(data.date);
      //       this.attendance.classConducted = data.classConducted;
      //       //this.attendance.traineesPresent = data.traineesPresent;
      //     }
      //   );
      console.log('edit/id');
    }
  }
  
  getEmployees(thisObj,tId){
    var promise = new Promise((resolve, reject) => {
      thisObj.myHttp.getDataObservable('http://localhost:3000/employee/'+tId).subscribe(
        (data:any) => {
          resolve(data);
        })
    })
    return promise;
  }

  getPresentEmployees(){

  }
}