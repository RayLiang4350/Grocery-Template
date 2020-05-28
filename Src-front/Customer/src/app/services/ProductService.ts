import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import{ environment } from '../../environments/environment';

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

    
}