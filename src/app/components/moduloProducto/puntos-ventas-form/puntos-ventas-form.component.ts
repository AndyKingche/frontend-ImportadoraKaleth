import { Component, OnInit, HostBinding } from '@angular/core';
import { PuntosVentas } from '../../../models/PuntosVentas';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../../services/notificacion.service';
import { PuntosVentasService } from 'src/app/services/puntos-ventas.service';

declare let $: any;

@Component({
  selector: 'app-puntos-ventas-form',
  templateUrl: './puntos-ventas-form.component.html',
  styleUrls: ['./puntos-ventas-form.component.css']
})
export class PuntosVentasFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  puntosventas: PuntosVentas = {
    nombrelocal: '',
    direccion: '',
    ciudad: '',
    telefono: 0
  }
  edit: boolean = false;
  constructor(private puntosventasservice: PuntosVentasService,
    private router: Router,
    private activedrouter: ActivatedRoute,
    private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    if (params.id) {
      this.puntosventasservice.getPuntosVenta(params.id).subscribe(
        res => {
          if (res != null) {
            this.puntosventas = res;
            this.edit = true;

          } else {
            this.router.navigate(['/sales-points']);
          }

        },
        err => console.log("hay error " + err)
      )
    }
  }


  savePuntosVentas() {
    try {


      if (this.testingresar()) {
        console.log(this.puntosventas);
        this.puntosventasservice.savePuntosVentas(this.puntosventas).subscribe(
          (res) => {
            (this.puntosventas.nombrelocal = " "),
              (this.puntosventas.direccion = " "),
              (this.puntosventas.ciudad = " "),
              (this.puntosventas.telefono = 0);
            setTimeout(() => {
              this.notificacion.showSuccess(
                "El Punto de Venta se ha agregado correctamente",
                "Punbto de Venta Creado"
              );
            }, 200);
            this.router.navigate(["/sales-points"]);
          },
          (error) => console.error(error)
        );
      } else {
        this.notificacion.showError(
          "Revise si los datos estan completos",
          "**Error al crear Punto de Venta"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();

    return obtenerletras.trim();
  }


  updatePuntosVentas() {
    try {
      if (this.puntosventas.nombrelocal &&
        this.puntosventas.direccion &&
        this.puntosventas.ciudad &&
        this.puntosventas.telefono) {
        this.puntosventasservice
          .updatePuntosVentas(this.puntosventas.id_puntosventa, this.puntosventas)
          .subscribe(
            (res) => {
              setTimeout(() => {
                this.notificacion.showSuccess(
                  "El Punto de venta se edito correctamente",
                  "Punto de venta Editado"
                );
              }, 100);
              this.router.navigate(["/sales-points"]);
            },
            (error) => console.error(error)
          );
      } else {
        console.log("si entre")
        if (this.testingresar()) {
          this.puntosventasservice
            .updatePuntosVentas(this.puntosventas.id_puntosventa, this.puntosventas)
            .subscribe(
              (res) => {
                setTimeout(() => {
                  this.notificacion.showSuccess(
                    "El punto de venta se edito correctamente",
                    "punto de venta Editado"
                  );
                }, 100);
                this.router.navigate(["/sales-points"]);
              },
              (error) => console.error(error)
            );
        } else {
          this.notificacion.showError('Revisar si los datos estan completos', '**Error al actualizar')
        }
      }

    } catch (error) {
      console.log(error);
    }

  }

  testingresar() {

    //input
    let obtenerNombreLocal = this.quitarespacios("#nombrelocal");
    let obtenerDireccion = this.quitarespacios("#direccion");
    let obtenerCiudad = this.quitarespacios("#ciudad");
    let obtenerTelefono = this.quitarespacios("#telefono");


    if (
      obtenerNombreLocal.length > 0 &&
      obtenerDireccion.length > 0 &&
      obtenerCiudad.length > 0 &&
      obtenerTelefono.length > 0

    ) {
      this.puntosventas.nombrelocal = obtenerNombreLocal;
      this.puntosventas.direccion = obtenerDireccion;
      this.puntosventas.ciudad = obtenerCiudad;
      this.puntosventas.telefono = obtenerTelefono;


      return true;
    } else {

      return false;
    }
  }
}
