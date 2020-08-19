import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {DetailedItem, Item} from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {

  favItems: DetailedItem[] = []


  constructor(private http: HttpService) {
  }

  addItem(item) {
    item.favourite = true
    this.favItems.push(item)
    return this.favItems
  }

  getItems() {
    return this.favItems
  }

  removeItem(item) {
    item.favourite = false
    return this.favItems.filter(b => item === b)
  }

}
