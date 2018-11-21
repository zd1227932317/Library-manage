import { Component, OnInit, ViewChild } from '@angular/core';
import { GetServiceService } from '../../serivces/get-service.service';
import{EditModuleComponent}from'../../components/edit-module/edit-module.component';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  categroylist:any[]=[];
  list:any[]=[];
  page={
    pages:[],
    pageIndex:0,
    pageSize:8
  }

  @ViewChild('editmodule')
  editmodule:EditModuleComponent;

  constructor(public get:GetServiceService) { }

  ngOnInit() {
   this.getdata();
  }

  btnadd_onclick()
  {
  
    this.editmodule.show('添加新分类');
  }
  btnedit_onclick(category:string)
  {
    this.editmodule.show('修改分类',category);
  }
  save_onclick()
  {
    this.getdata();
  }

  
  getdata()
  {
    this.get.getdata('http://101.200.58.3/librarywebapi/category/list').subscribe((res)=>{
      console.log(res);
      this.categroylist=res.Data;
      this.list=this.categroylist.splice(0,this.page.pageSize);

      let totalpage=Math.ceil(this.categroylist.length/this.page.pageSize);
      this.page.pages=[];
      for(let i=0;i<totalpage;i++)
      {
        this.page.pages.push(i);
      }

    })
  }

  page_onclick(page:number)
  {
    this.page.pageIndex=page;
    this.list=this.categroylist.slice(this.page.pageIndex*this.page.pageSize,(this.page.pageIndex+1)*this.page.pageSize)
  }


}
