import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent implements OnInit {

  showTable:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  createEmployee():void{
    this.showTable=false;
  }

  showEmployee():void{
    this.showTable=true;
  }

}
