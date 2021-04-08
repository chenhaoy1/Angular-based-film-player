import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {NowPlayingService} from '../../services/now-playing.service';
import { NgbActiveModal, NgbModal, NgbAlert} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'ngbd-modal-content',
  template: `

    <div class="modal-header" style='z-index:99'>
      <h4 class="modal-title" style='color:black; font-size:28px;'>{{name}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" style='color:black; z-index:99'>
      <div class='row'>
        <div class='col-3' *ngIf='mb==false'>
          <img src = 'https://image.tmdb.org/t/p/w500{{poster}}' style="object-fit: cover; width:90%; height:auto;">
        </div>
        <div class='col-12' *ngIf='mb'>
          <img src = 'https://image.tmdb.org/t/p/w500{{poster}}' style="object-fit: cover; width:100%; height:auto;">
        </div>
        <div class='col-9' style='font-size:15px;'>
          <div *ngIf="birthday">Birth: {{birthday}}</div>
          <div *ngIf="birthplace">Birth Place: {{birthplace}}</div>
          <div *ngIf="gender">Gender: {{gender}}</div>
          <div *ngIf="website">Website: <a href='{{website}}' target='_blank'>{{website}}</a></div>
          <div *ngIf="kf">Known for: {{kf}}</div>
          <div *ngIf="aks">Also Known as: {{aks}}</div>
          <br>
          <div>
            <span *ngFor="let d of external">
              <a href='{{d[1][0]}}' target="_blank" class='mr-2'>
                <i class="{{d[1][1]}}" style='font-size:30px; color:{{d[1][2]}}; ' ngbPopover="Visit {{d[0]}}"  triggers="mouseenter:mouseleave" ></i>
              </a>
            </span>
          </div>
        </div>
      </div>
      <div style='font-size:28px; font-weight:500' class='mt-2 mb-2'*ngIf="bio" >Biography</div>
      <div><p>{{bio}}</p></div>
    </div>

  `,
  styles:[]
})
export class NgbdModalContent {
  @Input() Object:any;
  @Input() aks:any;
  @Input() external:any;
  @Input() website:any;
  @Input() mb:any;
  @Input() a:any;
  @Input() kf:any;
  @Input() gender:any;
  @Input() poster:any;
  @Input() bio:any;
  @Input() name:any;
  @Input() birthday:any;
  @Input() birthplace:any;
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-popover-triggers',
  template: ``
})
export class NgbdPopoverTriggers {
}

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', {static: false}) staticAlert: any;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert: any;
  public birthday:any;
  public recommend_mv: any = [];
  public similar_mv: any = [];
  public movie_video: any = [];
  public movie_detail: any = [];
  public movie_cast: any = [];
  public movie_review: any= [];
  public cast_detail: any;
  public website: any;
  public bio: any;
  public alerts: any;
  public id:any;
  public res:any;
  public continue_watch:{[index: string]:any} = {}
  public name:any;
  public pid: any;
  public profile_path: any;
  public title: any;
  public mb:any;
  public danger:any;
  public poster: any;
  public success:any;
  public result: any = {};
  public time:any;
  public continue: any = {};
  public web: any;
  public localmovie = {'id':'', 'poster': '', 'web': '', 'time': 0, 'title':''};
  constructor(private route: ActivatedRoute, private nowPlayingService: NowPlayingService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }

    this.id = this.route.snapshot.paramMap.get('id');
    if('watchlist' in localStorage && this.id in JSON.parse(localStorage['watchlist'])){
      this.success = 'danger';
      this.danger='success';
    }
    else{
      this.success= 'success';
      this.danger = 'danger';
    }
    this.fetchData();

    if(this.success == 'danger'){
      var value = JSON.parse(localStorage['watchlist'])
      var d = new Date();
      value[this.id].time = d.getTime();
      localStorage['watchlist'] = JSON.stringify(value);
    }


    this.continueWatching();

    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

  }
  openLg(profile_path:any, pid:any) {
    const modalRef = this.modalService.open(NgbdModalContent, {size: 'lg', centered:true, scrollable: true});
    this.pid = pid;

    this.nowPlayingService.getCastDetail(this.pid).subscribe(res=>{
      this.res = res;
      modalRef.componentInstance.name = this.res.name;
      modalRef.componentInstance.birthday = this.res.birthday;
      modalRef.componentInstance.birthplace = this.res.place_of_birth;
      modalRef.componentInstance.gender = this.res.gender;
      modalRef.componentInstance.kf = this.res.known_for_department;
      modalRef.componentInstance.aks = this.res.also_known_as;
      modalRef.componentInstance.website = this.res.homepage;
      modalRef.componentInstance.bio = this.res.biography;
      modalRef.componentInstance.mb = this.mb;
    })
    this.nowPlayingService.getCastExternal(this.pid).subscribe(res=>{
      this.res = res;
      modalRef.componentInstance.external = this.res;

    })
    modalRef.componentInstance.poster = profile_path;


  }
  changeSuccessMessage(){
    this._success.next(`Added to watchlist.`);
    this.success = 'danger';
    this.danger='success';
  }
  changeFailMessage(){
    this._success.next(`Removed from watchlist.`);
    this.success = 'success';
    this.danger='danger';
  }
  addStorage(title:any, poster: any, web: any){
    this.localmovie.id = this.id
    this.localmovie.poster = poster;
    this.localmovie.web = web;
    this.localmovie.title = title;
    var d = new Date();
    this.localmovie.time = d.getTime();
    if('watchlist' in localStorage){
      this.result = JSON.parse(localStorage['watchlist']);
    }

    this.result[this.id] = this.localmovie;
    this.nowPlayingService.setItem('watchlist', JSON.stringify(this.result));
}
  deleteStorage(poster: any, web: any){
    this.result = JSON.parse(localStorage['watchlist']);
    delete this.result[this.id];
    this.nowPlayingService.setItem('watchlist', JSON.stringify(this.result));
  }
  fetchData(){
    this.nowPlayingService.getRecommendMv(this.id).subscribe(res=>{
      this.recommend_mv = res;
    })
    this.nowPlayingService.getSimilarMv(this.id).subscribe(res=>{
      this.similar_mv = res;
    })
    this.nowPlayingService.getMovieVideo(this.id).subscribe(res=>{
      this.movie_video = res;
    })
    this.nowPlayingService.getMvDetail(this.id).subscribe(res=>{
      this.movie_detail = res;
    })
    this.nowPlayingService.getMvCast(this.id).subscribe(res=>{
      this.movie_cast = res;
    })
    this.nowPlayingService.getMvReview(this.id).subscribe(res=>{
      this.movie_review = res;
    })

  }

  continueWatching(){
    this.localmovie.id = this.id
    this.nowPlayingService.getMvDetail(this.id).subscribe(res=>{
      this.continue_watch = res;
      this.localmovie.poster = this.continue_watch[0].img;
      this.localmovie.web = this.continue_watch[0].page;
      this.localmovie.title = this.continue_watch[0].title;

    var d = new Date();
    this.localmovie.time = d.getTime();
    if('continue' in localStorage){
      this.continue = JSON.parse(localStorage['continue']);
    }

    this.continue[this.id] = this.localmovie;
    this.nowPlayingService.setItem('continue', JSON.stringify(this.continue));
  })
  }




}
