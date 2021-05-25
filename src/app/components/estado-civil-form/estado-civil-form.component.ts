import { Component, HostBinding, OnInit } from '@angular/core';
import { Estado_Civil } from '../../models/Estado_Civil';
import { EstadoCivilService } from '../../services/estado-civil.service';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-estado-civil-form',
  templateUrl: './estado-civil-form.component.html',
  styleUrls: ['./estado-civil-form.component.css']
})
export class EstadoCivilFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  state : Estado_Civil = {
    nombre:''
  }
  edit : boolean = false;
  constructor(private estadocivilservice: EstadoCivilService, private router: Router, private activedrouter: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    console.log(params);
    if(params.id){
      this.estadocivilservice.getEstadocivil(params.id).subscribe(
        res=>{
          if(res!= null){
            console.log(res);
            this.state = res; 
            this.edit = true;

          }else{
            this.router.navigate(['/civil-status']);
          }
          
        },
        err => console.log("hay error "+ err)
      )
    }
  }

  saveEstado_Civil(){
    this.estadocivilservice.saveEstadocivil(this.state).subscribe(
      res=>{
        this.state.nombre=' ';
      },error => console.error(error)
    );
  }

  updateEstado_Civil(){
    this.estadocivilservice.updateEstadocivil(this.state.id_estadocivil ,this.state).subscribe(
      res => {
        this.state.nombre = ' ';
      },
      err => console.error(err)
      

    );
  }

}
