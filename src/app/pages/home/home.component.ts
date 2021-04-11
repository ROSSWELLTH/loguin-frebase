import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticaService } from 'src/app/service/autentica.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private auth:AutenticaService,
              private router:Router ) { }

  ngOnInit(): void {
  }


  salir() {  //llama a la funcion de salir

    this.auth.logout();
    this.router.navigateByUrl('/login');

  }

}
