import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetServiceService } from '../../serivces/get-service.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-bookdetail-page',
  templateUrl: './bookdetail-page.component.html',
  styleUrls: ['./bookdetail-page.component.css']
})
export class BookdetailPageComponent implements OnInit {

  book={
    image:'',
    prview:'',
    isbn:'',
    name:'',
    publishDate:'',
    categoryName:'',
    publisherName:'',
    authorName:'',
    introduce:'',
    detail:[],
  }
  
  constructor(public active:ActivatedRoute,public get:GetServiceService,public location:Location) { }

  ngOnInit() {
  
    this.get.getdata('http://101.200.58.3/librarywebapi/book/single',{id:this.active.snapshot.params['id']}).subscribe((res)=>{
      if(res.Code==100)
      {
        this.book.name=res.Data.Book.Name;
        this.book.isbn=res.Data.Book.ISBN;
        this.book.prview=res.Data.Book.Image;
        this.book.introduce=res.Data.Book.Introduce;
        this.book.categoryName=res.Data.Book.Category.Name;
        this.book.publisherName=res.Data.Book.Publisher.Name;
        this.book.publishDate=res.Data.Book.PublishDate;
        this.book.authorName=res.Data.Book.Author.Name;
        this.book.detail=res.Data.Detail;
        console.log(res);
      }
     
    })

    
  }
  btn_back():void
  {
    this.location.back();
  }

}
