import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() isOpened: boolean;
  @Input() title: string;
  @Output() toggleModal = new EventEmitter<boolean>();

  isOkLoading: boolean = false;

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
