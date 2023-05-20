import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { product } from '../interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sellerName: string = "";
  searchResult: undefined | product[];
  userName: string = "";
  menuType: string = 'default';

  constructor(private route: Router, private product: ProductService) { }


  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          console.log("in seller area");
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
           this.sellerName = sellerData.name;
          this.menuType = "seller";


        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName= userData.name;
          this.menuType='user';

         
        }

        else {
          console.log("outside seller");
          this.menuType = "default";
        }
      }
    })
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.product.searchProducts(element.value).subscribe((result) => {
        console.log(result);
        if (result.length > 5) {
          result.length = 2;
        }
        this.searchResult = result;
      })
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  submitSearch(val: string) {
    this.route.navigate([`search/${val}`])
  }

  redirectToDetails(val: number) {
    this.route.navigate([`/details/${val}`]);
  }

}
