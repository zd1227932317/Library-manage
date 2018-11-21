import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import{PostServiceService} from '../../serivces/post-service.service';
@Component({
  selector: 'app-instroage-module',
  templateUrl: './instroage-module.component.html',
  styleUrls: ['./instroage-module.component.css']
})
export class InstroageModuleComponent implements OnInit {
  state:boolean=false;
  bookNumber:any;
  bookId:string;
  constructor(public post:PostServiceService) { }
  @Output()
  afterSave:EventEmitter<any>=new EventEmitter<any>();

  ngOnInit() {
  }
  show(bookid:string)
  {
    this.bookId=bookid;
    this.state=true;
  }
  btnSave_onclick(e:any)
  {
    let form:FormData=new FormData();
    form.append('count',this.bookNumber);
    form.append('bookId',this.bookId);
    console.log(this.bookNumber,this.bookId);
    this.post.post('http://101.200.58.3/librarywebapi/book/putaway',form).subscribe((res)=>{
     if(res.Code==100)
     {
      this.afterSave.emit();
      this.state=false;
     }
    })
    
  }
}
