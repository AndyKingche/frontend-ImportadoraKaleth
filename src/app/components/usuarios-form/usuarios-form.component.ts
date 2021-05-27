import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Usuarios } from '../../models/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { Estadocivil } from '../../models/Estadocivil';
import { Genero } from '../../models/Genero';
import { GeneroService } from '../../services/genero.service';
import {  NotificacionService } from '../../services/notificacion.service';
declare let $: any;

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  estadocivil : Estadocivil;
  estadocivilEscogido : any =[];
  genero: Genero;
  generoEscogido: any =[];
  user : Usuarios={
    apellido:' ',
    cedula:' ',
    direccion:' ',
    email:' ',
    estado:' ',
    fecha_nacimiento:' ',
    nombre:' ',
    password:' ',
    telefono:' ',
    estadocivil:{id_estadocivil:0},
    genero:{id_genero:0}
  }
  edit : boolean = false;
  estados : any=[];
  estadosEscogidos : any = {
    id:true,
    nombre:' '
  }
  constructor(private usuariosservice: UsuariosService, private generoservice: GeneroService,
    private estadocivilservice: EstadoCivilService,
    private activedrouter: ActivatedRoute, private router: Router, private notificacion: NotificacionService) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);
    
    if(params.id){
      this.usuariosservice.getUsuario(params.id).subscribe(
        res=>{
          if(res!= null){
            
            this.user = res;
            if(this.user.estado){
              this.estadosEscogidos.id = 'true';
              this.estadosEscogidos.nombre = 'Activo';
              $("#estados").select2({
                placeholder: this.estadosEscogidos.nombre,
                allowClear:true
              })
            }else{
              this.estadosEscogidos.id = 'false';
              this.estadosEscogidos.nombre = 'Inactivo'
              $("#estados").select2({
                placeholder: this.estadosEscogidos.nombre,
                allowClear:true
              })
            }

            
            
        this.estadocivilservice.getEstadocivil(this.user.genero.id_genero).subscribe(
          resul=>{
            this.estadocivilEscogido = resul;
            
            $("#estadociviles").select2({
              placeholder: this.estadocivilEscogido.nombre,
              allowClear:true
            }

            );
          },err=>console.error(err)
        );

        this.generoservice.getGenero(this.user.genero.id_genero).subscribe(
          result=>{
            this.generoEscogido = result;
            
            $("#generos").select2({
              placeholder: this.generoEscogido.nombre,
              allowClear:true
            })
          },err => console.error(err)
        );
            this.edit = true;

          }else{
            this.router.navigate(['/user']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }

    this.getEstadocivil();
    this.getGenero();
    this.getEstado();
    
    $('#generos').select2({
      placeholder: "Genero ....",
      allowClear:true,
    
    });
    $('#estadociviles').select2({
      placeholder: "Estado Civil ....",
      allowClear:true,
      outerHeight: 500
    });
    $('#estados').select2({
      placeholder: "Estados ....",
      allowClear:true,
    });
  }

  saveUsuario(){
    let opcionEstado = $('#estados').val();
    console.log("-",$('#estados').val()) 
    let opcionGenero = $('#generos').val();
    let opcionEstadoCivil = $('#estadociviles').val()
    this.user.estado = opcionEstado;
    this.user.genero.id_genero = opcionGenero;
    this.user.estadocivil.id_estadocivil = opcionEstadoCivil;
    
    this.usuariosservice.saveUsuario(this.user).subscribe(

      res=>{
        
    this.user.apellido=' ',
    this.user.cedula=' ',
    this.user.direccion=' ',
    this.user.email=' ',
    this.user.estado=' ',
    this.user.fecha_nacimiento=' ',
    this.user.nombre=' ',
    this.user.password=' ',
    this.user.telefono=' ',
    this.user.estadocivil={id_estadocivil:0},
    this.user.genero={id_genero:0}
        
      },error => console.error(error)
    );
  }

  updateUsuario(){
    let opcionEstado = $('#estados').val();
    console.log("-",$('#estados').val()) 
    let opcionGenero = $('#generos').val();
    let opcionEstadoCivil = $('#estadociviles').val()
    this.user.estado = opcionEstado;
    this.user.genero.id_genero = opcionGenero;
    this.user.estadocivil.id_estadocivil = opcionEstadoCivil;
    this.usuariosservice.updateUsuario(this.user.id_usuarios,this.user).subscribe(
      res=>{
        setTimeout(()=>{
          this.notificacion.showSuccess('El usuadio se edito correctamente','Usuario Editado')
        },
          200
        )
        this.router.navigate(['/user'])
        
      },error => console.error(error)
    );
  }

  getEstadocivil(){
    this.estadocivilservice.getEstadociviles().subscribe(
      res => {
        this.estadocivil = res;
      },error => console.error(error)
    );
  }

  getGenero(){
    this.generoservice.getGeneros().subscribe(
      res=> {
        this.genero = res;
      },error => console.error(error)
    );
  }

  getEstado(){
    this.estados = [{
      id:true,
    nombre:"Activo"},{
      id:false,
      nombre:"Inactivo"
      }
    ];
    return this.estados;
  }


}
