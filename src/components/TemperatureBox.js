import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { LineGraph } from './LineGraph/';
import { Sidebar, Thermostat } from './index';

const propTypes = {
  temperatureOutput: PropTypes.array.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

const graphConfig = {
  axisBottom: {
    legend: 'date'
  },
  axisLeft: {
    legend: 'temperature'
  }
};

const convertOutputToGraphPointData = (data) => {
  return data.map((event) => ({
    x: event.eventTime,
    y: Number.parseFloat(event.value).toFixed(2),
    id: 'point' + event.eventTime.replace(/\.|:|-/gi, '')
  }));
};

const getMinMaxYValues = (values) => {
  let min = values[0];
  let max = values[0];

  values.forEach((value) => {
    min = value < min ? value : min;
    max = value > max ? value : max;
  });

  return { min: min - 10, max: max + 10 };
};

const TemperatureBox = ({ temperatureOutput, startDate, endDate }) => {
  const [temperature, setTemperature] = useState(Math.random() * 120);

  useEffect(() => {
    setInterval(() => {
      setTemperature(Math.random() * 120);
    }, 5000);
  }, [temperatureOutput]);

  return (
    <div className={'temperature-box'}>
      <Sidebar
        render={() => {
          return <Thermostat fahrenheit={temperature} />;
        }}
      />
      <div className={'temperature-graph'}>
        <LineGraph
          data={[
            {
              id: 'ilya-house',
              color: 'hsl(336, 70%, 50%)',
              data: convertOutputToGraphPointData(temperatureOutput)
            }
          ]}
          graphConfig={graphConfig}
          startDate={startDate}
          endDate={endDate}
          minMaxY={getMinMaxYValues(
            temperatureOutput.map((event) => event.value)
          )}
        />
      </div>
    </div>
  );
};

TemperatureBox.propTypes = propTypes;
export default TemperatureBox;
