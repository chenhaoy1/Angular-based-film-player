import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continue',
  templateUrl: './continue.component.html',
  styleUrls: ['./continue.component.css']
})
export class ContinueComponent implements OnInit {
  public mb:any;
  public data:any;
  public d: any = [[], []]
  constructor() { }

  ngOnInit(): void {

    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }
    this.data = this.allStorage();
  }
  allStorage() {
    var temp = [];
    var keys = Object.keys(JSON.parse(localStorage['continue'])).sort(function(a, b) {
      return JSON.parse(localStorage['continue'])[a].time - JSON.parse(localStorage['continue'])[b].time
    })
    keys = keys.reverse();

    for(let i = 0; i < keys.length; i++){
      temp.push(JSON.parse(localStorage['continue'])[keys[i]]);
      if (temp.length == 6){
        this.d[0].push(temp);
        temp = [];
      }
      this.d[1].push(JSON.parse(localStorage['continue'])[keys[i]]);
    }
    if(keys.length < 6 || keys.length % 6 != 0 ){
      this.d[0].push(temp);
    }
    this.d[0] = this.d[0].slice(0, 4);
    this.d[1] = this.d[1].slice(0, 24)
    return this.d;

  }

}
