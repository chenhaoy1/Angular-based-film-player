import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NowPlayingService {

  constructor(private httpClient: HttpClient) { }
  getNowPlaying(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/now_playing'
    return this.httpClient.get(URL);
  }
  getPopularMv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/popular_movie'
    return this.httpClient.get(URL);
  }
  getPopularTv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/popular_tv'
    return this.httpClient.get(URL);
  }
  getTopRatedTv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/top_rated_tv'
    return this.httpClient.get(URL);
  }
  getTopRatedMv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/top_rated'
    return this.httpClient.get(URL);
  }
  getTrendingMv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/trending_movie'
    return this.httpClient.get(URL);
  }
  getTrendingTv(){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/trending_tv'
    return this.httpClient.get(URL);
  }
  getRecommendMv(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/recommend_mv/' + id;
    return this.httpClient.get(URL);
  }
  getRecommendTv(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/recommend_tv/' + id;
    return this.httpClient.get(URL);
  }
  getSimilarMv(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/similar_mv/' + id;
    return this.httpClient.get(URL);
  }
  getSimilarTv(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/similar_tv/' + id;
    return this.httpClient.get(URL);
  }
  getMovieVideo(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/movie_video/' + id;
    return this.httpClient.get(URL);
  }
  getTvVideo(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/tv_video/' + id;
    return this.httpClient.get(URL);
  }
  getMvDetail(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/movie_detail/' + id;
    return this.httpClient.get(URL);
  }
  getTvDetail(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/tv_detail/' + id;
    return this.httpClient.get(URL);
  }
  getMvCast(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/movie_cast/' + id;
    return this.httpClient.get(URL);
  }
  getMvReview(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/movie_review/' + id;
    return this.httpClient.get(URL);
  }
  getCastDetail(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/cast_detail/' + id;
    return this.httpClient.get(URL);
  }
  getCastExternal(id: any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/cast_external/' + id;
    return this.httpClient.get(URL);
  }
  getTvReview(id:any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/tv_review/' + id;
    return this.httpClient.get(URL);
  }
  getTvCast(id:any){
    let URL = 'https://chenhao-films-player.wl.r.appspot.com/apis/tv_cast/' + id;
    return this.httpClient.get(URL);
  }
  public setItem(key: any, value: any) {
    localStorage.setItem(key, value);
  }

  public getItem(key: any){
    return localStorage.getItem(key)
  }
  public removeItem(key:any) {
    localStorage.removeItem(key);
  }
  public clear(){
    localStorage.clear();
  }
}
