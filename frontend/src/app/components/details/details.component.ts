import { Component, OnInit, Input } from '@angular/core';
import {NowPlayingService} from '../../services/now-playing.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() data: any;
  public recommend_mv: any = [];
  constructor(private nowPlayingService: NowPlayingService) { }

  ngOnInit(): void {

  }



}
