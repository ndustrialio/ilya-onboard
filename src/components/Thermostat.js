import React from 'react';
import PropTypes from 'prop-types';
import { Thermometer } from './svg';

const propTypes = {
  fahrenheit: PropTypes.number.isRequired
};

const convertToCelcius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

// TODO: Cheating for now and adding thermostat stuff here.  Should change to SidebarPanel later
const Thermostat = ({ fahrenheit }) => {
  return (
    <div className={'sidebar-panel'}>
      <div className={'sidebar__heading'}>30 Second Reading</div>
      <div className={'thermostat'}>
        <span className={'thermostat__thermometer-container'}>
          <Thermometer
            className={'temperature-box__thermometer'}
            temperature={fahrenheit}
          />
        </span>
        <span className={'temperature-readings'}>
          <span className={'fahrenheit-temperature temperature-reading'}>
            <span className={'temperature-reading__value'}>{fahrenheit}</span>
            <span className={'temperature-reading__degree-symbol'}>°</span>
            <span className={'temperature-reading__degree-unit'}>F</span>
          </span>
          <span className={'celcius-temperature temperature-reading'}>
            <span className={'temperature-reading__value '}>
              {convertToCelcius(fahrenheit)}
            </span>
            <span className={'temperature-reading__degree-symbol'}>°</span>
            <span className={'temperature-reading__degree-unit'}>C</span>
          </span>
        </span>
      </div>
    </div>
  );
};

Thermostat.propTypes = propTypes;

export default Thermostat;
