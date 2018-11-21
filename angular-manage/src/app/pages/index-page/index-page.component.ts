import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.css']
})
export class IndexPageComponent implements OnInit {
  username:string;
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
