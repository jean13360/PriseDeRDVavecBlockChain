    import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    message: string;
    idLogin:string = '012345678B';
    constructor(public authService: AuthService, public router: Router) {
        this.setMessage();
    }

    setMessage() {
        this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
    }

    loginInternaute() {
        this.login('I');
    }
    loginConseiller() {
        this.login('C');
    }
    loginEmployeur() {
        this.login('E');
    }

      login(mode: any) {
        this.message = 'Trying to log in ...';

        this.authService.verifieLogin(this.idLogin).then(
            msg => {
                if (msg) {
                      this.setMessage();   this.router.navigate([ '/agenda1/' + this.idLogin]);
                }
            }
        );

      }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}