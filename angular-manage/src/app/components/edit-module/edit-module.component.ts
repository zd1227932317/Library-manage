import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import{PostServiceService} from '../../serivces/post-service.service';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {
  state:boolean=false;
  headtitle:string='';
  errormessage:string='';
  category:any={
    Image:'',
    Name:'',
    Icon:null
  };
  images:string[]=['image/jpeg','image/png'];
  constructor(public post:PostServiceService) { }

  @Output()
  afterSave:EventEmitter<any>=new EventEmitter<any>();

  ngOnInit() {
    
  
  }
  show(headtitle:string,category?:any)
  {
   
    this.state=true;
    this.headtitle=headtitle;
    if(category)
    {
      this.category=JSON.parse(JSON.stringify(category)); 
      this.category.Icon=null;
    }
    else this.category={
    Image:'',
    Name:'',
    Icon:null
   }
  }

  btnSave_onclick(e)
{
 
  if(this.headtitle=='添加新分类')
  {
    let form:FormData=new FormData();
    form.append('name' , this.category.Name);
    form.append('icon' , this.category.Icon);
    
    this.post.post('http://101.200.58.3/librarywebapi/category/create',form).subscribe((res)=>
    {
     if(res.Code==100)
     {
       this.afterSave.emit();
       this.state=false;
     }
    })
  }
  else
  {
    console.log(this.category);
    let form:FormData=new FormData();
    form.append('name' , this.category.Name);
    form.append('id',this.category.Id);
    form.append('icon' , this.category.Icon);

    this.post.post('http://101.200.58.3/librarywebapi/category/update',form).subscribe((res)=>
    {
     if(res.Code==100)
     {
       this.afterSave.emit();
       this.state=false;
     }
    })

  }

}
file_onchange(e)
{
    this.errormessage='';
    let file=e.target.files[0];
    console.log(file);
    if(!this.images.includes(file.type))
    {
      this.errormessage='文件类型必须为jpg，或png！';
    }
    if(file.size>1024*200)
    {
      this.errormessage='文件大小不能大于200kb!';
    }
    let fr:FileReader=new FileReader();
    fr.onload=(e:any)=>{
      let image=new Image();
      image.src=e.target.result;
      image.onload=(ev:any)=>{ 
        if(image.width!=image.height)
        {
          this.errormessage='图片比例必须为1:1!';
          return;
        }
        this.category.Image=image.src;
        this.category.Icon = file;
      }
    
     
    }
    fr.readAsDataURL(file); 
}


 
 

}
