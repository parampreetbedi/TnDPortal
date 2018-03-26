import { Component, OnInit } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-enrolment',
  templateUrl: './enrolment.component.html',
  styleUrls: ['./enrolment.component.css'],
  providers:[MyHttpService]
})
export class EnrolmentComponent implements OnInit {


  dashboard:any;
  ongoing:any;
  completed:any;
  upcoming:any;
  constructor(private myHttp: MyHttpService, public router:Router) { 
  	
  }

  ngOnInit() {
    this.myHttp.getDataObservable('http://localhost:3000/plan/need').subscribe(
        data => {
          //console.log(data);
          this.dashboard = data;
          this.myHttp.getDataObservable('http://localhost:3000/plan/completed').subscribe(
            completed => {
              this.completed = completed;
                this.myHttp.getDataObservable('http://localhost:3000/plan/ongoing').subscribe(
                  ongoing => {
                    this.ongoing = ongoing;
                    this.myHttp.getDataObservable('http://localhost:3000/plan/upcoming').subscribe(
                      upcoming => {
                        this.upcoming = upcoming;
                      }
                    );
                  }
                );
              }
             );
            }
          );
        }

  delete(id){
  	this.myHttp.deleteData('http://localhost:3000/plan/'+id).subscribe(
        data => {
        	this.myHttp.getDataObservable('http://localhost:3000/plan/need').subscribe(
		        data1 => {
		          this.dashboard = data1;
		        }
		    );  
      }
    );
  }

  enroll(id) {
    //alert('http://localhost:3000/plan/'+id)
    this.dashboard.action = 'enroll';
    this.myHttp.patchData('http://localhost:3000/plan/'+id,this.dashboard).subscribe(
        data1 => {
          this.myHttp.getDataObservable('http://localhost:3000/plan/need').subscribe(
            data2 => {
              this.dashboard = data2;
            }
          );  
        }
    );
  }
}
