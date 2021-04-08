import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listcardtv',
  templateUrl: './listcardtv.component.html',
  styleUrls: ['./listcardtv.component.css']
})
export class ListcardtvComponent implements OnInit {
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
