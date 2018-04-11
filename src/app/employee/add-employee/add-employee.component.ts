import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
  providers : [MyHttpService]
})
export class AddEmployeeComponent implements OnInit {
  tech:any = {
  	name:"",
  	targetAudience:0,
  	topics:[]
  };

  newTech:Object;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  save(){
  	if(this.route.snapshot.params['id']){ 
	  	this.myHttp.putData('http://localhost:3000/employee/'+this.route.snapshot.params['id'],this.tech).subscribe(
	        data => {
	        	this.router.navigate(['/employee']);
	        }
	    );
	}else{
		this.myHttp.postData('http://localhost:3000/employee',this.tech).subscribe(
	        data => {
	        	this.router.navigate(['/employee']);
	        }
	    );
	}
  }
  ngOnInit() {
  	if(this.route.snapshot.params['id']){ 
  		this.myHttp.getData('http://localhost:3000/employee/'+this.route.snapshot.params['id']).subscribe(
	        (data:any) => {
	          this.tech = data;
	        }
	    );
  	}
  }

}
