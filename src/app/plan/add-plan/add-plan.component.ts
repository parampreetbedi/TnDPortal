import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyHttpService } from './../../shared/services/http.service';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-plan',
  templateUrl: './add-plan.component.html',
  styleUrls: ['./add-plan.component.css'],
  providers :[MyHttpService]
})
export class AddPlanComponent implements OnInit {

  plan:any = {
  	tech:"",
  	startDate:{year:0,month:0,day:0},
  	trainer:"",
  	trainee:[]
  };

  newTech:Object;
  employee:any;
  technology:any;
  model: NgbDateStruct;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }
  addTrainee(){
  	this.plan.trainee.push("");
  }
  save(){  	
  	this.plan.startDate=this.plan.startDate.year+'-'+this.plan.startDate.month+'-'+this.plan.startDate.day;
  	//console.log("this.plan",this.plan)
  	if(this.route.snapshot.params['id']){ 
	  	this.myHttp.putData('http://localhost:3000/plan/'+this.route.snapshot.params['id'],this.plan).subscribe(
	        data => {
	        	this.router.navigate(['/plan']);
	        }
	    );
	}else{
		this.myHttp.postData('http://localhost:3000/plan',this.plan).subscribe(
	        data => {
	        	this.router.navigate(['/plan']);
	        }
	    );
	}
  }
  ngOnInit() {
  	this.myHttp.getDataObservable('http://localhost:3000/employee/all').subscribe(
  		(user:any) => {
          this.employee = user;
          this.myHttp.getDataObservable('http://localhost:3000/technology/all').subscribe(
	  		(tech:any) => {
	          this.technology = tech;
	        }
		  );
        }
	);
  	if(this.route.snapshot.params['id']){ 
  		this.myHttp.getDataObservable('http://localhost:3000/plan/'+this.route.snapshot.params['id']).subscribe(
	        (data:any) => {
						//console.log(data);
	          this.plan.tech = data.tech._id;
	          this.plan.startDate = new Date(data.startDate);
	          this.plan.startDate = {year:this.plan.startDate.getFullYear(), month:this.plan.startDate.getMonth()+1, day:this.plan.startDate.getDate()}
	          //console.log("this.plan.startDate",this.plan.startDate)
	          this.plan.trainer = data.trainer._id;
	          let a=[];
	          for(let train of data.trainee){
	          	a.push(train._id);
	          }
	          this.plan.trainee = a;
	        }
	    );
  	}
  }
}
