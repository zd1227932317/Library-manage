import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent implements OnInit {
username:string
  constructor(public router:Router) { }

  ngOnInit() {
    this.username=JSON.parse(sessionStorage.getItem('User')).TrueName;
  }
  linkout_onclick()
  {
    sessionStorage.removeItem('User');
    this.router.navigate(['/login']);

  }
}
