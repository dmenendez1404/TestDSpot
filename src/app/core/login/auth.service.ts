import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userActive$ = new BehaviorSubject<any>({user: 'Dspot', pass: 'AngularTest', email: 'dSpot@gmail.com'});
  user;
  constructor(private router: Router) {
    this.userActive$.subscribe((user) => {
      this.user = user;
    });
  }

  login(form) {

    if (form.user === this.user.user) {
      if (form.pass === this.user.pass) {
        localStorage.setItem('access_token', btoa('Dspot'));
        this.router.navigate(['/dashboard']);
        Swal({
          position: 'top-end',
          type: 'success',
          title: 'Autenticación Satisfactoria',
          text: 'Se ha autenticado correctamente',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        Swal({
          type: 'error',
          position: 'top-end',
          title: 'Autenticación Fallida!',
          text: 'Contraseña incorrecta',
        });
      }
    }
    else {
      Swal({
        type: 'error',
        position: 'top-end',
        title: 'Autenticación Fallida!',
        text: 'El usuario no existe',
      });
    }
  }

  isAuthenticated() {
    const token = localStorage.getItem('access_token');
    if (token) {
      return true;
    }
    this.logout();
    return false;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getMemberActive() {
    return this.userActive$;
  }

  updateUser(user) {
    this.userActive$.next(user);
  }
  changePass(pass){
    this.user.pass = pass;
    this.userActive$.next(this.user);
  }
}
