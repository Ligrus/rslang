import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settings$: any

  constructor(private settingService: SettingsService) {
  }

  ngOnInit(): void {
    this.settings$ = this.settingService.getCurrentSettings()
  }
}
