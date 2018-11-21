import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostServiceService } from 'src/app/serivces/post-service.service';

@Component({
  selector: 'app-changepassword-page',
  templateUrl: './changepassword-page.component.html',
  styleUrls: ['./changepassword-page.component.css']
})
export class ChangepasswordPageComponent implements OnInit {
  errormessage:string;
  formModel:FormGroup;
  oldpassword:FormControl;
  newpassword:FormControl;
  confirmpassword:FormControl;
  userid;

  constructor(public post:PostServiceService) {
    this.oldpassword=new FormControl('',[Validators.required,Validators.pattern(/^\d{4}$/)]);
    this.newpassword=new FormControl('',[Validators.required, Validators.pattern(/^\d{4}$/)]);
    this.confirmpassword=new FormControl('',[Validators.required]);
    this.formModel=new FormGroup({
      oldPassword:this.oldpassword,
      newPassword	:this.newpassword,
      confirmpassword:this.confirmpassword
    })

   }

  ngOnInit() {
    this.userid=JSON.parse(sessionStorage.getItem('User')).Id;
    console.log(this.userid);
  }

frm_onsubmit()
{
  console.log(this.formModel);
  this.errormessage='';
  if(this.oldpassword.hasError('required'))
  {
    this.errormessage='原始密码不能为空';
    return;
  }
  else if(this.oldpassword.hasError('pattern'))
  {
    this.errormessage='密码格式不正确';
    return;
  }
  else if(this.newpassword.hasError('required'))
  {
    this.errormessage='新密码不能为空';
    return;
  }
  else if(this.newpassword.hasError('pattern'))
  {
    this.errormessage='密码格式不正确';
    return;
  }
  else if(this.confirmpassword.hasError('required'))
  {
    this.errormessage='请重复密码';
    return;
  }
  this.post.post('http://101.200.58.3/htmlprojectwebapi/account/modifypassword',{id:this.userid,oldPassword:this.formModel.value.oldPassword,newPassword:this.formModel.value.newPassword}).subscribe((res)=>{
    console.log(res);
    if(res.Code==100)
    {
      alert('修改成功');
    }
  })
}
}
