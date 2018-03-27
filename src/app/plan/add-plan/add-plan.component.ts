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
		endDate:0,//{year:0,month:0,day:0},
		trainer:"",
		isCompleted:"",
		type:""
  };

  newTech:Object;
  employee:any;
  technology:any;
	model: NgbDateStruct;
	updatePlanStatus = false;
  planStatus:any;
  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }
  // addTrainee(){
  // 	this.plan.trainee.push("");
	// }
	checkPlanStatus(event:any){		
		this.updatePlanStatus = true;
		this.planStatus = event.target.value;
	}

  save(){  	
		this.plan.startDate=this.plan.startDate.year+'-'+this.plan.startDate.month+'-'+this.plan.startDate.day;
		if(this.plan.endDate != 0){
			this.plan.endDate=this.plan.endDate.year+'-'+this.plan.endDate.month+'-'+this.plan.endDate.day;
		}		
  	if(this.route.snapshot.params['id']){ 
	  	this.myHttp.putData('http://localhost:3000/plan/'+this.route.snapshot.params['id'],this.plan).subscribe(
	        data => {
						if(this.updatePlanStatus){
							if(this.planStatus == 0){		//i.e ongoing
								this.plan.action = 'start';			
							}
							else if(this.planStatus == 1){   //i.e. completed
								this.plan.action = 'complete';
							}
							else if(this.planStatus == 2){   //i.e. upcoming
								this.plan.action = 'upcoming';
							}
							this.myHttp.patchData('http://localhost:3000/plan/'+this.route.snapshot.params['id'],this.plan).subscribe(
								data => {
									this.updatePlanStatus = false;
									this.router.navigate(['/plan']);
								}
							);
						}
						else{
							this.router.navigate(['/plan']);
						}
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
					this.plan.tech = data.tech._id;
					this.plan.startDate = new Date(data.startDate);
					this.plan.startDate = {year:this.plan.startDate.getFullYear(), month:this.plan.startDate.getMonth()+1, day:this.plan.startDate.getDate()}
					if(data.endDate == 0){
						this.plan.endDate = 0;
					}
					else{
						this.plan.endDate = new Date(data.endDate);
						this.plan.endDate = {
							year:	this.plan.endDate.getFullYear(),
							month:this.plan.endDate.getMonth()+1,
							day:	this.plan.endDate.getDate()
						}
					}						
					this.plan.trainer = data.trainer._id;
					this.plan.isCompleted = data.isCompleted;
					this.plan.type = data.type;
					// let a=[];
					// for(let train of data.trainee){
					// 	a.push(train._id);
					// }
					// this.plan.trainee = a;
				}
	    );
  	}
  }
}
