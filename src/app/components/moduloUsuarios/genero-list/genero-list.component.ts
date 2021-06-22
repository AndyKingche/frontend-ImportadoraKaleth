import { Component, HostBinding, OnInit } from '@angular/core';
import { GeneroService }from '../../../services/genero.service';

@Component({
  selector: 'app-genero-list',
  templateUrl: './genero-list.component.html',
  styleUrls: ['./genero-list.component.css']
})
export class GeneroListComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  generos : any = [] ;

  constructor(private generoservice: GeneroService) { }

  ngOnInit() {
    this.getGenero();
  }

  getGenero(){
    this.generoservice.getGeneros().subscribe(
      res=>{
        this.generos = res;
      },error => console.error(error)
    );
  }

  deleteGenero(id: number){
    this.generoservice.deleteGenero(id).subscribe(res=>{
      this.getGenero();

    },error => console.error(error));

  }

}
