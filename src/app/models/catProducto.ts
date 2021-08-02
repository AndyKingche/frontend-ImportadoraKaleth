import {Disenos} from './catDiseno';
import {Categorias} from './catCategoria'
import {Tallas} from './catTalla';

export interface Productos{
    idProductos?:number;
    catCategoria?:Categorias,
    catDiseno?:Disenos,
    catTalla?:Tallas,
    //codProducto?:number,
    codProducto?:string
}