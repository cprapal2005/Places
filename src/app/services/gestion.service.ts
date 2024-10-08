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
  private listaBookings!: Array<any>
  private $listaBookings: BehaviorSubject<any> = new BehaviorSubject<any>(this.listaBookings);

  constructor(private httpService: HttpService, private router: Router) {
    this.listaCasas = [];
    this.$listaCasas.next(this.listaCasas);
    this.listaBookings = [];
    this.$listaBookings.next(this.listaBookings);
    this.usuario = {}
  }

  iniciarSesion(usuario: any): boolean {
    this.httpService.postLogin(usuario).subscribe((respuesta) => {
      if(respuesta!=null) {
        this.usuario = respuesta.user;
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

  getCasa(id: any): Observable<any> {
    return this.httpService.getCasa(id);
  }

  reservarCasa(casa: any): Observable<any> {
    return this.httpService.postBooking({
      fecha_inicio:"2024-02-14",
    fecha_fin: "2024-02-20",
    cantidad_personas: 1,
    precio_final: casa.precio,
    user_id: this.usuario._id,
    house_id: casa._id,
    owner_id: casa.user_id});
  }

  getBookings(): Observable<any> {
    this.httpService.getBookings().pipe(

      tap(reserva => {
        reserva.forEach((element: any) => {
          this.getCasa(element.house_id).subscribe((casa) => {
            let casaDetalles = {
              _id: casa._id,
              titulo : casa.titulo,
              descripcion : casa.descripcion,
              direccion : casa.direccion,
              ciudad : casa.ciudad,
              pais : casa.pais,
              precio : casa.precio,
              nombreOwner : casa.nombreOwner,
              user_id : casa.user_id
            }
            this.listaBookings.push(casaDetalles);
            
          })
        });

        this.$listaBookings.next(this.listaBookings);
        
      })
    );

    return this.$listaBookings.asObservable();

  }

}
