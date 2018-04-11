import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-feedback',
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.css'],
  providers: [MyHttpService]
})
export class AddFeedbackComponent implements OnInit {

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }

  trainedEmployee : any = {
    _id : '',
    startRating: '',
    feedback: ''
  }

  ngOnInit() { }

  save(){
    this.trainedEmployee._id = this.route.snapshot.params['id'];
    this.myHttp.patchData('http://localhost:3000/trained-employee',this.trainedEmployee).subscribe(
      data => {
        this.router.navigate(['/plan']);
    })
  }
}
