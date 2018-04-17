import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyHttpService } from './../../shared/services/http.service';

@Component({
  selector: 'app-view-employee-attendance',
  templateUrl: './view-employee-attendance.component.html',
  styleUrls: ['./view-employee-attendance.component.css'],
  providers: [MyHttpService]
})
export class ViewEmployeeAttendanceComponent implements OnInit {

  employeeAttendance:any = {
    //classDate:'',
    plan:'',
    trainee:''
  };
  plans = [];
  trainees = [];
  planAttendances = [];
  traineeAttendances = [];
  attendances = [];
  //disableTrainees = true;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    // this.employeeAttendance.classDate = new Date();
    // this.employeeAttendance.classDate = {
    //   year:	this.employeeAttendance.classDate.getFullYear(),
    //   month:this.employeeAttendance.classDate.getMonth()+1,
    //   day:	this.employeeAttendance.classDate.getDate()
    // }
    this.myHttp.getData('http://localhost:3000/plan/attendance').subscribe((data:any) => {
      this.plans = data;
    })
  }

  loadTraineesAndPlanAttendance(event){
    //this.disableTrainees = false;
    this.trainees = [];
    this.attendances = [];
    this.myHttp.getData('http://localhost:3000/trained-employee?plan='+event.target.value+'&data=all').subscribe((data:any) => {
      this.trainees = data;
      this.myHttp.getData('http://localhost:3000/attendance?plan='+this.employeeAttendance.plan+'&classConducted=0').subscribe((data1:any) => {
        console.log(data1);
        this.planAttendances = data1;
      })
    })
  }

  loadTraineeAttendance(event){    
    this.myHttp.getData('http://localhost:3000/attendance?plan='+this.employeeAttendance.plan+'&trainee='+event.target.value).subscribe((data:any) => {
      console.log(data);
      this.traineeAttendances = data;
      this.attendances = [];
      this.planAttendances.forEach((plAtt) => {
        let flag = 0;
        this.traineeAttendances.forEach((trAtt) => {
          if(plAtt.date == trAtt.date){
            flag = 1;
          }
        })
        if(flag == 1){
          this.attendances.push({
            date: plAtt.date,
            classAttended: 'Present'
          })
        }
        else{
          this.attendances.push({
            date: plAtt.date,
            classAttended: 'Absent'
          })
        }
      })
    })
  }
}