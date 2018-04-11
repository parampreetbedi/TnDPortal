import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[MyHttpService]
})
export class EmployeeComponent implements OnInit {
  employee:any;		
  constructor(private myHttp: MyHttpService, public router:Router) { 
  	
  }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/employee/all').subscribe(
        data => {
          this.employee = data;
        }
    );
  }

  delete(id){
    this.myHttp.deleteData('http://localhost:3000/employee/'+id).subscribe(
        data => {
          this.myHttp.getData('http://localhost:3000/employee/all').subscribe(
            data1 => {
              this.employee = data1;
            }
          );
        }
    );
  }

}
