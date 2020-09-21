import React from 'react';
import PropTypes from 'prop-types';
import { Thermometer } from './svg';

const propTypes = {
  fahrenheit: PropTypes.number.isRequired
};

const convertToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
const round = (temperature) => temperature.toFixed(2);

// TODO: Cheating for now and adding thermostat stuff here.  Should change to SidebarPanel later
const Thermostat = ({ fahrenheit }) => {
  return (
    <div className={'sidebar-panel'}>
      <div className={'sidebar__heading'}>5 Second Readings</div>
      <div className={'thermostat'}>
        <span className={'thermostat__thermometer-container'}>
          <span className={'thermostat__max-reading'}>120 ° F</span>
          <Thermometer
            className={'thermostat__thermometer'}
            temperature={fahrenheit}
          />
        </span>
        <span className={'temperature-readings'}>
          <span
            className={
              'temperature_readings__fahrenheit temperature-readings__reading'
            }
          >
            <span className={'temperature-readings__value'}>
              {round(fahrenheit)}
            </span>
            <span className={'temperature-readings__degree-symbol'}>°</span>
            <span className={'temperature-readings__degree-unit'}>F</span>
          </span>
          <span
            className={
              'temperature-readings__celsius temperature-readings__reading'
            }
          >
            <span className={'temperature-readings__value '}>
              {round(convertToCelsius(fahrenheit))}
            </span>
            <span className={'temperature-readings__degree-symbol'}>°</span>
            <span className={'temperature-readings__degree-unit'}>C</span>
          </span>
        </span>
      </div>
    </div>
  );
};

Thermostat.propTypes = propTypes;

export default Thermostat;
