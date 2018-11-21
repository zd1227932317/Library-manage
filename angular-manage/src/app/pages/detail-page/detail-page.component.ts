import { Component, OnInit,ViewChild } from '@angular/core';
import { GetServiceService } from '../../serivces/get-service.service';
import { Router } from '@angular/router';
import{InstroageModuleComponent} from'../../components/instroage-module/instroage-module.component';


@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.css']
})
export class DetailPageComponent implements OnInit {
  categorylist:string[]=[];
  publisherlist:string[]=[];
  booklist:any[]=[];
  checkbook:any={
    categoryId:'',
    publisherId:'',
    keyword:''
  }
  list:any[]=[];
  page={
    pages:[],
    pageSize:8,
    pageIndex:0
  }
  @ViewChild('instroage')
  instroage:InstroageModuleComponent;

  constructor(public get:GetServiceService,public router:Router) { }


  ngOnInit() {
    /**
     * 加载分类
     */
    this.get.getdata('http://101.200.58.3/librarywebapi/category/list').subscribe((res)=>{
     this.categorylist=res.Data;
    });
    /**
     * 加载出版社
     */
    this.get.getdata('http://101.200.58.3/librarywebapi/publisher/list').subscribe((res)=>{
      this.publisherlist=res.Data;
     });

     /**
     * 加载默认图书列表
     */
    this.search_booklist(this.checkbook);
  }
  /**
   * 图书查询 '筛选'
   */
  search_onclick()
  {
    this.page.pageIndex=0;
    this.search_booklist(this.checkbook);
  }
  /**
   * 添加、编辑、详情点击 
   */
  btnadd_onclick()
  {
    this.router.navigate(['/index/book','0','']);
  } 
  btnedit_onclick(Id)
  {
    this.router.navigate(['/index/book','1',Id]);
  }
  btninfo_onclick(Id)
  {
    this.router.navigate(['/index/bookdetail',Id]);
  }

  /**
   * 函数功能  被调用的时候 接受参数 并进行查询或筛选
   * @param checkbook 
   */
  search_booklist(checkbook)
  {
    this.get.getdata('http://101.200.58.3/librarywebapi/book/list',checkbook).subscribe((res)=>{
      console.log(this.checkbook,res);
      this.booklist=res.Data;
      this.list=this.booklist.slice(0,this.page.pageSize);

      //生成页码
      let totalPage=Math.ceil(this.booklist.length/this.page.pageSize);
      this.page.pages=[];
      for(let i=0;i<totalPage;i++)
      {
        this.page.pages.push(i);
      }
    })
  }
  /**
   * 点击页码换页
   * @param page 
   */
  page_onclick(page:number):void
  {
    this.page.pageIndex=page;
    this.list=this.booklist.slice(this.page.pageIndex*this.page.pageSize,(this.page.pageIndex+1)*this.page.pageSize)
  }

  btninstroage_onclick(id)
  {
    this.instroage.show(id);
  }
  Save_onclick()
  {
    this.search_booklist(this.checkbook);
  }
}
