import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private router:Router) { }
  routerId!:any;
  employess:Employee[] | any=JSON.parse(localStorage.getItem('dataSource')|| '{}');
  update!:Employee;

  ngOnInit(): void {
    this.routerId=this.route.snapshot.paramMap.get('id');
    let id:number=parseInt(this.routerId);
    this.update=this.employess.find((e:Employee)=>e.id==id);
    
  }
  backToList(){
this.router.navigate(['dashbord'])
  }

}
