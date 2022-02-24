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


  // constructor() { }
  constructor(public employeeService: EmployeeService) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employees = data;
      this.loading = false; //Una vez que tengo los datos cambio este valor para dejar de mostrar la animación de carga
      console.log(this.employees);
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
