
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  formValue!: FormGroup;
  

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)]],
      email:['',[Validators.required,Validators.email]],
      DOB:['',[Validators.required]],
      profession:['',[Validators.required]]
      
    })
    
  }

  onSubmit(){
    this.formValue.markAllAsTouched();
    if(this.formValue.invalid) return;
    let date=this.formValue.controls["DOB"].value;
    const filterValue:any= this.datePipe.transform(date,'dd/MM/yyyy');
    this.formValue.controls["DOB"].setValue(filterValue);
    console.log(this.formValue.value);
    
    var tempArray:Employee[]=[];
    let value=JSON.parse(localStorage.getItem('dataSource') || '{}');
    if(Object.keys(value).length!=0){
    tempArray=[...value];
    }
    tempArray.push(this.formValue.value);
    localStorage.setItem('dataSource',JSON.stringify(tempArray));
    console.log('localStore value',JSON.parse(localStorage.getItem('dataSource') || '{}'));
    window.location.reload();
    
  }
  
}
