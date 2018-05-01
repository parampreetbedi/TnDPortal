import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers:[MyHttpService]
})
export class PlanComponent implements OnInit {
  plans:any;
  constructor(private myHttp: MyHttpService) { 
  	
  }
  delete(id){
  	this.myHttp.deleteData('http://localhost:3000/plan/'+id).subscribe(
  		data1 => {
  			this.myHttp.getData('http://localhost:3000/plan/all').subscribe(
		        data => {
		          this.plans = data;
		        }
		    );
  		}
  	)
  }
  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/plan/all').subscribe(
      data => {
        this.plans = data;
        Promise.all(									//delete previous trainees
          this.plans.map(
            plan => this.populateTrainer(plan,this)
          )
        ).then(updatedData => {
          this.plans = updatedData;
        })
      }
    );
  }

  populateTrainer(plan, thisObj) {
    var promise = new Promise((resolve, reject) => {
      thisObj.myHttp.getData('http://localhost:3009/employees/empDetailBriefId/'+plan.trainer).subscribe(
        data1 => {
          plan.trainer = data1.fld_empFirstName+' '+data1.fld_empLastName;
          resolve(plan);
        }
      )
    })
    return promise;    
  }
}
