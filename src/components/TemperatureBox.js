import React from 'react';
import PropTypes from 'prop-types';

import LineGraph from './LineGraph';

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

const convertOutputToCoords = (data) => {
  return data.map((event) => ({
    x: event.eventTime,
    y: event.value
  }));
};

const TemperatureBox = ({ temperatureOutput, startDate, endDate }) => {
  return (
    <div className={'temperature-box'}>
      <div className={'temperature-graph'}>
        <LineGraph
          data={[
            {
              id: "ilya's house",
              color: 'hsl(336, 70%, 50%)',
              data: convertOutputToCoords(temperatureOutput)
            }
          ]}
          graphConfig={graphConfig}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

TemperatureBox.propTypes = propTypes;
export default TemperatureBox;
