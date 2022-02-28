import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Employee } from '../employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  form: FormGroup;
  id!: number;
  employee: Employee = {
    "id": 9000,
    "name":"",
    "email":"",
    "phone":""};

  @Input() action: any;

  create:boolean = false;
  edit:boolean = false;


  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {








    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  ngOnInit(): void {

    if(this.action == "create"){
      console.log("Formulario de creación");
      this.create = true;
    }

    if(this.action == "edit"){
      console.log("Formulario de edición");
      this.edit = true;
    }

    if(this.edit){
      this.id = this.route.snapshot.params['id'];
      this.employeeService.find(this.id).subscribe((data: Employee)=>{
        this.employee = data;
      });

    }








  }



  submit(){
    if(this.create){
      console.log(this.form.value);
      this.employeeService.create(this.form.value).subscribe(res => {
      console.log('¡Empleado creado correctamente!');
      this.router.navigateByUrl('employees/index');
    })
    }

    if(this.edit){
      console.log(this.form.value);
      this.employeeService.update(this.id, this.form.value).subscribe(res => {
      console.log('¡Empleado actualizado correctamente!');
      this.router.navigateByUrl('employees/index');
    })
    }


  }


}
