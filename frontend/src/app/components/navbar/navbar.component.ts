import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';


const SEARCH_URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/multi_search/';

@Injectable()
export class WikipediaService {

  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<any>(SEARCH_URL+term ).pipe(
        map(response => response)
      );
  }
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [WikipediaService],

})
export class NavbarComponent implements OnInit {
  @Input() active: any = ['',''];
  public mb:any;
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: WikipediaService) {}
  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }
  }
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
    formatter = (x: {name: string}) => '';
}
