import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable} from 'rxjs';
import { Order } from '../models/OrderList';
import { ProductService } from './ProductService';
import {ToastrService} from 'ngx-toastr';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartTotal$ = new BehaviorSubject<number>(0);
  cartData$ = new BehaviorSubject<Order[]>([]);


  constructor(private prod:ProductService,private toast:ToastrService) {
    let localData:Order[] = JSON.parse(localStorage.getItem('cart'));
    if(localData!=null && localData!=undefined && localData.length>0)
    {
      this.updateCart(localData);
    }
  }


  updateCart(data:Order[])
  {

      data = this.VerifyProducts(data);

      localStorage.setItem('cart',JSON.stringify(data));

      this.cartData$.next(data);
      this.cartTotal$.next(this.calculateSubTotal(data));

      this.toast.info('updated your shopping cart','Item Updated',{
        timeOut:1000,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right',
      });

  }

  getCartDataInfo():Observable<Order[]>{
      return this.cartData$.asObservable();
  }

  getCartSubTotalInfo():Observable<number>{
     return this.cartTotal$.asObservable();
  }

  private calculateSubTotal(orders:Order[])
  {
    var temp = 0;
    orders.forEach(element => {
      temp += element.item.price*element.quntity;
    });
    return temp;
  }

  private VerifyProducts(data:Order[])
  {
    var newOrders:Order[]=[];
    data.forEach(d=>{
      this.prod.getOneProduct(d.item.object_id).subscribe((info:Product)=>{
        if(d.quntity>info.stock)
        {
          this.toast.error('${info.name} out of stock','Out of Stock',{
            timeOut:1000,
            progressBar:true,
            progressAnimation:'increasing',
            positionClass:'toast-top-right',
          });
        }else
        {
          d.item.object_name = info.name;
          d.item.picture_url = info.picture_url[0];
          if(d.item.price!=info.price)
          {
            this.toast.warning('${info.name} price changed from ${d.item.price} to ${info.price}','Price Changed',{
              timeOut:2000,
              progressBar:true,
              progressAnimation:'increasing',
              positionClass:'toast-top-right',
            });
          }
          d.item.price = info.price;
          newOrders.push(d);
        }
      });
    })
    return newOrders;
  }
}
