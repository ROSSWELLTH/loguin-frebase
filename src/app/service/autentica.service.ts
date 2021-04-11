import { Injectable } from '@angular/core';

import { UsuarioModel_ } from '../model/UsuarioModel';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators'; /* importar para usar el operador map */
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutenticaService {


  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty'; /* copiamos todo lo que tiene iguales los link */
  private apikey = 'AIzaSyDMNnnE4MqtDxXFqNTDH40CL8dZfVRy668';  // apikey  -> firebase ->configuracion de proyecto capitulo 173 ademy

  userToken: string='';



  // tomamos la ruta del link
  // https://firebase.google.com/docs/reference/rest/auth#section-sign-in-email-password


  constructor(private http: HttpClient) //* imoirtamos el HttpClient para realizar peticiones
   {

    // this.leerToken();
    //  crear nuevos usuarios
    //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]


    // Login
    // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


   }

   login( usuario: UsuarioModel_) {

        const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${ this.url }/verifyPassword?key=${ this.apikey }`, authData)
    .pipe(
      tap( (resp: any) => {
        // localStorage.setItem('token', resp.token )
        this.guardarToken( resp['idToken'] );
      })
    );

  }


  logout() {  //elimina el toquen
    localStorage.removeItem('token');
  }



  nuevoUsuario( usuario: UsuarioModel_ )/* importamos UsuarioModel_ */
  {
    // Correo electrónico	cuerda	El correo electrónico con el que el usuario está iniciando sesión.
    // contraseña	cuerda	La contraseña de la cuenta.
    // returnSecureToken	booleano	Si se debe devolver o no un identificador y un token de actualización. Siempre debe ser verdad.


    const authData = {
      ...usuario,   // si el correo y la contraseña viene en el arreglo del usuario se coloca ...usuario si no se declara las variable y se le asigna el campo
      returnSecureToken: true  //lo inicializamos hasta enviarlo de la respuesta del pormulario
    };

// realizamos la peticion
    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,  authData  /* enviamos la informacion */
    )
    .pipe(
      tap( (resp: any) => {
        // localStorage.setItem('token', resp.token )
        this.guardarToken( resp['idToken'] );
      })
    );

  }

  private guardarToken( idToken: any ) {  // grabo en el localstarore del  navegador el token obtenido

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds( 3600 );

    localStorage.setItem('expira', hoy.getTime().toString() );


  }



  leerToken() { // busco en el localstarore del  navegador el token guardado

    const chara =localStorage.getItem('token');

    if ( localStorage.getItem('token') ) {
      // this.userToken = localStorage.getItem('token');
      this.userToken = localStorage.getItem('token')|| '';

    } else {
      this.userToken = '';
    }

    return this.userToken;

  }





  estaAutenticado(): boolean {

    console.log("este es el token "+this.userToken.length )

    if ( this.userToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }


  }

     // respuesta del autenticacion

      // {
      //   "idToken": "[ID_TOKEN]",
      //   "email": "",
      //   "refreshToken": "[REFRESH_TOKEN]",
      //   "expiresIn": "3600",
      //   "localId": "Jws4SVjpT..."
      // }






}
