import { Component, OnInit, Injectable } from '@angular/core';
import { MyHttpService } from './../shared/services/http.service';

@Component({
  selector: 'app-technology',
  templateUrl: './technology.component.html',
  styleUrls: ['./technology.component.css'],
  providers:[MyHttpService]
})
export class TechnologyComponent implements OnInit {
  technology:any;
  constructor(private myHttp: MyHttpService) { 
  	
  }

  ngOnInit() {
    this.myHttp.getData('http://localhost:3000/technology/all').subscribe(
        data => {
          this.technology = data;
        }
    );
  }

  delete(id){
  	this.myHttp.deleteData('http://localhost:3000/technology/'+id).subscribe(
        data => {
        	this.myHttp.getData('http://localhost:3000/technology/all').subscribe(
		        data1 => {
		          this.technology = data1;
		        }
		    );  
        }
    );
  }

}
