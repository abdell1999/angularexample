import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';



@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  employees: Employee[] = []; //Array de tipo Employee, que contendrá los registros traidos de la api
  page: number = 1; //Página inicial de la paginación, lo normal es que sea "1"
  loading: boolean; //Esta variable indica si se están cargando datos, mientras no termine la carga permanecerá en verdadero
  numberElements:number = 10;
  newValue:number = 10;
  search:any = "";
  empty:boolean = false;

  searchItems(){
    console.log(this.search)
    this.loading = true;
    this.employeeService.search(this.search).subscribe((data: Employee[])=>{
      this.employees = data;
      this.loading = false;
      console.log(this.employees);
      this.checkEmpty(this.employees.length);
    })
  }





  changeNumberElements(){

    this.numberElements = this.newValue;
    //console.log(this.newValue);

  }

  // constructor() { }
  constructor(public employeeService: EmployeeService) {
    this.loading = true;
  }

  checkEmpty(length:number){
    if(length>0){
      this.empty = false;
    }else{
      this.empty = true
    }
  }


  ngOnInit(): void {

    var start = Date.now();

    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employees = data;
      this.loading = false; //Una vez que tengo los datos cambio este valor para dejar de mostrar la animación de carga
      console.log(this.employees);
      this.checkEmpty(this.employees.length);

      var end = Date.now();

      console.log("RENDIMIENTO");
      console.log(end - start);
    })
  }


//Elimino el registro con el id que se pasa como parámetro
  deleteEmployee(id:number){
    this.employeeService.delete(id).subscribe(res => {
         this.employees = this.employees.filter(item => item.id !== id);
         console.log(`El empleado con id ${id} ha sido eliminado correctamente`);
    })
  }

}
