import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  id: number;
  employee!: Employee;
  form: FormGroup;

  constructor(
    public employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {



    this.id = this.route.snapshot.params['id'];

    this.employeeService.find(this.id).subscribe((data: Employee)=>{
      this.employee = data;
    });

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });


  }

  ngOnInit(): void {}


  submit(){
    console.log(this.form.value);
    this.employeeService.update(this.id, this.form.value).subscribe(res => {
         console.log('¡Empleado actualizado correctamente!');
         this.router.navigateByUrl('employees/index');
    })
  }

}
