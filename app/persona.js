export default class Persona{
    constructor(nombre, apellido, dni){
        this._nomb = nombre.toUpperCase();
        this._apell = apellido.toUpperCase();
        this._dni = parseInt(dni);
        this._sueldos = new Array(12);
    }
  
    set nombre(n){
        this._nomb = n.toUpperCase();
    }
  
    set apellido(apell){
        this._apell = apell.toUpperCase();
    }
  
    set dni(d){
        this._dni = parseInt(d);
    }
  
    get nombre(){
        return this._nomb;
    }
  
    get apellido(){
        return this._apell;
    }
  
    get dni(){
        return this._dni;
    }
  
    toString(){
        let texto = "Nombre y Apellido: " + this._nomb + " " + this._apell + ", DNI: " + this._dni
        return texto;
    }
  
    asignarSueldo(mes, cant){
        let cantidad = parseFloat(cant);
        let nombreMes = "";
        switch (mes) {
          case 1:
            this._sueldos[0]={mes: "Enero", salario: cantidad};
            // console.log(this._sueldos[0].mes)
            break;
          case 2:
            this._sueldos[1] = { mes: "Febrero", salario: cantidad };
            break;
          case 3:
            this._sueldos[2] = { mes: "Marzo", salario: cantidad };
            break;
          case 4:
            this._sueldos[3] = { mes: "Abril", salario: cantidad };
            break;
          case 5:
            this._sueldos[4] = { mes: "Mayo", salario: cantidad };
            break;
          case 6:
            this._sueldos[5] = { mes: "Junio", salario: cantidad };
            break;
          case 7:
            this._sueldos[6] = { mes: "Julio", salario: cantidad };
            break;
          case 8:
            this._sueldos[7] = { mes: "Agosto", salario: cantidad };
            break;
          case 9:
            this._sueldos[8] = { mes: "Septiembre", salario: cantidad };
            break;
          case 10:
            this._sueldos[9] = { mes: "Octubre", salario: cantidad };
            break;
          case 11:
            this._sueldos[10] = { mes: "Noviembre", salario: cantidad };
            break;
          case 12:
            this._sueldos[11] = { mes: "Diciembre", salario: cantidad };
            break;
          default:
            break;
        }
    }
  
    verSueldo(m){
      let resultado;
        if(this._sueldos[m-1]?.salario){
          resultado = this._sueldos[m-1].salario;
        }else{
          resultado = "Sueldo no asignado";
        }
      return resultado;
    }
}