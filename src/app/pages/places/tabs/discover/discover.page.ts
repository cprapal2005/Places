import { AfterViewInit, Component, OnInit } from '@angular/core';
import { GestionService } from 'src/app/services/gestion.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, AfterViewInit {

  listaCasas: any;

  constructor(private gestionService: GestionService) { }

  ngAfterViewInit(): void {
    this.filtrarCasas('');
  }

  ngOnInit() {

    this.gestionService.getListaCasas().subscribe(lista =>{
      this.listaCasas = lista
    })

  }

  filtrarCasas(filtro: string) {
    this.gestionService.filtrarCasas(filtro);
  }

}
