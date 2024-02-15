import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionService } from 'src/app/services/gestion.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  inicioSesion = false;
  listaBookings: Array<any> = [];

  constructor(private router: Router, private gestionService: GestionService) { }

  ngOnInit() {
    this.inicioSesion = this.gestionService.conectado;
    if(this.gestionService.conectado) {
      this.gestionService.getBookings().subscribe((response => {
        this.listaBookings = response;
      }))
    }
    
  }

  iniciarSesion() {
    this.router.navigate(['/auth']);
  }

}
