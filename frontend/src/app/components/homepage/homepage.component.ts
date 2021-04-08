import { Component, OnInit, ViewChild} from '@angular/core';
import {NowPlayingService} from '../../services/now-playing.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  public local: any = [];
  public mb: any;
  public localdata:any;
  public d: any = [[], []];
  public nowplaying: object = {};
  public popularmv: any = [];
  public populartv: any = [];
  public topratedtv: any = [];
  public topratedmv: any = [];
  public trendingmv: any = [];
  public trendingtv: any = [];
  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }


    if('continue' in localStorage){
      this.local = Object.keys(JSON.parse(localStorage['continue']))
      this.localdata = this.allStorage();
    }


    this.fetchData();
  }

  fetchData(){
    this.nowPlayingService.getNowPlaying().subscribe(res => {
      this.nowplaying = res;
    })
    this.nowPlayingService.getPopularMv().subscribe(res => {
      this.popularmv = res;
    })
    this.nowPlayingService.getPopularTv().subscribe(res => {
      this.populartv = res;
    })
    this.nowPlayingService.getTopRatedTv().subscribe(res => {
      this.topratedtv = res;
    })
    this.nowPlayingService.getTopRatedMv().subscribe(res => {
      this.topratedmv = res;
    })
    this.nowPlayingService.getTrendingMv().subscribe(res => {
      this.trendingmv = res;
    })
    this.nowPlayingService.getTrendingTv().subscribe(res => {
      this.trendingtv = res;
    })

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

