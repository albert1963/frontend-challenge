import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Volume} from "../interfaces/volume";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private http : HttpClient) { }

  readFile(path = ''){
    return this.http.get<Volume[] | Category[]>(path);
  }

}
