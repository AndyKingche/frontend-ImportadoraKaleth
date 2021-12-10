import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-navigation-customer',
  templateUrl: './navigation-customer.component.html',
  styleUrls: ['./navigation-customer.component.css']
})
export class NavigationCustomerComponent implements OnInit {

  constructor(private activedrouter: ActivatedRoute, private router : Router) { }
URL :string="";
  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
   // console.log(params)
    if(params.id == 1){
      
      this.mostrarTotal();
    }
  }

  mostrarTotal(){
    //window.open(`${environment.url}api/stock/reportTotal`);
    
  }

}
