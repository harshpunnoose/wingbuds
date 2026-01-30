import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private loading: HTMLIonLoadingElement | null = null;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary',
    duration: number = 2500
  ) {
    const toast = await this.toastCtrl.create({
      message,
      duration,
      position: 'bottom',
      color
    });

    await toast.present();
  }

  async showLoading(message = 'Please wait...') {
    this.loading = await this.loadingCtrl.create({
      message,
      spinner: 'crescent'
    });
    await this.loading.present();
  }

  async hideLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}
