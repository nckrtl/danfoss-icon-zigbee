const { ZigBeeDevice } = require('homey-zigbeedriver');
const { CLUSTER, ThermostatCluster } = require('zigbee-clusters');
const { debug } = require('zigbee-clusters');

// debug(true);

class ThermostatDevice extends ZigBeeDevice {
  async onNodeInit({ zclNode }) {
    this.registerCapability('measure_temperature', ThermostatCluster, {
      get: 'localTemperature',
      report: 'localTemperature',
      getParser(value) {
        var localTemperature = value / 100;
        this.setCapabilityValue('measure_temperature', localTemperature).catch(this.error);
        return localTemperature;
      },
      reportParser(value) {
        var localTemperature = value / 100;
        this.setCapabilityValue('measure_temperature', localTemperature).catch(this.error);
        return localTemperature;
      },
      reportOpts: {
        configureAttributeReporting: {
          minInterval: 0, // No minimum reporting interval
          maxInterval: 60000, // Maximally every ~16 hours
          minChange: 1, // Report when value changed by 5
        },
      },
      endpoint: 1, // Default is 1
      getOpts: {
        getOnStart: true,
        getOnOnline: true,
        pollInterval: 10000, // in ms
      },
    });

    this.registerCapability('target_temperature', ThermostatCluster, {
      get: 'occupiedHeatingSetpoint',
      report: 'occupiedHeatingSetpoint',
      getParser(value) {
        var occupiedHeatingSetpoint = value / 100;
        this.setCapabilityValue('target_temperature', occupiedHeatingSetpoint).catch(this.error);
        return occupiedHeatingSetpoint;
      },
      reportParser(value) {
        const occupiedHeatingSetpoint = value / 100;
        this.setCapabilityValue('target_temperature', occupiedHeatingSetpoint).catch(this.error);
        return occupiedHeatingSetpoint;
      },
      set: 'setSetpoint',
      async setParser(value) {
        await zclNode.endpoints[1].clusters.thermostat.writeAttributes({
          occupiedHeatingSetpoint: value * 100,
        });

        // const currentTargetTemperature =
        // await zclNode.endpoints[1].clusters.thermostat.readAttributes([
        //   'occupiedHeatingSetpoint',
        // ]);
        // const currentTemperature = currentTargetTemperature.occupiedHeatingSetpoint / 100;

        // var newOccupiedHeatingSetpoint = value;
        // this.setCapabilityValue('target_temperature', newOccupiedHeatingSetpoint).catch(this.error);

        // return {
        //   amount: (newOccupiedHeatingSetpoint - currentTemperature) * 100,
        // };
      },
      reportOpts: {
        configureAttributeReporting: {
          minInterval: 0, // No minimum reporting interval
          maxInterval: 60000, // Maximally every ~16 hours
          minChange: 1, // Report when value changed by 5
        },
      },
      endpoint: 1, // Default is 1
      getOpts: {
        getOnStart: true,
        getOnOnline: true,
        pollInterval: 10000, // in ms
      },
    });
  }
}

module.exports = ThermostatDevice;
