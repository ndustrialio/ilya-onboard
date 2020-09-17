import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';

const propTypes = {
  data: PropTypes.array.isRequired,
  graphConfig: PropTypes.object,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired
};

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const LineGraph = ({ data, graphConfig = {}, startDate, endDate }) => {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{
        type: 'time',
        format: '%Y-%m-%dT%H:%M:%S.%L%Z',
        useUTC: false,
        min: startDate,
        max: endDate
      }}
      xFormat={'time:%Y-%m-%dT%H:%M:%S.%L%Z'}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: false,
        reverse: false
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        ...{
          orient: 'bottom',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: 36,
          legendPosition: 'middle',
          format: '%b %d ',
          tickValues: 'every 1 days'
        },
        ...graphConfig.axisBottom
      }}
      axisLeft={{
        ...{
          orient: 'left',
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendOffset: -40,
          legendPosition: 'middle'
        },
        ...graphConfig.axisLeft
      }}
      colors={{ scheme: 'nivo' }}
      pointSize={10}
      // pointColor={{theme: 'background'}}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="y"
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  );
};

LineGraph.propTypes = propTypes;

export default LineGraph;
