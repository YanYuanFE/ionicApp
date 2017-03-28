import {Component} from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';

import { BLE } from '@ionic-native/ble';

@Component({
  templateUrl: 'device.html'
})

export class DevicePage {
  static get parameters() {
    return [[NavParams],[NavController]];
  }
  private nav;
  private NavParams;
  private connecting;
  private characteristics;
  

  constructor(public navParams: NavParams,public nav) {
    this.nav = nav;
    this.navParams = navParams;

    this.device = this.navParams.get('device');
    this.connecting = true;
    this.connect(this.device.id);
}

connect(deviceID) {
  this.characteristics = [];

  BLE.connect(deviceID).subscribe(peripheralData => {
    console.log(peripheralData.characteristics);
    this.characteristics = peripheralData.characteristics;
    this.connecting = false;
  },
  peripheralData => {
    console.log('disconnected');
  });
}



connectToCharacteristic(deviceID,characteristic) {
  console.log('Connect To Characteristic');
  console.log(deviceID);
  console.log(characteristic);
}

}