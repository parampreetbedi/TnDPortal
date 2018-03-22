import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyHttpService } from './../../shared/services/http.service';


@Component({
  selector: 'app-add-trained-employee',
  templateUrl: './add-trained-employee.component.html',
  styleUrls: ['./add-trained-employee.component.css'],
  providers :[MyHttpService]
})
export class AddTrainedEmployeeComponent implements OnInit {
  trainedEmployee:any = {
    trainee:'',
    plan:'',
    trainingCompleted:2
    //starRating:,
    //feedback:''
  }
  constructor( private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute ) { }

  employees = [];
  plans = [];

  save(){
    if(this.route.snapshot.params['id']){
      this.myHttp.putData('http://localhost:3000/trained-employee/'+this.route.snapshot.params['id'], this.trainedEmployee).subscribe(
  		  (data:any) => {
          this.router.navigate(['/trained-employee']);
        }
      )
    }
    else{
      //console.log(this.trainedEmployee);
      this.myHttp.postData('http://localhost:3000/trained-employee',this.trainedEmployee).subscribe(
  		  (data:any) => {
          this.router.navigate(['/trained-employee']);
        }
      )
    }    
  }
  ngOnInit() {
    this.myHttp.getDataObservable('http://localhost:3000/employee/all').subscribe(
     (employees:any) => {
      this.employees = employees;
      this.myHttp.getDataObservable('http://localhost:3000/plan/all').subscribe(
        (plans:any) => {
          this.plans = plans;
        }
      )        
    })
    if(this.route.snapshot.params['id']){ 
      this.myHttp.getDataObservable('http://localhost:3000/trained-employee/'+this.route.snapshot.params['id']).subscribe((data:any) => {
        //console.log(data);
        this.trainedEmployee.trainee = data.trainee._id;
        this.trainedEmployee.plan = data.plan._id;
        this.trainedEmployee.trainingCompleted = data.trainingCompleted;
      })
    }    
  }
}