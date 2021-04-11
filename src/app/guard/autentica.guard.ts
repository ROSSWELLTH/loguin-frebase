
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AutenticaService } from '../service/autentica.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private auth: AutenticaService, /* importamos servicio */
               private router: Router) {}

  canActivate(): boolean  {

    if ( this.auth.estaAutenticado() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
