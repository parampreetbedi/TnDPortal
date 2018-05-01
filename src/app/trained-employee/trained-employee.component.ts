import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-trained-employee',
  templateUrl: './trained-employee.component.html',
  styleUrls: ['./trained-employee.component.css'],
  providers: [MyHttpService]
})
export class TrainedEmployeeComponent implements OnInit {

  trainedEmployees : any;
  constructor(private myHttp: MyHttpService, public router:Router, public route:ActivatedRoute ) { }

  delete(id){
  	this.myHttp.deleteData('http://localhost:3000/trained-employee/'+id).subscribe(
  		data1 => {
  			this.myHttp.getData('http://localhost:3000/trained-employee/all').subscribe(
		        data => {
		          this.trainedEmployees = data;
		        }
		    );
  		}
  	)
  }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/trained-employee/all').subscribe(
      data => {
        this.trainedEmployees = data;
      }
    );
    
  }
}