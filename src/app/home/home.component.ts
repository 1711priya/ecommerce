import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../interface';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent implements OnInit 
{
	//images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts:undefined|product[];
  trendyProducts:undefined|product[];

  //oldPrice: number[] = [];
 

  constructor(private product:ProductService){
   
 
  }

   ngOnInit():void{
    this.product.popularProducts().subscribe((data)=>{
      console.log("popular prod",data);
      this.popularProducts=data;

      // for(let i=0;i<this.popularProducts.length;i++){
      //   this.oldPrice[i]=this.popularProducts[i]['price'];
      //   this.oldPrice[i]=this.oldPrice[i]+200;
      //   // console.log("old price", this.popularProducts[i]['price']);
      //   console.log("old price array:" ,this.oldPrice[i]);       
        
      // }
    });

    this.product.trendyProducts().subscribe((data)=>{
      this.trendyProducts=data;
    });

   }
 
}
