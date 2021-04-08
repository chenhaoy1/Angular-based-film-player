import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MylistComponent } from './components/mylist/mylist.component';
import {  DetailsComponent } from './components/details/details.component';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'mylist', component: MylistComponent},
  {path: 'watch',
   children: [
     {path:'', component: DetailsComponent},
     {path: 'movie/:id', component: MovieComponent},
     {path: 'tv/:id', component: TvComponent}
   ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
