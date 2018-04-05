import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router'
import { getHostElement } from '@angular/core/src/render3';
import { Location } from '@angular/common';

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
  users :any;
  trainees :any;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute, private location: Location) { }

  save() {
    if(this.attendance.classConducted == 1){
      this.attendance.traineesPresent = [];
    }
    this.attendance.classDate=this.attendance.classDate.year+'-'+this.attendance.classDate.month+'-'+this.attendance.classDate.day;
    if (this.route.snapshot.routeConfig.path == 'attendance/view/:id/edit/:id2') {
      this.myHttp.putData('http://localhost:3000/attendance/'+this.route.snapshot.params['id'],this.attendance).subscribe(
        data => {
          this.location.back();
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
        this.trainees = data;
        Promise
          .all(
            this.trainees.map(
              tId => this.getEmployees(this, tId)
          ))
          .then((results:any) => {
            this.users = results;
            if(this.route.snapshot.routeConfig.path == 'attendance/view/:id/edit/:id2'){
              this.myHttp.getDataObservable('http://localhost:3000/attendance/'+this.route.snapshot.params['id2']).subscribe(
                (data:any) => {
                  console.log(data);
                  this.attendance.plan = data.plan;
                  this.attendance.classDate = new Date(data.date);
                  this.attendance.classDate = {
                    year:	this.attendance.classDate.getFullYear(),
                    month:this.attendance.classDate.getMonth()+1,
                    day:	this.attendance.classDate.getDate()
                  }
                  this.attendance.classConducted = data.classConducted;
                  if(this.attendance.classConducted == 1){
                    this.attendance.traineesPresent = [];
                  }else{
                    this.attendance.traineesPresent = data.traineesPresent;
                  }
                  console.log(this.attendance)
                }
              );
            }
          })
      }
    )    
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