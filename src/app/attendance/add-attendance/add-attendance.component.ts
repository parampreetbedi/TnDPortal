import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-attendance',
  templateUrl: './add-attendance.component.html',
  styleUrls: ['./add-attendance.component.css'],
  providers: [MyHttpService]
})
export class AddAttendanceComponent implements OnInit {
  attendance: any = {
    plan: '',
    date: new Date(),
    classConducted: 0,
    traineesPresent: []
  };
  plans = [];
  trainees = [];


  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  addTrainee(){
  	this.attendance.traineesPresent.push("");
  }

  save() {
    if (this.route.snapshot.params['id']) {
      this.myHttp.putData('http://localhost:3000/attendance/' + this.route.snapshot.params['id'], this.attendance).subscribe(
        data => {
          this.router.navigate(['/employee']);
        }
      );
    } else {
      this.myHttp.postData('http://localhost:3000/attendance', this.attendance).subscribe(
        data => {
          this.router.navigate(['/employee']);
        }
      );
    }
  }
  ngOnInit() {
    this.myHttp.getDataObservable('http://localhost:3000/employee/all').subscribe(
  		(user:any) => {
          this.plans = user;
          console.log(user);
          this.myHttp.getDataObservable('http://localhost:3000/technology/all').subscribe(
	  		  (tech:any) => {
	          //this.technology = tech;
	        }
		    );
      }
	  );
    if(this.route.snapshot.params['id']){ 
      this.myHttp.getDataObservable('http://localhost:3000/attendance/'+this.route.snapshot.params['id']).subscribe(
          (data:any) => {
            this.attendance.plan = data.plan;
            this.attendance.date = new Date(data.date);
            this.attendance.classConducted = data.classConducted;
            this.attendance.traineesPresent = data.classConducted;


            // this.plan.startDate = new Date(data.startDate);
            // this.plan.startDate = {year:this.plan.startDate.getFullYear(), month:this.plan.startDate.getMonth()+1, day:this.plan.startDate.getDate()}
            // console.log("this.plan.startDate",this.plan.startDate)
            // this.plan.trainer = data.trainer._id;
            // let a=[];
            // for(let train of data.trainee){
            //   a.push(train._id);
            // }
            // this.plan.trainee = a;
          }
      );
    }
  }  
}
