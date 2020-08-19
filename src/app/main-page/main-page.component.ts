import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HttpService} from '../shared/services/http.service';
import {DetailedItem, Item} from '../shared/interfaces';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {FavouritesService} from '../shared/services/favourites.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: []
})
export class MainPageComponent implements OnInit {
  items$: Observable<any>
  items: Item [] = []
  favItems: DetailedItem[] = []
  pages: [
    {page: 1}, {page: 2}, {page: 3}, {page: 4}, {page: 5}, {page: 6}, {page: 7}, {page: 8}, {page: 9}
  ]
  page = 1
  resPerPage = 50;
  query = ''
  sortType = 'relevance'
  count: number
  detailedItem: DetailedItem;
  objType: string
  objMat: string
  favMode = false
  noFavMes: string

  constructor(private http: HttpService,
              private modal: NgbModal,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private favService: FavouritesService) {
  }


  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot)
    if (this.activatedRoute.snapshot.params.objType) {
      this.objType = this.activatedRoute.snapshot.params.objType
      this.http.fetch(1, this.resPerPage, this.objType, this.objMat, this.query, this.sortType).subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    } else if (this.activatedRoute.snapshot.params.objMat) {
      this.objMat = this.activatedRoute.snapshot.params.objMat
      this.http.fetch(1, this.resPerPage, this.objType, this.objMat, this.query, this.sortType).subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    } else {
      this.http.fetchAll().subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    }
  }

  changePage(page: number) {
    this.items = []
    if (page !== this.page) {
      this.http.fetch(page, this.resPerPage, this.objType, this.objMat, this.query, this.sortType).subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    }
    this.page = page
  }

  changeResPerPage(number: number) {
    if (number !== this.resPerPage) {
      this.resPerPage = number
      this.http.fetch(this.page, this.resPerPage, this.objType, this.objMat, this.query, this.sortType).subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    }
  }

  search() {
    this.items = []
    if (this.query !== '') {
      this.http.fetch(this.page, this.resPerPage, this.query, this.sortType).subscribe(
        (items) => {
          this.items = items.artObjects
        }
      )
    }
  }

  sort() {
    this.items = []
    this.http.fetch(this.page, this.resPerPage, this.objType, this.objMat, this.query, this.sortType).subscribe(
      (items) => {
        this.items = items.artObjects
      }
    )
  }

  openModal(content, objNum) {
    this.http.getColDetails(objNum).subscribe(
      (item) => {
        this.detailedItem = item.artObject
        console.log(item.artObject)
      }
    )
    this.modal.open(content,{backdropClass: 'blurred', size: 'xl', centered: true, keyboard: false, backdrop: 'static'})
  }

  openDetails(objNum: string) {
    this.modal.dismissAll()
    this.router.navigate([`item/${objNum}`])
  }

  toggleFav() {
    this.favMode = !this.favMode
    let result = this.favService.getItems()
    if (result.length !== 0) {
      this.favItems = result
    } else {
      this.favItems = []
      this.noFavMes = 'No favourites yet!'
    }
  }

  toggleToFav(item: DetailedItem) {
    if (item.favourite === true) {
      this.favItems = this.favService.removeItem(item)
    } else {
      this.favItems = this.favService.addItem(item)
    }
  }
}
