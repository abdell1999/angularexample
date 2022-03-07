import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  styleUrls: ['./paginacion.component.css']
})
export class PaginacionComponent implements OnInit {
  employees: Employee[] = [];
  page: number = 1;
  loading: boolean;
  numberElements:number = 10;
  newValue:number = 10;
  search:any = "";
  empty:boolean = false;
  searching:boolean = false;



  changePage(){
    this.page++;;
    //console.log(this.employees);
    this.isSearching();

  }

  nextPage(){
    this.page++;
    //console.log(this.employees);
    this.isSearching();

  }

  prevPage(){
    this.page--;
    //console.log(this.employees);
    this.isSearching();

  }


  isSearching(){
    if(this.searching){
      this.searchItems();
    }else{
      this.paginacion();
    }
  }

  changeNumberElements(){

    this.numberElements = this.newValue;
    //console.log(this.numberElements);
    this.isSearching();


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
    /*
    this.employeeService.getAll().subscribe((data: Employee[])=>{
      this.employees = data;
      this.loading = false; //Una vez que tengo los datos cambio este valor para dejar de mostrar la animación de carga
      console.log(this.employees);
      this.checkEmpty(this.employees.length);
    })

    */

    this.paginacion();

  }




  paginacion(){
    console.log("Trayendo datos...");
    this.employeeService.pagination(this.numberElements, this.page).subscribe((data: any)=>{
      console.log(data);
      this.employees = data.data;
      this.loading = false;

      console.log(this.employees);
      console.log("Traidos con exito: "+this.employees.length+" registros!!!");
      this.checkEmpty(this.employees.length);
      this.searching = false;
    })
  }

  searchItems(){
    console.log(this.search)
    this.loading = true;
    if(this.searching == false){
      this.page = 1;
    }

    this.employeeService.searchPaginate(this.search, this.numberElements, this.page).subscribe((data: any)=>{
      this.employees = data.data;
      this.loading = false;
      console.log(this.employees);
      this.checkEmpty(this.employees.length);
      this.searching = true;
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
