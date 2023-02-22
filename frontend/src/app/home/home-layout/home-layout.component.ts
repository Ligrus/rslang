import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { catchError, pipe } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SettingsService } from 'src/app/settings/services/settings.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
  animations: [
    trigger(
      'animateLogoSwitch', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0ms', style({ opacity: 0 }))
      ])
    ],
    ),
  ],
})
export class HomeLayoutComponent implements OnInit {
  isCollapsed = true

  constructor(private authService: AuthService, private settingsService: SettingsService) { }

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    this.settingsService.fetchSettings().subscribe({
      next: (data) => {
        this.settingsService.setCurrentSettings(data)
      }, error: (err) => {
        debugger
        this.settingsService.setDefaultSettings()
      },
    });
  }
}
