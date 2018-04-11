import { Component, OnInit } from '@angular/core';
import { MyHttpService } from '../../shared/services/http.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.css'],
  providers : [MyHttpService]
})
export class AddTechnologyComponent implements OnInit {
  tech:any = {
  	name:"",
  	targetAudience:0,
  	topics:[]
  };

  newTech:Object;

  constructor(private myHttp:MyHttpService, public router:Router, private route:ActivatedRoute) { }
  addTopic(){
  	this.tech.topics.push({"name":"","duration":0})
  }
  save(){
  	if(this.route.snapshot.params['id']){ 
	  	this.myHttp.putData('http://localhost:3000/technology/'+this.route.snapshot.params['id'],this.tech).subscribe(
	        data => {
	        	this.router.navigate(['/technology']);
	        }
	    );
	}else{
		this.myHttp.postData('http://localhost:3000/technology',this.tech).subscribe(
	        data => {
	        	this.router.navigate(['/technology']);
	        }
	    );
	}
  }
  ngOnInit() {
  	if(this.route.snapshot.params['id']){ 
  		this.myHttp.getData('http://localhost:3000/technology/'+this.route.snapshot.params['id']).subscribe(
	        (data:any) => {
	          this.tech = data;
	        }
	    );
  	}
  }

}
