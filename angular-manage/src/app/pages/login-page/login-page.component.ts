import { Component, OnInit } from '@angular/core';
import{PostServiceService}from'../../serivces/post-service.service';
import { Router } from '@angular/router';
import{FormGroup,FormControl,Validators}from'@angular/forms';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
state:boolean=true;

errormessage:string;
formModel:FormGroup;
txtPhone:FormControl;
txtPassword:FormControl;

  constructor(public router:Router,public post:PostServiceService) { 
    this.txtPhone=new FormControl('',[Validators.required , Validators.pattern('1[35789][0-9]{9}')]);
    this.txtPassword=new FormControl('',[Validators.required , Validators.pattern(/^\d{4}$/)]);
    this.formModel=new FormGroup({
      phone:this.txtPhone,
      password:this.txtPassword
    });
  }

  ngOnInit() {
  }

  frm_onsubmit():void
  {
    console.log(this.formModel);
    //验证
    this.errormessage='';
    if(this.txtPhone.hasError('required'))
    {
      this.errormessage='手机号码不能为空.';
      return;
    }
    else if(this.txtPhone.hasError('pattern'))
    {
      this.errormessage='手机号码格式不正确.';
      return;
    }
    else if(this.txtPassword.hasError('required'))
    {
      this.errormessage='密码不能为空.';
      return;
    }
    else if(this.txtPassword.hasError('pattern'))
    {
      this.errormessage='密码格式不正确.';
      return;
    }
      this.post.post('http://101.200.58.3/htmlprojectwebapi/account/login',this.formModel.value).subscribe((res)=>{
      console.log(res);
      if(res.Code==100)
      {
        sessionStorage.setItem('User',JSON.stringify(res.Data));
        this.router.navigate(['/index']);
      }
      else{
        this.errormessage='用户信息不正确.';
      return;
      }
    })
  }
}
