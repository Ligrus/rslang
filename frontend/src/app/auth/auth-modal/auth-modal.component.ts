import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss']
})
export class AuthModalComponent implements OnInit {
  @Input() isOpened: boolean;
  @Input() title: string;
  @Output() toggleModal = new EventEmitter<boolean>();

  isOkLoading: boolean = false;
  authActive: string = 'login'

  handleCancel() {
    this.toggleModal.emit(false)
  }
  handleOk() {
    this.toggleModal.emit(false)
  }

  constructor() { }

  ngOnInit(): void {
  }

}
