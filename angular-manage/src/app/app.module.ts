import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{RouterModule,Routes}from'@angular/router';
import{HttpClientModule} from'@angular/common/http';
import{FormsModule,ReactiveFormsModule} from'@angular/forms';

import { AppComponent } from './app.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { ChangepasswordPageComponent } from './pages/changepassword-page/changepassword-page.component';
import { CountPageComponent } from './pages/count-page/count-page.component';
import { EditModuleComponent } from './components/edit-module/edit-module.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { BookdetailPageComponent } from './pages/bookdetail-page/bookdetail-page.component';
import { NotfoundPageComponent } from './pages/notfound-page/notfound-page.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { PageNavComponent } from './components/page-nav/page-nav.component';
import { InstroageModuleComponent } from './components/instroage-module/instroage-module.component';
import { SortBytimeFiterPipe } from './pipes/sort-bytime-fiter.pipe';

const ROUTES:Routes=[
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginPageComponent},
  {path:'index',component:IndexPageComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomePageComponent},
    {path:'category',component:CategoryPageComponent},
    {path:'detail',component:DetailPageComponent},
    {path:'list',component:ListPageComponent},
    {path:'change',component:ChangepasswordPageComponent},
    {path:'count',component:CountPageComponent},
    {path:'book/:state/:id',component:BookPageComponent},
    {path:'bookdetail/:id',component:BookdetailPageComponent},
    {path:'**',component:NotfoundPageComponent}
  ]},
  {path:'**',component:NotfoundPageComponent}
]
  
@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    LoginPageComponent,
    HomePageComponent,
    CategoryPageComponent,
    DetailPageComponent,
    ListPageComponent,
    ChangepasswordPageComponent,
    CountPageComponent,
    EditModuleComponent,
    BookPageComponent,
    BookdetailPageComponent,
    NotfoundPageComponent,
    PageHeaderComponent,
    PageNavComponent,
    InstroageModuleComponent,
    SortBytimeFiterPipe,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES,{useHash:true}),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
