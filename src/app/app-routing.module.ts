import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {ItemPageComponent} from './item-page/item-page.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'type/:objType', component: MainPageComponent },
  { path: 'mat/:objMat', component: MainPageComponent },
  { path: 'item/:objNum', component: ItemPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
