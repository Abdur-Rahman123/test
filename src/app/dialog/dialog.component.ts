import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}

  formValue!: FormGroup;
  employess:Employee[] | any=JSON.parse(localStorage.getItem('dataSource')|| '{}');
  update!:Employee

  onNoClick(): void {
   if(this.formValue.invalid) return;
   this.update=this.employess.find((e:Employee)=>e.id==this.data.id);
  //this.employess.splice(this.data.id,1);
  let result:Employee[]=this.employess.filter((e:Employee)=>e.id!=this.data.id);
   this.update.firstName=this.formValue.value.firstName;
   this.update.lastName=this.formValue.value.lastName;
   this.update.phone=this.formValue.value.phone;
   this.update.email=this.formValue.value.email;
   this.update.profession=this.formValue.value.profession;
   //this.update.DOB=this.formValue.value.DOB;
   let date=this.formValue.controls["DOB"].value;
    const filterValue:any= this.datePipe.transform(date,'dd/MM/yyyy');
    this.update.DOB=filterValue;
   var tempArray:Employee[]=[];
    let value=JSON.parse(localStorage.getItem('dataSource') || '{}');
    if(Object.keys(value).length!=0){
      tempArray=[...result]
    }
    tempArray.push(this.update);
    localStorage.setItem('dataSource',JSON.stringify(tempArray));
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log('data',this.data)
   this.createForm();
   this.formValue.controls["firstName"].setValue(this.data.firstName);
   this.formValue.controls["lastName"].setValue(this.data.lastName);
   this.formValue.controls["email"].setValue(this.data.email);
   this.formValue.controls["phone"].setValue(this.data.phone);
   this.formValue.controls["profession"].setValue(this.data.profession);
   this.formValue.controls["DOB"].setValue(new Date(this.data.DOB));
  }

  private createForm():void{
    this.formValue=this.formBuilder.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)]],
      DOB:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      profession:['',[Validators.required]]
      
    })
  }

}
