import { Component, HostBinding, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Usuarios } from "../../../models/Usuarios";
import { UsuariosService } from "../../../services/usuarios.service";
import { EstadoCivilService } from "../../../services/estado-civil.service";
import { Estadocivil } from "../../../models/Estadocivil";
import { Genero } from "../../../models/Genero";
import { GeneroService } from "../../../services/genero.service";
import { NotificacionService } from "../../../services/notificacion.service";

declare let $: any;

@Component({
  selector: "app-usuarios-form",
  templateUrl: "./usuarios-form.component.html",
  styleUrls: ["./usuarios-form.component.css"],
})
export class UsuariosFormComponent implements OnInit {
  @HostBinding("class") classes = "row";
  estadocivil: Estadocivil;
  estadocivilEscogido: any = [];
  genero: Genero;
  generoEscogido: any = [];
  user: Usuarios = {
    apellido: "",
    cedula: "",
    direccion: "",
    email: "",
    estado: "",
    fechanacimiento: "",
    nombre: "",
    password: "",
    telefono: "",
    estadocivil: { idEstadocivil: 0 },
    genero: { idGenero: 0 },
  };
  edit: boolean = false;
  estados: any = [];
  estadosEscogidos: any = {
    id: true,
    nombre: " ",
  };
  constructor(
    private usuariosservice: UsuariosService,
    private generoservice: GeneroService,
    private estadocivilservice: EstadoCivilService,
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

            this.estadocivilservice
              .getEstadocivil(this.user.estadocivil.idEstadocivil)
              .subscribe(
                (resul) => {
                  this.estadocivilEscogido = resul;

                  $("#estadociviles").select2({
                    placeholder: this.estadocivilEscogido.nombre,
                    allowClear: true,
                  });
                },
                (err) => console.error(err)
              );

            this.generoservice.getGenero(this.user.genero.idGenero).subscribe(
              (result) => {
                this.generoEscogido = result;

                $("#generos").select2({
                  placeholder: this.generoEscogido.nombre,
                  allowClear: true,
                });
              },
              (err) => console.error(err)
            );
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
            (this.user.apellido = " "),
              (this.user.cedula = " "),
              (this.user.direccion = " "),
              (this.user.email = " "),
              (this.user.estado = " "),
              (this.user.fechanacimiento = " "),
              (this.user.nombre = " "),
              (this.user.password = " "),
              (this.user.telefono = " "),
              (this.user.estadocivil = { idEstadocivil: 0 }),
              (this.user.genero = { idGenero: 0 });
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
        this.user.fechanacimiento &&
        this.user.estado &&
        this.user.estadocivil.idEstadocivil &&
        this.user.genero.idGenero){
          this.usuariosservice
          .updateUsuario(this.user.idUsuario, this.user)
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
        console.log("si entre")
        if(this.testingresar()){
          this.usuariosservice
          .updateUsuario(this.user.idUsuario, this.user)
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
      console.log(error);
    }
    
  }

  getEstadocivil() {
    this.estadocivilservice.getEstadociviles().subscribe(
      (res) => {
        this.estadocivil = res;
      },
      (error) => console.error(error)
    );
  }

  getGenero() {
    this.generoservice.getGeneros().subscribe(
      (res) => {
        this.genero = res;
      },
      (error) => console.error(error)
    );
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
    let opcionEstadocivil = this.quitarespacios('#estadociviles');
    let opcionGenero = this.quitarespacios("#generos");
    
    //input
    let obtenerNombre = this.quitarespacios("#nombre");
    let obtenerApellido = this.quitarespacios("#apellido");
    let obtenerCedula = this.quitarespacios("#cedula");
    let obtenerDireccion = this.quitarespacios("#direccion");
    let obtenerPassword = this.quitarespacios("#password");
    let obtenerTelefono = this.quitarespacios("#telefono");
    let obtenerFechaNacimiento = this.user.fechanacimiento
    let obtenerEmail = this.quitarespacios("#email");

    if (
      // obtenerNombre.length > 0 &&
      // obtenerApellido.length > 0 &&
      // obtenerCedula.length > 0 &&
      // obtenerPassword.length > 0 &&
      // obtenerTelefono.length > 0 &&
      // obtenerFechaNacimiento.length > 0 &&
      // obtenerEmail.length > 0 &&
      // opcionEstadocivil.length > 0 &&
      // opcionGenero.length > 0 &&
      // opcionEstado != null
      true
    ) {
      this.user.nombre = obtenerNombre;
      this.user.apellido = obtenerApellido;
      this.user.cedula = obtenerCedula;
      this.user.direccion = obtenerDireccion;
      this.user.email = obtenerEmail;
      this.user.password = obtenerPassword;
      this.user.telefono = obtenerTelefono;
      this.user.fechanacimiento = this.user.fechanacimiento;
      this.user.estado = opcionEstado;
      this.user.estadocivil.idEstadocivil = opcionEstadocivil;
      this.user.genero.idGenero = opcionGenero;

      return true;
    } else {
      
      return false;
    }
  }
}
