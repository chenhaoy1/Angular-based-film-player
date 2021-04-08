import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { DetailsComponent } from './components/details/details.component';
import { MovieComponent,NgbdModalContent } from './components/movie/movie.component';
import { FormsModule } from '@angular/forms';

import { TvComponent, NgbdModalContenttv } from './components/tv/tv.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListcardComponent } from './listcard/listcard.component';
import { ListcardtvComponent } from './listcardtv/listcardtv.component';
import { FooterComponent } from './components/footer/footer.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { ContinueComponent } from './components/continue/continue.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    MylistComponent,
    DetailsComponent,
    MovieComponent,
    TvComponent,
    CarouselComponent,
    ListcardComponent,
    ListcardtvComponent,
    FooterComponent,
    NgbdModalContent,
    NgbdModalContenttv,
    ContinueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    YouTubePlayerModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
