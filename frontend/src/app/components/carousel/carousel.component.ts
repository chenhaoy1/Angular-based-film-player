import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';


@Component({selector: 'ngbd-carousel-pause', templateUrl: './carousel.component.html', styleUrls: ['./carousel.component.css']})
export class CarouselComponent implements OnInit {
  @Input() data: any;
  public mb: any;
  paused = false;
  unpauseOnArrow = false;

  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }
  }
  @ViewChild('mycarousel', {static : true}) carousel: any;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
