const { ZigBeeDriver } = require('homey-zigbeedriver');

const RootDevice = require('./device.js');

class Driver extends ZigBeeDriver {
  onMapDeviceClass(device) {
    return RootDevice;
  }
}

module.exports = Driver;
