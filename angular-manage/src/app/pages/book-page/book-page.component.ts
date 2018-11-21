import { Component, OnInit } from '@angular/core';
import { GetServiceService } from '../../serivces/get-service.service';
import { Location } from '@angular/common';
import { PostServiceService } from '../../serivces/post-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  headtitle: string = '';
  categorylist: string[] = [];
  publisherlist: string[] = [];
  authorlist: string[] = [];
  errormessage: string = '';
  images: string[] = ['image/jpeg', 'image/png'];
  book = {
    image: '',
    prview: '',
    isbn: '',
    name: '',
    publishDate: '',
    categoryId: '',
    publisherId: '',
    authorId: '',
    introduce: ''
  }


  constructor(public get: GetServiceService, public location: Location, public post: PostServiceService, public Router: Router, public active: ActivatedRoute) { }

  ngOnInit() {
    this.get.getdata('http://101.200.58.3/librarywebapi/category/list').subscribe((res) => {
      console.log(res);
      this.categorylist = res.Data;

    });
    this.get.getdata('http://101.200.58.3/librarywebapi/publisher/list').subscribe((res) => {
      console.log(res);
      this.publisherlist = res.Data;
    });
    this.get.getdata('http://101.200.58.3/librarywebapi/author/list').subscribe((res) => {
      console.log(res);
      this.authorlist = res.Data;
    })
    if (this.active.snapshot.params['state'] != 0) {
      this.headtitle = '修改图书信息';
      this.get.getdata('http://101.200.58.3/librarywebapi/book/single', { id: this.active.snapshot.params['id'] }).subscribe((res) => {
        if (res.Code == 100) {
          console.log(res);
          this.book.name = res.Data.Book.Name;
          this.book.isbn = res.Data.Book.ISBN;
          this.book.prview = res.Data.Book.Image;
          this.book.introduce = res.Data.Book.Introduce;
          this.book.categoryId = res.Data.Book.Category.Id;
          this.book.publisherId = res.Data.Book.Publisher.Id;
          this.book.publishDate = res.Data.Book.PublishDate;
          this.book.authorId = res.Data.Book.Author.Id;
        }
      })
    }
    else {
      this.headtitle = '添加新书';
    }

  }
  btn_back() {
    this.location.back();
  }

  file_onchange(e) {
    this.errormessage = '';
    let file = e.target.files[0];
    if (file.size > 1024 * 200) {
      this.errormessage = '文件大小不能大于200kb!';
    }
    if (!this.images.includes(file.type)) {
      this.errormessage = '文件格式必须为jpeg或png';
    }
    let fr: FileReader = new FileReader();
    fr.onload = (e: any) => {
      let img = new Image();
      img.src = e.target.result;
      img.onload = (ev: any) => {
        if (img.width != img.height) {
          this.errormessage = '宽高必须为1:1!';
          return;
        }
        this.book.prview = img.src;
        this.book.image = file;
      }

    }
    fr.readAsDataURL(file);
  }
  btn_confirm() {
    if (this.active.snapshot.params['state'] == 0) {
      let form: FormData = new FormData();
      form.append('name', this.book.name);
      form.append('isbn', this.book.isbn);
      form.append('publishDate', this.book.publishDate);
      form.append('categoryId', this.book.categoryId);
      form.append('publisherId', this.book.publisherId);
      form.append('authorId', this.book.authorId);
      form.append('introduce', this.book.introduce);
      form.append('image', this.book.image);
      
      this.post.post('http://101.200.58.3/librarywebapi/book/create', form).subscribe((res) => {

        console.log(res);
        if (res.Code == 100) {
          this.Router.navigate(['/index/detail']);
        }
      })
    }
    else {
      let form: FormData = new FormData();
      form.append('id', this.active.snapshot.params['id']);
      form.append('isbn', this.book.isbn);
      form.append('name',this.book.name);
      form.append('publishDate', this.book.publishDate);
      form.append('categoryId', this.book.categoryId);
      form.append('publisherId', this.book.publisherId);
      form.append('authorId', this.book.authorId);
      form.append('introduce', this.book.introduce);
      form.append('image', this.book.image);
    
      this.post.post('http://101.200.58.3/librarywebapi/book/update', form).subscribe((res) => {
        console.log(res);
        if(res.Code==100)
        {
          this.Router.navigate(['/index/detail']);
        }
      })
    }


  }
}
