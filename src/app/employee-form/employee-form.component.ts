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
    private router: Router) { }

  ngOnInit(): void {
    this.formValue=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',[Validators.required,Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      profession:['',[Validators.required]]
      
    })
    
  }

  onSubmit(){
    if(this.formValue.invalid) return;
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
