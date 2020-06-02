import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService{

  private SERVER_URL = environment.SERVER_URL;

  constructor(private http:HttpClient) { }

  getAllCategory():Observable<Category[]>
  {
     return this.http.get<Category[]>(this.SERVER_URL+'/category');
  }
}
