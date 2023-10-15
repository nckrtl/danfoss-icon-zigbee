const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER, ThermostatCluster, PowerConfigurationCluster } = require('zigbee-clusters');
const { debug } = require('zigbee-clusters');

debug(true);

class ThermostatDevice extends ZigBeeDevice {
  async onNodeInit({ zclNode }) {
    // Read the "localTemperature" attribute from the "thermostat" cluster
    const currentTemperatureValue =
      await zclNode.endpoints.extendedEndpointDescriptors[1].clusters.thermostat.readAttributes(
        'localTemperature'
      );

    console.log(currentTemperatureValue);
  }
}

module.exports = ThermostatDevice;
