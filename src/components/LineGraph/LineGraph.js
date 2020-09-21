import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import PropTypes from 'prop-types';
import { GraphPoint, ToolTip } from './index';
import Theme from '../../constants/theme';

const propTypes = {
  data: PropTypes.array.isRequired,
  graphConfig: PropTypes.object,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  minMaxY: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired
  })
};

const onClick = (point, event) => {
  const pointClasses = document.querySelector(`#${point.data.id}`).classList;
  pointClasses.add('line-graph-point--clicked');
  setTimeout(() => pointClasses.remove('line-graph-point--clicked'), 1000);
};

const pointSymbol = (props) => {
  setTimeout(
    () =>
      document
        .querySelector(`#${props.datum.id}`)
        .classList.remove('line-graph-point--intialized'),
    1000
  );

  return <GraphPoint id={props.datum.id} />;
};

const LineGraph = ({ data, graphConfig = {}, startDate, endDate, minMaxY }) => {
  return (
    <div className={'line-graph'}>
      <div className={'line-graph__heading'}>Temperature Data</div>
      <div className={'line-graph__container'}>
        <ResponsiveLine
          className={'temperature-graph__container'}
          data={data}
          curve={'monotoneX'}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{
            type: 'time',
            format: '%Y-%m-%dT%H:%M:%S.%L%Z',
            useUTC: false,
            min: startDate,
            max: endDate
          }}
          xFormat={'time:%b %d, %Y (%-I %p)'}
          yScale={{
            type: 'linear',
            ...minMaxY,
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
          colors={[Theme.nd_color_primary]}
          lineWidth={3}
          enableArea={true}
          areaBaselineValue={minMaxY.min}
          areaOpacity={0.5}
          enablePoints={true}
          pointSymbol={pointSymbol}
          pointSize={10}
          pointColor={'transparent'}
          pointBorderWidth={2}
          pointBorderColor={'transparent'}
          pointLabelYOffset={-12}
          useMesh={true}
          debugMesh={false}
          onClick={onClick}
          tooltip={ToolTip}
        />
      </div>
    </div>
  );
};

LineGraph.propTypes = propTypes;

export default LineGraph;
