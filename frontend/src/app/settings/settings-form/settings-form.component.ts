import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {finalize, tap } from 'rxjs';
import { Settings } from '../interfaces/settings.interface';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-settings-form',
  templateUrl: './settings-form.component.html',
  styleUrls: ['./settings-form.component.scss']
})
export class SettingsFormComponent implements OnInit {
  @Input() data: unknown
  index: number = 0
  settingsForm: FormGroup;
  settings$: any
  isUpdateInProgress: boolean = false

  constructor(private settingsService: SettingsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data)
    this.initForm(this.data)
  }

  onSubmit() {
    const values = this.settingsForm.value;
    const reqBody = {
      optional: values
    }
    this.isUpdateInProgress = true
    this.settingsService.updateSettings(reqBody).pipe(tap(val => {
      this.settingsService.setCurrentSettings(val)
    }
    ), finalize(() => this.isUpdateInProgress = false)).subscribe()
  }

  initForm(val: any) {
    this.settingsForm = this.fb.group({
      showWordTranslation: [val.optional.showWordTranslation,  [Validators.required]],
      showWordExplanation: [val.optional.showWordExplanation, [Validators.required]],
      showWordTranscription: [val.optional.showWordTranscription, [Validators.required]],
      showWordExample: [val.optional.showWordExample, [Validators.required]],
      playSound: [val.optional.playSound, [Validators.required]],
      isDeleteWordEnabled: [val.optional.isDeleteWordEnabled, [Validators.required]],
      isShowAnswerEnabled: [val.optional.isShowAnswerEnabled, [Validators.required]],
      showImage: [val.optional.showImage, [Validators.required]],
      isAddToHardWordsEnabled: [val.optional.isAddToHardWordsEnabled, [Validators.required]],
      wordsPerDay: [val.optional.wordsPerDay, [Validators.required]],
      newWordsAmount: [val.optional.newWordsAmount, [Validators.required]],
    });
  }

}
