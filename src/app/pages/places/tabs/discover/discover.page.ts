import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private gestionService: GestionService, private router: Router, private route: ActivatedRoute) { }

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

  detallesCasa(casa: any) {
    this.router.navigate(['places/tabs/discover/place-detail', casa]);
  }

}
