import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { GestionService } from 'src/app/services/gestion.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  formularioPrincipal!: FormGroup;
  email?: any;
  password?: any;
  conectado:boolean = false;

  constructor(private router: Router, private alertController:AlertController, private gestionService: GestionService) {
    this.formularioPrincipal = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.maxLength(50)]),
      password: new FormControl("", [Validators.required, Validators.maxLength(50), Validators.minLength(7)])
    })
    
  }

  ngOnInit() {
    this.conectado = this.gestionService.conectado;
  }

  login() {
    
    if (!this.email || !this.password || this.email.length > 50 || this.password.length > 50 || this.password.length < 7){
      this.mostrarAlerta( "Error", "Validación Incorrecta",["OK"]);
    }
    else{
      this.gestionService.iniciarSesion({email:this.email, password: this.password})
    }
    
  }

  private async mostrarAlerta(header_param:string,message_param:string,buttons_param:any[]) {
    const alert = await this.alertController.create({
        header: header_param,
        message: message_param,
        buttons: buttons_param
    });

    await alert.present();
  }

}
