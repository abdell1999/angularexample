import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;

  constructor(
    public employeeService: EmployeeService,
    private router: Router
  ) {

    this.form = new FormGroup({
      name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      email: new FormControl('', [ Validators.required, Validators.email ]),
      phone: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });

  }

  ngOnInit(): void { }




  submit(){
    console.log(this.form.value);
    this.employeeService.create(this.form.value).subscribe(res => {
         console.log('¡Empleado creado correctamente!');
         this.router.navigateByUrl('employees/index');
    })
  }

}
