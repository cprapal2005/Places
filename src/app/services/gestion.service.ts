import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestionService {

  public conectado: boolean = false;
  public usuario: any;
  private listaCasas!: Array<any>
  private $listaCasas: BehaviorSubject<any> = new BehaviorSubject<any>(this.listaCasas);

  constructor(private httpService: HttpService, private router: Router) {
    this.listaCasas = [];
    this.$listaCasas.next(this.listaCasas);
  }

  iniciarSesion(usuario: any): boolean {
    this.httpService.postLogin(usuario).subscribe((respuesta) => {
      if(respuesta!=null) {
        usuario = respuesta.user;
        this.httpService.jwtToken = respuesta.token; 
        this.conectado = true;
        this.router.navigate(['/places/tabs/discover']);
      }
    })
    return this.conectado;
  }

  filtrarCasas(filtro:string){
    if (filtro !== '') {
      const especializacionesFiltradas = this.listaCasas.filter(especializacion =>
          especializacion.nombre.toLowerCase().includes(filtro.toLowerCase())
      );
      this.$listaCasas.next(especializacionesFiltradas);
    } else {
        this.$listaCasas.next(this.listaCasas);
    }
  }

  getListaCasas(): Observable<any> {
    return this.httpService.getCasas().pipe(
      tap(lista => {
        this.listaCasas = lista;
        this.$listaCasas.next(this.listaCasas);
      })
    );
  }

}
