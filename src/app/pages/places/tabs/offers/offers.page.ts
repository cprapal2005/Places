import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionService } from 'src/app/services/gestion.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  inicioSesion = false;

  constructor(private router: Router, private route: ActivatedRoute, private gestionService: GestionService) { }

  ngOnInit() {
    this.inicioSesion = this.gestionService.conectado;
  }

  nuevaOferta() {
    this.router.navigate(['new-offer'], {relativeTo: this.route});
  }

  iniciarSesion() {
    this.router.navigate(['/auth']);
  }

}
