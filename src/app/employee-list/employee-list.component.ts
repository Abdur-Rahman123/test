import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from '../model/Employee';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {

  update!:Employee;

  constructor(public dialog: MatDialog,
    private router: Router){

  }


  employess:Employee[] | any=JSON.parse(localStorage.getItem('dataSource')|| '{}');

  displayedColumns: string[] = ['FullName', 'Email', 'Phone', 'Profession','edit'];
  dataSource = new MatTableDataSource<Employee[]>(this.employess);

  @ViewChild(MatPaginator) paginator:any= MatPaginator;

  isEditClicked:boolean=false;

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
      width: '250px',
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

}

