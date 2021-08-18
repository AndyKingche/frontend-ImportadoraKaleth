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
  roles:any=[];
  estadosEscogidos: any=[];
  rolesEscogidos:any=[];
  fechaObtenida: any;
  creacion:string='Crear';
  es:any;
  constructor(
    private usuariosservice: UsuariosService,
    private generoservice: GeneroService,
    private estadocivilservice: EstadoCivilService,
    private activedrouter: ActivatedRoute,
    private router: Router,
    private notificacion: NotificacionService
   
  ) {}
  regexpresion: RegExp= /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    this.creacion = 'Crear';
    if (params.id) {
      this.usuariosservice.getUsuario(params.id).subscribe(
        (res) => {
          if (res != null) {
            this.user = res;
            this.estadosEscogidos={};

            this.fechaObtenida = new Date(this.user.fechanacimiento)
            this.creacion = 'Actualizar';
            
            this.estadosEscogidos.estado = this.user.estado;
            
            if(this.user.estado){
              this.estadosEscogidos.id = 1
              this.estadosEscogidos.nombre = 'Activo'
            }else{
              this.estadosEscogidos.id = 2
              this.estadosEscogidos.nombre = 'Inactivo'

            }
            console.log(this.estadosEscogidos)
            this.estadocivilservice
              .getEstadocivil(this.user.estadocivil.idEstadocivil)
              .subscribe(
                (resul) => {
                  this.estadocivilEscogido = resul;
                  console.log(this.estadocivilEscogido)
                },
                (err) => console.error(err)
              );

            this.generoservice.getGenero(this.user.genero.idGenero).subscribe(
              (result) => {
                this.generoEscogido = result;
                console.log(this.generoEscogido )
                
              },
              (err) => console.error(err)
            );
            this.edit = true;
          } else {
            this.router.navigate(["/admin/user"]);
          }
        },
        (err) => console.log("hay error " + err)
      );
    }

    this.getEstadocivil();
    this.getGenero();
    this.getEstado();
    this.getRoles();
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
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
            this.router.navigate(["/admin/user"]);
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
              this.router.navigate(["/admin/user"]);
            },
            (error) => console.error(error)
          );
        }else{
          this.notificacion.showError('Revisar si los datos estan completos','**Error al actualizar')
        }
      
       
    } catch (error) {
      this.notificacion.showError('Revisar si los datos estan completos','**Error al actualizar')

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
        id: 1,
        nombre: "Activo",
        estado:true
      },
      {
        id: 2,
        nombre: "Inactivo",
        estado:false
      },
    ];
    console.log(this.estados)
   //this.estadosEscogidos = this.estados
  }

  getRoles(){
    this.roles=[
      {
        id:1,
        nombre:"Administrador"
      },
      {
        id:2,
        nombre:"Cajero"
      }
    ]
  }

  quitarespacios(atributoHTML: string) {
    let obtenerletras = $(atributoHTML).val();
    return obtenerletras.trim();
  }

  testingresar() {
    
    if (this.user.nombre.length != 0 &&
      this.user.apellido.length != 0 &&
      this.user.cedula.length != 0 &&
      this.user.direccion.length != 0 &&
      this.user.email.length != 0 &&
      this.user.password.length != 0 &&
      this.user.telefono.length != 0 &&
      this.fechaObtenida.length !=0
       ) {

        
      this.user.fechanacimiento = this.fechaObtenida
      this.user.estadocivil.idEstadocivil = this.estadocivilEscogido.idEstadocivil;
      this.user.genero.idGenero = this.generoEscogido.idGenero;
      this.user.estado = this.estadosEscogidos.estado;
      this.user.rol = this.rolesEscogidos.id;
      console.log(this.estadosEscogidos.id);
      return true;
    } else {
      
      return false;
    }
  }
}
