import { Injectable } from '@angular/core';
import { RemoteConfig, fetchAndActivate, getValue } from '@angular/fire/remote-config';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  
  constructor(private remoteConfig: RemoteConfig) {}

  async loadFlags(): Promise<void> {
    await fetchAndActivate(this.remoteConfig);
  }

  isCategoryFeatureEnabled(): boolean {
    return getValue(this.remoteConfig, 'enable_categories').asBoolean();
  }

}
