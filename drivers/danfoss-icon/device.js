const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER, ThermostatCluster, PowerConfigurationCluster } = require('zigbee-clusters');
const { debug } = require('zigbee-clusters');

debug(true);

class ThermostatDevice extends ZigBeeDevice {
  async onNodeInit({ zclNode }) {
    const currentTemperatureValue = await zclNode.endpoints[1].clusters.thermostat.readAttributes([
      'localTemperature',
    ]);

    console.log(currentTemperatureValue.localTemperature);
  }
}

module.exports = ThermostatDevice;
