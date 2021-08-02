
import { Genero } from './Genero';
import { Estadocivil } from './Estadocivil';
export interface Usuarios{
    idUsuario?:number;
    apellido?:string;
    cedula?:string;
    direccion?:string;
    email?:string;
    estado?:string;
    fechanacimiento?:string;
    nombre?:string;
    password?:string;
    telefono?:string;
    estadocivil?: Estadocivil;
    genero?:Genero;
 
}