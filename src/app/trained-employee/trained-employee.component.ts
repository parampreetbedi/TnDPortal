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

  ngOnInit() {
    this.myHttp.getDataObservable('http://localhost:3000/trained-employee/all').subscribe(
      data => {
        this.trainedEmployees = data;
        //console.log(data);
      }
    );
    
  }
}