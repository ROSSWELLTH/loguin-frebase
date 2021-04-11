import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/autentica.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
console.log('entre');

const routes: Routes = [

  { path: 'home' , component: HomeComponent,  /* importar  */
  canActivate: [ AuthGuard ] }, // valida si esta autenticado para llegar a esa ruta
  { path: 'registro', component: RegistroComponent },/* importar  */
  { path: 'login'   , component: LoginComponent },/* importar  */
  { path: '**', redirectTo: 'registro' }/* redirige por defecto  */


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
