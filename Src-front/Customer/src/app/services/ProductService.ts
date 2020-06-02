import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{ environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
    providedIn:'root'
})

export class ProductService{

    private SERVER_URL = environment.SERVER_URL;
    constructor(private http:HttpClient)
    {
    }

    //fetch all products from backend
    getAllProducts(pageNumber:number=1)
    {
        return this.http.get(this.SERVER_URL+'/products',{
            params:{
                page:pageNumber.toString()
            }
        });
    }

    getOneProduct(id:String):Observable<Product>
    {
        return this.http.get<Product>(this.SERVER_URL+'/products/'+id);
    }

    getProductsFromCategory(catId:string,pageNumber:number=1)
    {
        return this.http.get(this.SERVER_URL+'/products/category/'+catId,{
            params:{
                page:pageNumber.toString()
            }
        });
    }

    
}