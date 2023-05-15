import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import {Router} from '@angular/router';
import { SignUp } from '../interface';


@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit{
  constructor(private seller:SellerService,private router:Router){}
  showLogin=false;
  authErr:string='';

  ngOnInit():void{
    this.seller.reloadSeller();
  }
  login(data:SignUp):void{
   // console.log("data: ",data);
   this.authErr="";
    this.seller.userLogin(data);
    this.seller.isLoginError.subscribe((isErr)=>{
      if(isErr){
        this.authErr="Invalid credentials";
      }
    })
  }
  signUp(data:SignUp):void{
    this.seller.userSignUp(data);
  }
  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;

  }
}
