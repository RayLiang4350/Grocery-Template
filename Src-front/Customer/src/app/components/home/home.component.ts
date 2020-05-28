import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/ProductService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[]=[];

  constructor(private productService:ProductService,private router:Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((prods:any[])=>
      {
        this.products = prods;
      })
  }

  selectProduct(id:Object){
    this.router.navigate(['/product',id.toString()]).then();
  }

}
