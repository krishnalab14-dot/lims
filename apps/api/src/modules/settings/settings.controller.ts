import { SettingsService } from './settings.service';

export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  getAll() {
    return this.settingsService.getSettings();
  }

  update(payload: Parameters<SettingsService['updateSettings']>[0]) {
    return this.settingsService.updateSettings(payload);
  }
}
