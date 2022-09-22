import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../model/Employee';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as moment from 'moment'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  @Output()
dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  update!:Employee;

  constructor(public dialog: MatDialog,
    private router: Router,
    private datePipe: DatePipe){

  }


  employess:Employee[] | any=JSON.parse(localStorage.getItem('dataSource')|| '{}');

  displayedColumns: string[] = ['FullName', 'Email', 'Phone', 'DOB',  'Profession','edit'];
  dataSource = new MatTableDataSource<Employee[]>(this.employess);

  @ViewChild(MatPaginator) paginator:any= MatPaginator;

  isEditClicked:boolean=false;
  dateModel!:any;

  ngOnInit(): void {
    let increment=1;
    for(let i=0;i<this.employess.length;i++){
      this.employess[i].id=increment++;
    }
    localStorage.setItem('dataSource',JSON.stringify(this.employess));
    
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    console.log('value',this.employess)
  }
  edit(id:number){
    this.isEditClicked=true;
    console.log('id',id);
    this.update=this.employess.find((e:Employee)=>e.id==id);
    this.openDialog();
    
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data:this.update
    });

    dialogRef.afterClosed().subscribe(result => { 
      
      window.location.reload();
    });
  }

  details(id:any){
    if(!this.isEditClicked){
    console.log('id0',id);
    this.router.navigate(['details/'+id])
    }
    
  }

  applyFilter(event: Event) {
   let value=(<HTMLInputElement>event.target).value;
   
   if(value.length>2){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
   }
   if(value.length===0){
    this.dataSource = new MatTableDataSource<Employee[]>(this.employess);
   }
}
applyDateFilter(event: MatDatepickerInputEvent<Date>):void{
  //const filterValue = moment(event.value).format('dd/MM/yyyy');
  const filterValue:any= this.datePipe.transform(event.value,'dd/MM/yyyy');
  console.log('filete ',filterValue);
  
    //this.dataSource.data = this.dataSource.data.filter(e=> e?.DOB==filterValue);
    this.dataSource.filter=filterValue;
    console.log('datasource',this.dataSource.data);
    
    
}

}


