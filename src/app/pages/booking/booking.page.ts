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
  listaBookings: any = {};

  constructor(private router: Router, private gestionService: GestionService) { }

  ngOnInit() {
    this.inicioSesion = this.gestionService.conectado;
    this.gestionService.getBookings().subscribe((response => {
      
    }))
  }

  iniciarSesion() {
    this.router.navigate(['/auth']);
  }

}
