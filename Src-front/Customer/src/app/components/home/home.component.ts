import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/ProductService';
import {CategoryService} from '../../services/CategoryService'
import { Router } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import{ NgxSpinnerService } from 'ngx-spinner';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Product[]=[];
  categories: Category[]=[];

  constructor(private spinner:NgxSpinnerService,private cart:CartService,private productService:ProductService,private categoryService:CategoryService,private router:Router) { }

  ngOnInit(): void {
    this.spinner.show();
    this.productService.getAllProducts().subscribe((prods:Product[])=>{
      this.products = prods;
    }
    );
    this.categoryService.getAllCategory().subscribe((cat:Category[])=>{
      this.categories = cat;
    });
    this.spinner.hide();
  }

  selectProduct(id:Object){
    this.router.navigate(['/product',id.toString()]).then();
  }

  addToCart(p:Product,quntity:number){
    var response = localStorage.getItem('cart');
    var newItem = {object_id:p._id,picture_url:p.picture_url[0],price:p.price,object_name:p.name};
    if(typeof(response)!="undefined"&&response!=null)
    {
      var order = JSON.parse(response);
      var found = false;
      order.forEach(element => {
        if(element.item.object_id==p._id)
        {
          element.quntity+=quntity;
          found = true;
        }
      });
      if(!found)
      {
        var newResult = {item:newItem,quntity:quntity};
        order.push(newResult);
      }
      this.cart.updateCart(order);
    }
    else
    {
      var result = [{item:newItem,quntity:quntity}];
      this.cart.updateCart(result);
    }
  }

}
