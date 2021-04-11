import { Component, OnInit } from '@angular/core';

import {NgForm} from '@angular/forms'; /* importamos el formulario */
import { Router } from '@angular/router';
import { UsuarioModel_ } from 'src/app/model/UsuarioModel';/* importamos el formulario */
import { AutenticaService } from 'src/app/service/autentica.service';
import Swal from 'sweetalert2'; /* importamos el formulario */

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel_={ /* importamnos el arreglo de usuario y lo inicializamos */

    email:'',
    nombre:'',
    password:''
  };

  recordarme = false;

  constructor( private auth:AutenticaService, /* importamos servicio */
               private route:Router)  /* importamos servicio */
               { }




  ngOnInit(): void {
    this.usuario = new UsuarioModel_(); /* al inicial tomamos un nuevo arreglo de usuario */


  }

  onSubmit( form: NgForm ) {

    console.log(form) /* form contiene toda la informacion del formulario */
    if ( form.invalid ) { return; } /* si los campos requeridos lo recibe vacio la propiedad invali estara en true */


    Swal.fire({  /* importar llibreria despuedes de instalarla  */
      allowOutsideClick:false,   /*  quera qye no se quite el mensaje si preciona click afuera */
  // title: 'Error!',
  text: 'Espere por favor...',
  icon: 'info',
  confirmButtonText: 'cerrar'
})

 Swal.showLoading();  /*loading hsta que ejecute  Swal.close(); */

 this.auth.nuevoUsuario( this.usuario )
      .subscribe( resp => {

        console.log(resp);
        Swal.close();

        if ( this.recordarme ) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.route.navigateByUrl('/home'); /* lleva a la pagina principal al autenticar*/

      }, (err) => {
        console.log(err.error.error.message); //error al autenticar
        Swal.fire({

            text: 'Error al autenticar',
            icon: 'error',
            confirmButtonText: err.error.error.message
        });
      });


      // respuesta del autenticacion

      // {
      //   "idToken": "[ID_TOKEN]",
      //   "email": "",
      //   "refreshToken": "[REFRESH_TOKEN]",
      //   "expiresIn": "3600",
      //   "localId": "Jws4SVjpT..."
      // }


  }

}
