import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpService} from '../shared/services/http.service';
import {Observable} from 'rxjs';
import {DetailedItem} from '../shared/interfaces';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.css']
})
export class ItemPageComponent implements OnInit {
  objNum: string
  item$: Observable<any>
  item: DetailedItem

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: HttpService) { }

  ngOnInit(): void {
    this.objNum = this.activatedRoute.snapshot.params.objNum
    this.http.getColDetails(this.objNum).subscribe(
      (item) => {
        console.log(item.artObject)
        this.item = item.artObject
      }
    )
  }

  openCategory(objType: string) {
    this.router.navigate([`type/${objType}`])
  }

  openMaterial(objMat: string) {
    console.log(objMat)
    this.router.navigate([`mat/${objMat}`])
  }
}
