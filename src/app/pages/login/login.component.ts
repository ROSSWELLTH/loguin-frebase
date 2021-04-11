import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AutenticaService } from 'src/app/service/autentica.service';
import { UsuarioModel_ } from 'src/app/model/UsuarioModel';
import Swal from 'sweetalert2'; /* importamos el formulario */
import { map } from 'rxjs/operators'; /* importar para usar el operador map */
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel_ = new UsuarioModel_();
  recordarme = false;

  constructor( private auth: AutenticaService,
               private router:Router ) { }

  ngOnInit() {

    if ( localStorage.getItem('email') ) { // si esta guardado en el localstorague  colocarlo en memoria

      this.usuario.email = localStorage.getItem('email') || '';   //GUARGA EL email para tenerlo recordado
      this.recordarme = true;
    }

  }

  login( form: NgForm ) {

    if (  form.invalid ) { return; }

    Swal.fire({
      text: 'Espere por favor...',
      icon: 'info',
      confirmButtonText: 'cerrar'
    });
    Swal.showLoading();

    this.auth.login( this.usuario )
      .subscribe( resp => {

        console.log(resp);

        Swal.close();

        if ( this.recordarme ) {  // si recordarme esta en true guardarlo en local storague
          localStorage.setItem('email', this.usuario.email);
        }


        this.router.navigateByUrl('/home');

      }, (err) => {

        console.log(err.error.error.message);
        Swal.fire({
          text: 'Error al autenticar',
          icon: 'error',
          confirmButtonText: err.error.error.message
      });
        });
      };


}

