import { Component, HostBinding, OnInit } from '@angular/core';
import { Clientes } from '../../models/Clientes';
import { ClientesService } from '../../services/clientes.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificacionService } from '../../services/notificacion.service';
declare let $ : any;
@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.css']
})
export class ClientsFormComponent implements OnInit {

  @HostBinding("class") classes = "row";

  client: Clientes = {
    apellidoCli: "",
    cedulaCli: "",
    direccionCli: "",
    email: "",
    nombreCli: "",
    telefono: ""
  };
  edit: boolean = false;
  
  constructor(
    private clientesservice: ClientesService,
    private activedrouter: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService
  ) {}

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);

    if (params.id) {
      this.clientesservice.getCliente(params.id).subscribe(
        (res) => {
          if (res != null) {
            this.client = res;
            this.edit = true;
          }else{
            this.router.navigate(['/client'])
          }
        },
        (err) => console.log("hay error " + err)
      );
    }

  }

  saveCliente() {
    try {
   
      
      if (this.testingresar()) {
        
        this.clientesservice.saveCliente(this.client).subscribe(
          (res) => {
            this.client.apellidoCli= "";
            this.client.cedulaCli= "";
            this.client.direccionCli= "";
            this.client.email= "";
            this.client.nombreCli= "";
            this.client.telefono= "";            
    setTimeout(() => {
              this.notificacion.showSuccess(
                "El Cliente se ha agregado correctamente",
                "Cliente Creado"
              );
            }, 200);
            this.router.navigate(["/client"]);
          },
          (error) => console.error(error)
        );
      } else {
        this.notificacion.showError(
          "Revise si los datos estan completos",
          "**Error al crear Cliente"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateCliente() {
    try {
      if(this.client.nombreCli && 
        this.client.apellidoCli &&
        this.client.cedulaCli &&
        this.client.direccionCli &&
        this.client.email &&
        this.client.telefono){
          this.clientesservice
          .updateCliente(this.client.idCliente, this.client)
          .subscribe(
            (res) => {
              setTimeout(() => {
                this.notificacion.showSuccess(
                  "El Cliente se edito correctamente",
                  "Cliente Editado"
                );
              }, 100);
              this.router.navigate(["/client"]);
            },
            (error) => console.error(error)
          );
      }else{
        if(this.testingresar()){
          this.clientesservice
          .updateCliente(this.client.idCliente, this.client)
          .subscribe(
            (res) => {
              setTimeout(() => {
                this.notificacion.showSuccess(
                  "El Cliente se edito correctamente",
                  "Cliente Editado"
                );
              }, 100);
              this.router.navigate(["/client"]);
            },
            (error) => console.error(error)
          );
        }else{
          this.notificacion.showError('Revisar si los datos estan completos','**Error al actualizar')
        }
      }
       
    } catch (error) {
      console.log(error);
    }
    
  }


  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }

  testingresar() {
    

    //input
    let obtenerNombre = this.quitarespacios("#nombrecliente");
    let obtenerApellido = this.quitarespacios("#apellidocliente");
    let obtenerCedula = this.quitarespacios("#cedulacliente");
    let obtenerDireccion = this.quitarespacios("#direccioncliente");
    let obtenerTelefono = this.quitarespacios("#telefono");
    let obtenerEmail = this.quitarespacios("#email");

    if (
      obtenerNombre.length > 0 &&
      obtenerApellido.length > 0 &&
      obtenerCedula.length > 0 &&  
      obtenerTelefono.length > 0 &&
      obtenerDireccion.length > 0 &&
      obtenerEmail.length > 0 
    ) {
      this.client.nombreCli = obtenerNombre;
      this.client.apellidoCli = obtenerApellido;
      this.client.cedulaCli = obtenerCedula;
      this.client.direccionCli = obtenerDireccion;
      this.client.email = obtenerEmail;
      this.client.telefono = obtenerTelefono;

      return true;
    } else {
      
      return false;
    }
  }

}
