import {Injectable} from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = {user: 'Dspot', pass: 'AngularTest', email: 'dSpot@gmail.com'};

  constructor() {
  }

  login(form) {
    if (form.user === this.user.user) {
      if (form.pass === this.user.pass) {
        localStorage.setItem('access_token', btoa('Dspot'));
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
          title: 'Autenticación Fallida!',
          text: 'Contraseña incorrecta',
        });
      }
    }
    else {
      Swal({
        type: 'error',
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
  }
}
