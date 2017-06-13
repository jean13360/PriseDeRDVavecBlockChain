  import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
@Injectable()
export class AuthService {
  constructor(private http: Http) { }

  isLoggedIn: boolean = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(typeLogin): Observable<boolean> {
    return Observable.of(true).delay(1000).do(val => this.verifieLogin(typeLogin));
  }

  logout(): void {
    this.isLoggedIn = false;
  }

   verifieLogin(typeLogin): Promise<boolean> {

      return this.http.get('http://localhost:8888/login?id=' + typeLogin)
               .toPromise()
               .then(response => {
                 this.isLoggedIn = true;
                 return true;
               }
              ).catch (this.handleError);

   }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
