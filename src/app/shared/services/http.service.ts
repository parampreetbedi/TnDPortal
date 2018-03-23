import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable()
export class MyHttpService {
constructor(private http:HttpClient) {}

	getDataObservable(url) {
	  return this.http.get(url);
	}
	postData(url,data) {
	  return this.http.post<any>(url,data);
	}
	putData(url,data) {
	  return this.http.put(url,data);
	}
	deleteData(url) {
	  return this.http.delete(url);
	}
	patchData(url,data){
		return this.http.patch(url,data);
	}
}