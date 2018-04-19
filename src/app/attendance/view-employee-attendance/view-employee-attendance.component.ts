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
    plan:'',
    trainee:''
  };
  plans = [];
  trainees = [];
  attendances = [];

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/plan/attendance').subscribe((data:any) => {
      this.plans = data;
    })
  }

  loadTraineesAndPlanAttendance(event){
    this.trainees = [];
    this.attendances = [];
    this.employeeAttendance.trainee = "";
    this.myHttp.getData('http://localhost:3000/trained-employee?plan='+event.target.value+'&data=all').subscribe((data:any) => {
      this.trainees = data;
    })
  }

  loadTraineeAttendance(event){    
    this.myHttp.getData('http://localhost:3000/attendance?plan='+this.employeeAttendance.plan+'&trainee='+event.target.value).subscribe((data:any) => {
      console.log(data);
      this.attendances = data;
    })
  }
}