import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  public data:any;
  public local:any = [];
  public mb: any;
  public d:any=[[], []];
  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }
    if ('watchlist' in localStorage){
      this.local = Object.keys(JSON.parse(localStorage['watchlist']))
      this.data = this.allStorage();
    }
  }
  allStorage() {
    var temp = [];
    var keys = Object.keys(JSON.parse(localStorage['watchlist'])).sort(function(a, b) {
      return JSON.parse(localStorage['watchlist'])[a].time - JSON.parse(localStorage['watchlist'])[b].time
    })
    keys = keys.reverse();

    for(let i = 0; i < keys.length; i++){
      temp.push(JSON.parse(localStorage['watchlist'])[keys[i]]);
      if (temp.length == 6){
        this.d[0].push(temp);
        temp = [];
      }
      this.d[1].push(JSON.parse(localStorage['watchlist'])[keys[i]]);
    }
    if(keys.length < 6 || keys.length % 6 != 0 ){
      this.d[0].push(temp);
    }
    this.d[0] = this.d[0].slice(0, 4);
    this.d[1] = this.d[1].slice(0, 24)
    return this.d;

  }

}
