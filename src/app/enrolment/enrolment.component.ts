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

  need:any;
  ongoing:any;
  completed:any;
  upcoming:any;
  
  constructor(private myHttp: MyHttpService, public router:Router) { }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/plan/need').subscribe(
      data => {
        this.need = data;
        Promise.all(
          this.need.map(
            emp => this.getEmployees(this, emp)
          )
        ).then(
          result => this.need = result
        )
        this.myHttp.getData('http://localhost:3000/plan/completed').subscribe(
          completed => {
            this.completed = completed;
            Promise.all(
              this.completed.map(
                emp => this.getEmployees(this, emp)
              )
            ).then(
              result => this.completed = result
            )
            this.myHttp.getData('http://localhost:3000/plan/ongoing').subscribe(
              ongoing => {
                this.ongoing = ongoing;
                Promise.all(
                  this.ongoing.map(
                    emp => this.getEmployees(this, emp)
                  )
                ).then(
                  result => this.ongoing = result
                )
                this.myHttp.getData('http://localhost:3000/plan/upcoming').subscribe(
                  upcoming => {
                    this.upcoming = upcoming;
                    Promise.all(
                      this.upcoming.map(
                        emp => this.getEmployees(this, emp)
                      )
                    ).then(
                      result => this.upcoming = result
                    )
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
        this.myHttp.getData('http://localhost:3000/plan/need').subscribe(
          data1 => {
            this.need = data1;
            this.router.navigate(['/']);
          }
        );
      }
    );
  }

  enroll(id) {
    this.myHttp.getData('http://localhost:3000/plan/need').subscribe(
      data2 => {
        this.need = data2;
      }
    );
  }

  getEmployees(thisObj,emp){
    var promise = new Promise((resolve, reject) => {
      thisObj.myHttp.getData('http://localhost:3009/employees/empDetailBriefId/'+emp.trainer).subscribe(
        (data:any) => {
          emp.trainer = data.fld_empFirstName+' '+data.fld_empLastName
          resolve(emp);
        })
    })
    return promise;
  }
}
