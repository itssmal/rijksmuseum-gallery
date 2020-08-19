import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Item} from '../interfaces';
import {query} from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class HttpService {


  constructor(private httpservice: HttpClient) {
  }

  fetchAll():Observable<any> {
    return this.httpservice.get<any>('https://www.rijksmuseum.nl/api/en/collection?key=IPWpdpHT&p=1&ps=50&s=relevance&imgonly=true')
  }

  fetch(...params):Observable<any> {
    const page = params[0] || 1
    const resPerPage = params[1] || 50
    const objType = params[2] || ''
    const objMat = params[3] || ''
    const query = params[4] || ''
    const sort = params[5] || ''
    return this.httpservice.get<any>(`https://www.rijksmuseum.nl/api/en/collection?key=IPWpdpHT&p=${page}&ps=${resPerPage}&type=${objType}&material=${objMat}&q=${query}&s=${sort}&imgonly=true`)
  }

  getColDetails(objectNum: string):Observable<any> {
    return this.httpservice.get<any>(`https://www.rijksmuseum.nl/api/en/collection/${objectNum}?key=IPWpdpHT`)
  }

}
