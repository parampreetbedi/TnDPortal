import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { environment } from '../../../environments/environment';
// import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
// import * as socketIo from 'socket.io-client';

@Injectable()
export class RouteGuard implements CanActivate {
  //socket: any;
  private headers: Headers = new Headers();

  constructor(
    private router: Router
  ) {

    // this.headers.append('authorization', 'Bearer ' + localStorage.getItem('_token'));

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    if (localStorage.getItem('_user_token')) {
      //console.log("user exists");
      return true;


      // this.http.get(environment.baseUrl + 'user/getMe', {headers: this.headers})
      //   .map((response: Response) => response.json())
      //   .subscribe(
      //     data => {
      //       if (data) {
      //         return true;
      //       }
      //     },
      //     error => {
      //       // not logged in so redirect to login page with the return url
      //       this.router.navigate(['/login']);
      //       return false;
      //     }
      //   );
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login']);
    return false;
  }

  // private handleError(error): void {

  //   this.router.navigate(['error_page'], { queryParams: { errorCode: error.status } });
  // }

}
