import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
@Input() nombre = "Andy";
  constructor( private activedrouter: ActivatedRoute, private router : Router) { }

  @Input('listaDetallePedido') data:any;
  ngOnInit() {
    let params = this.activedrouter.snapshot.paramMap.get('descripcion');
    console.log(params);
  //  for(var aux in params){
  //   console.log("esto nos trae del home",params[aux])
  //  }
    // for(let i = 0 ; i < paramsnuevo.length ; i++){
    //   let param = paramsnuevo[i];
    //   console.log("esto nos trae del home",params[param]);
    // }
  }

}
