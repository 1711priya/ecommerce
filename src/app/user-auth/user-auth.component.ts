import { Component, OnInit } from '@angular/core';
import { Login, SignUp } from '../interface';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit{

  showLogin:boolean=true;
  authError:string="";
  constructor(private user:UserService){}

  ngOnInit(): void {
   this.user.userAuthReload();
  }

  signUp(data:SignUp){
    
    this.user.userSignUp(data);

  }
 login(data:Login){
  console.log(data);
  this.user.userLogin(data);
  this.user.invalidUserAuth.subscribe((result)=>{
    console.log("apple",result);
    if(result){
      this.authError="Please enter valid user details";
    }
    
  })
 }
 openLogin(){
  this.showLogin=true;
 }
 openSignup(){
  this.showLogin=false;

 }
}
