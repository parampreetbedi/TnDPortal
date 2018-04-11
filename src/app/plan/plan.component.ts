import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.css'],
  providers:[MyHttpService]
})
export class PlanComponent implements OnInit {
  plan:any;
  constructor(private myHttp: MyHttpService) { 
  	
  }
  delete(id){
  	this.myHttp.deleteData('http://localhost:3000/plan/'+id).subscribe(
  		data1 => {
  			this.myHttp.getData('http://localhost:3000/plan/all').subscribe(
		        data => {
		          this.plan = data;
		        }
		    );
  		}
  	)
  }
  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/plan/all').subscribe(
        data => {
          this.plan = data;
        }
    );
  }
}
