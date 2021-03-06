import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { DevicePage } from '../device/device';
import { BLE } from '@ionic-native/ble';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  private devices;
  private isScanning = false;

  constructor(public navCtrl: NavController) {
    this.navCtrl = NavController;
    this.devices = [];
    this.isScanning = false;

  }

  startScanning() {
    console.log("Scaning Started");
    this.devices = [];
    this.isScanning = true;
    BLE.enable();
    BLE.startScan([]).subscrible(device => {
      this.devices.push(device);
    });

    setTimeout(() => {
      BLE.stopScan().then(() => {
        console.log("Scanning has stopped");
        console,log(JSON.stringify(this.devices));
        this.isScanning = false;
      });
    },3000);
  }

  connectToDevice(device) {
    console.log("Connect To Device");
    console.log(JSON.stringify(device));
    this.navCtrl.push(DevicePage,{
      device:device
    });
  }

}
