import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionService } from 'src/app/services/gestion.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  public casaDetalles: any;

  constructor(private route: ActivatedRoute, private router: Router, private gestionService: GestionService) {

    this.casaDetalles = {
      _id: "",
      titulo : "",
      descripcion : "",
      direccion : "",
      ciudad : "",
      pais : "",
      precio : "",
      nombreOwner : "",
      user_id : "",
    }

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      
      this.casaDetalles = {
        _id: params['_id'],
        titulo : params['titulo'],
        descripcion : params['descripcion'],
        direccion : params['direccion'],
        ciudad : params['ciudad'],
        pais : params['pais'],
        precio : params['precio'],
        nombreOwner : params['nombreOwner'],
        user_id : params['user_id'],
      }

    });
  }

  realizarReserva() {

    if(this.gestionService.conectado) {

      this.gestionService.reservarCasa(this.casaDetalles).subscribe((response) => {
        if(!response.error || response!=null) this.router.navigate(['/booking']);
      })

    }

    else this.router.navigate(['/auth']);

  }

}
