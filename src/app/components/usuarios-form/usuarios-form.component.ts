import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuarios } from "../../models/Usuarios";
import { UsuariosService } from "../../services/usuarios.service";

import { NotificacionService } from "../../services/notificacion.service";

declare let $: any;

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.css"],
})
export class UsuariosFormComponent implements OnInit {
  @HostBinding("class") classes = "row";
  user: Usuarios = {
    apellido: "",
    cedula: "",
    direccion: "",
    email: "",
    estado: "",
    fecha_nacimiento: "",
    nombre: "",
    password: "",
    telefono: "",
    estadocivil: "",
    genero: "",
  };
  edit: boolean = false;
  //Estados
  estados: any = [];
  estadosEscogidos: any = {
    id: true,
    nombre: " ",
  };
  //generos
  generos: any = [];
  generoEscogido: any =[];
  //estadoscivil
  estadosciviles: any = [];
  estadocivilEscogido: any = [];
  constructor(
    private usuariosservice: UsuariosService,
    private activedrouter: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService
  ) {}

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);

    if (params.id) {
      this.usuariosservice.getUsuario(params.id).subscribe(
        (res) => {
          if (res != null) {
            this.user = res;
            if (this.user.estado) {
              this.estadosEscogidos.id = "true";
              this.estadosEscogidos.nombre = "Activo";
              $("#estados").select2({
                placeholder: this.estadosEscogidos.nombre,
                allowClear: true,
              });
            } else {
              this.estadosEscogidos.id = "false";
              this.estadosEscogidos.nombre = "Inactivo";
              $("#estados").select2({
                placeholder: this.estadosEscogidos.nombre,
                allowClear: true,
              });
            }
            $('#estadociviles').select2({
              placeholder:this.user.estadocivil,
              allowClear:true
            });
            $('#generos').select2({
              placeholder: this.user.genero,
              allowClear: true
            })


            this.edit = true;
          } else {
            this.router.navigate(["/user"]);
          }
        },
        (err) => console.log("hay error " + err)
      );
    }

    this.getEstadocivil();
    this.getGenero();
    this.getEstado();

    $("#generos").select2({
      placeholder: "Genero ....",
      allowClear: true,
    });
    $("#estadociviles").select2({
      placeholder: "Estado Civil ....",
      allowClear: true,
      outerHeight: 500,
    });
    $("#estados").select2({
      placeholder: "Estados ....",
      allowClear: true,
    });
  }

  saveUsuario() {
    try {
   
      
      if (this.testingresar()) {
        console.log(this.user);
        this.usuariosservice.saveUsuario(this.user).subscribe(
          (res) => {
            (this.user.apellido = ""),
              (this.user.cedula = ""),
              (this.user.direccion = ""),
              (this.user.email = ""),
              (this.user.estado = ""),
              (this.user.fecha_nacimiento = ""),
              (this.user.nombre = ""),
              (this.user.password = ""),
              (this.user.telefono = ""),
              (this.user.estadocivil =""),
              (this.user.genero = "");
            setTimeout(() => {
              this.notificacion.showSuccess(
                "El Usuario se ha agregado correctamente",
                "Usuario Creado"
              );
            }, 200);
            this.router.navigate(["/user"]);
          },
          (error) => console.error(error)
        );
      } else {
        this.notificacion.showError(
          "Revise si los datos estan completos",
          "**Error al crear Usuario"
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  updateUsuario() {
    try {
      if(this.user.nombre && 
        this.user.apellido &&
        this.user.cedula &&
        this.user.direccion &&
        this.user.email &&
        this.user.password &&
        this.user.telefono &&
        this.user.fecha_nacimiento &&
        this.user.estado &&
        this.user.estadocivil &&
        this.user.genero){
          if(this.testingresar()){
            this.usuariosservice
            .updateUsuario(this.user.id, this.user)
            .subscribe(
              (res) => {
                setTimeout(() => {
                  this.notificacion.showSuccess(
                    "El usuario se edito correctamente",
                    "Usuario Editado"
                  );
                }, 100);
                this.router.navigate(["/user"]);
              },
              (error) => console.error(error)
            );
          }else{
            this.notificacion.showError('Revisar si los datos estan completos','**Error al actualizar')
          }
      }
    } catch (error) {
      this.notificacion.showError('Revisar si los datos estan completos','**Error al actualizar')
    }
    
  }

  getEstadocivil() {
    this.estadosciviles = [
      {
        id:0,
        estadocivil:"Soltero/Soltera"
    },{
      id:1,
      estadocivil:"Casado/Casada"
    },{
      id:2,
      estadocivil:"Divorciado/Divorciada"
    },{
      id:3,
      estadocivil:"Union Libre"
    }];
  }

  getGenero() {
    this.generos = [
      {
        id:0,
        genero:"Hombre"
    },{
      id:1,
      genero:"Mujer"
    },{
      id:2,
      genero:"Otros"
    }];
  }

  getEstado() {
    this.estados = [
      {
        id: true,
        nombre: "Activo",
      },
      {
        id: false,
        nombre: "Inactivo",
      },
    ];
    return this.estados;
  }

  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }

  testingresar() {
    //select
    let opcionEstado = $("#estados").val(); //este no por que me devuelve un null
    let opcionEstadocivil = $('#estadociviles').val();
    let opcionGenero = $("#generos").val();

    //input
    let obtenerNombre = this.quitarespacios("#nombre");
    let obtenerApellido = this.quitarespacios("#apellido");
    let obtenerCedula = this.quitarespacios("#cedula");
    let obtenerDireccion = this.quitarespacios("#direccion");
    let obtenerPassword = this.quitarespacios("#password");
    let obtenerTelefono = this.quitarespacios("#telefono");
    let obtenerFechaNacimiento = this.quitarespacios("#fecha_nacimiento");
    let obtenerEmail = this.quitarespacios("#email");

    if (
      obtenerNombre.length > 0 &&
      obtenerApellido.length > 0 &&
      obtenerCedula.length > 0 &&
      obtenerPassword.length > 0 &&
      obtenerTelefono.length > 0 &&
      obtenerFechaNacimiento.length > 0 &&
      obtenerEmail.length > 0 &&
      opcionEstadocivil.length > 0 &&
      opcionGenero.length > 0 &&
      opcionEstado != null
    ) {
      this.user.nombre = obtenerNombre;
      this.user.apellido = obtenerApellido;
      this.user.cedula = obtenerCedula;
      this.user.direccion = obtenerDireccion;
      this.user.email = obtenerEmail;
      this.user.password = obtenerPassword;
      this.user.telefono = obtenerTelefono;
      this.user.fecha_nacimiento = obtenerFechaNacimiento;
      this.user.estado = opcionEstado;
      this.user.estadocivil = opcionEstadocivil;
      this.user.genero = opcionGenero;

      return true;
    } else {
      
      return false;
    }
  }
}
