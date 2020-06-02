import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import { Order } from 'src/app/models/OrderList';
import { CartService } from 'src/app/services/CartService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  orders:Order[];
  totalQuntity:number;
  subTotal:number;

  constructor(private cart:CartService) { }

  ngOnInit(): void {
    this.cart.getCartDataInfo().subscribe((object:Order[])=>{
      this.orders = object;
      this.totalQuntity = object.length;
    });
    this.cart.getCartSubTotalInfo().subscribe((sub:number)=>{
      this.subTotal = sub;
    })
  }

  removeItemFromCart(removed_item:Order)
  {
    var newOrders:Order[]=[];
    this.orders.forEach(o=>{
      if(o.item.object_id!=removed_item.item.object_id)
      {
        newOrders.push(o);
      }
    });
    this.orders = newOrders;
    this.cart.updateCart(this.orders);
  }

  // private updateCartFromCookie()
  // {
  //   var object = this.cookieService.get("order_item");
  //   if(typeof(object!="undefined")&&object.length>0)
  //   {
  //     var response = JSON.parse(object);
  //     this.orders = response["itemList"];
  //     this.totalQuntity = this.orders.length;
  //     this.subTotal = this.calculateSubTotal();
  //   }
  //   else
  //   {
  //     this.totalQuntity = 0;
  //     this.subTotal = 0;
  //   }
  // }

}
