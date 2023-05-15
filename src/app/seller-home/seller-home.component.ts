import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interface';
import {faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit{

  productMessage:undefined|string;
  productList:undefined|product[];
  icon=faTrash;
  editIcon=faEdit;
  
  constructor(private product:ProductService){

  }

  ngOnInit(): void {
  
    this.list();
  }

  deleteProduct(id:number){
    console.log("test id: ",id);
    this.product.deleteProduct(id).subscribe((result)=>{
      if(result){
        this.productMessage="product is deleted";
        this.list();
      }
    })
    setTimeout(()=>{
      this.productMessage=undefined
    },3000)
  }

  list(){
    this.product.productList().subscribe((result)=>{
      console.log(result);
      this.productList=result;
    })
  }
}
