import { Component, OnInit } from '@angular/core';
import { GetServiceService } from 'src/app/serivces/get-service.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
tbstate:number=0;
tbname:String;
tblist:String[]=['待配送','待归还','其他'];
liststate:String[]=['已取消','待配送','已配送','待归还','已归还'];
list:any[]=[];
showlist:any[]=[];
default:boolean;
sort:boolean=false;
  constructor(public get:GetServiceService) { }

  ngOnInit() {
    this.tbname=this.tblist[this.tbstate];
    this.default=true;
    this.loaddata(0);
  }
  linktb_onclick(index:number)
  {
   this.loaddata(index);
    this.showlist=[];
    this.tbstate=index;
    this.tbname=this.tblist[this.tbstate];
    
    console.log(this.showlist); 
  }
  //加载
  loaddata(index:number)
  {
      
      this.get.getdata('http://101.200.58.3/librarywebapi/Transaction/GetAllBorrowRecords').subscribe((res)=>{
      console.log(res);
      if(res.Code==100)
      {
        this.list=res.Data;
     
        if(index==0)
        {
          this.showlist=this.list.filter((item)=>item.State==1); 
        }
        else if(index==1)
        {
          this.showlist=this.list.filter((item)=>item.State==3); 
        }
        else
        {
          this.showlist=this.list.filter((item)=>item.State==4||item.State==2||item.State==0); 
        }
      }
    })
  }

  //配送 或归还
  optor_onclick(book)
  {
    console.log(book);
    if(book.State==1)
    {
      this.get.getdata('http://101.200.58.3/librarywebapi/Transaction/Distribution',{orderId:book.Id}).subscribe((res)=>{
        if(res.Code==100)
        {
          this.loaddata(0);
        }
      })
    }
    else
    {
      this.get.getdata('http://101.200.58.3/librarywebapi/Transaction/ReturnBook',{orderId:book.Id,bookNumber:book.BookNumber}).subscribe((res)=>{
        if(res.Code==100)
        {
          this.loaddata(1);
        }
      })
    }
    
  }
  search_onclick()
  {
    
  }

}
