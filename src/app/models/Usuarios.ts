
export interface Usuarios{
    id_usuarios?:number;
    apellido?:string;
    cedula?:string;
    direccion?:string;
    email?:string;
    estado?:string;
    fecha_nacimiento?:string;
    nombre?:string;
    password?:string;
    telefono?:string;
    estado_civil?:{id:number};
    genero?:{id:number}
 
}