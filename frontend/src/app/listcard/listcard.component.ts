import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listcard',
  templateUrl: './listcard.component.html',
  styleUrls: ['./listcard.component.css']
})
export class ListcardComponent implements OnInit {
  @Input() data: any;
  public mb: any;

  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth > 500){
      this.mb = false;
    }
    else{
      this.mb = true;
    }

  }

}
