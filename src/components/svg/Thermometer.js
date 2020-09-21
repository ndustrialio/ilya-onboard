import React from 'react';
import PropTypes from 'prop-types';

const initialHeight = 157.211;
const initialY = 8.98;
const initialYTranslate = 0;

const propTypes = {
  className: PropTypes.string,
  fillColorLight: PropTypes.string,
  fillColorDark: PropTypes.string,
  temperature: PropTypes.number.isRequired
};

class ThermometerSVG extends React.Component {
  constructor(props) {
    super(props);
    this.temperatureBar = React.createRef();
    this.state = {
      height: initialHeight,
      y: initialY,
      yTranslate: initialYTranslate
    };
  }

  updateTemperature = (nextTemp) => {
    const { height, y, yTranslate } = this.state;
    // what the code will acutally do with a real reading
    const percentOfFull = nextTemp / 120;
    const newHeight = initialHeight * percentOfFull;
    const heightDiff = height - newHeight;
    const newY = y + heightDiff;
    const newYTranslate = yTranslate + heightDiff;
    this.setState({ height: newHeight, y: newY, yTranslate: newYTranslate });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.temperature !== this.props.temperature)
      this.updateTemperature(this.props.temperature);
  }

  render() {
    const {
      className = '',
      fillColorLight = '#d93e70',
      fillColorDark = '#86042e'
    } = this.props;

    return (
      <svg version="1.1" className={className} viewBox="0 0 53.459 213.286">
        <circle fill={fillColorLight} cx="26.986" cy="186.343" r="20.485" />
        <rect
          fill={'#FFFFFF'}
          x="23.599"
          y={initialY}
          width="6.775"
          height={initialHeight}
        />
        <circle
          fill={'#FFFFFF'}
          opacity={0.5}
          cx="26.986"
          cy="186.343"
          r="11.712"
        />
        <rect
          ref={this.temperatureBar}
          y={this.state.y}
          x="23.599"
          height={this.state.height}
          width="6.775"
          fill={fillColorLight}
          className={'thermometer-bar'}
        />
        <g fill={fillColorDark}>
          <g>
            <rect x="2.864" y="155.837" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="147.439" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="139.042" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="130.644" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="122.246" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="113.848" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="105.45" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="97.052" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="88.654" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="80.256" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="71.858" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="63.461" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="55.063" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="46.665" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="38.267" width="7.014" height="2.936" />
          </g>
          <g>
            <rect x="5.378" y="29.869" width="1.986" height="2.936" />
          </g>
          <g>
            <rect x="2.864" y="21.471" width="7.014" height="2.936" />
          </g>
        </g>

        <path
          style={{ transform: `translateY(${this.state.yTranslate}px)` }}
          className={'thermometer-arrow'}
          fill={fillColorDark}
          d="M46.308,10.926c-0.373-0.217-0.373-0.756,0-0.972l4.358-2.53V3.581c0-0.433-0.47-0.704-0.844-0.486
		L38.007,9.953c-0.373,0.217-0.373,0.756,0,0.972l11.815,6.858c0.375,0.218,0.844-0.053,0.844-0.486v-3.842L46.308,10.926z"
        />

        <path
          fill={fillColorDark}
          d="M35.431,162.614c-0.504-0.185-0.816-0.603-0.816-1.091V6.342c0-2.445-1.99-4.435-4.436-4.435h-6.386
	c-2.445,0-4.435,1.99-4.435,4.435v155.181c0,0.488-0.313,0.907-0.816,1.091c-9.749,3.571-16.3,13.023-16.3,23.522
	c0,13.798,11.101,25.023,24.744,25.023s24.744-11.225,24.744-25.023C51.731,175.637,45.18,166.184,35.431,162.614z M35.655,204.883
	c1.778-3.186,1.897-6.829,1.897-6.829c-3.686,5.83-7.86,7.806-16.011,8.019c-8.667-2.387-15.041-10.305-15.041-19.731
	c0-10.157,7.4-18.565,17.098-20.182V8.98h6.775V166.16c9.698,1.618,17.098,10.025,17.098,20.182
	C47.472,194.554,42.63,201.616,35.655,204.883z"
        />
      </svg>
    );
  }
}

ThermometerSVG.propTypes = propTypes;

export default ThermometerSVG;
