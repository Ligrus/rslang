import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent implements OnInit {

  isVisible: boolean = false;
  isOkLoading: boolean = false;

  openAuth() {
    this.isVisible = true;
  }

  handleCancel() {
    this.isVisible = false
  }
  handleOk() {
    this.isVisible = false
  }

  constructor() { }



  ngOnInit(): void {
  }

}
