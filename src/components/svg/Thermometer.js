import React from 'react';
import PropTypes from 'prop-types';

const initialHeight = 157.211;
const initialY = 13.445;
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
      <svg version="1.1" viewBox="0 0 58.605 218.79" className={className}>
        <circle fill={fillColorLight} cx="31.015" cy="190.808" r="20.485" />
        <rect
          x="27.628"
          fill="#FFFFFF"
          y={initialY}
          width="6.775"
          height={initialHeight}
        />
        <rect
          x="27.628"
          y={this.state.y}
          width="6.775"
          height={this.state.height}
          fill={fillColorLight}
          className={'thermometer-bar'}
        />
        <g>
          <path
            fill={fillColorDark}
            d="M31.016,216.624c-14.195,0-25.744-11.674-25.744-26.022c0-10.916,6.814-20.746,16.956-24.462
		c0.048-0.017,0.16-0.067,0.16-0.151V10.807c0-2.997,2.438-5.435,5.435-5.435h6.386c2.997,0,5.436,2.438,5.436,5.435v155.182
		c0,0.084,0.112,0.134,0.16,0.151c10.142,3.715,16.956,13.545,16.956,24.462C56.76,204.951,45.211,216.624,31.016,216.624z
		 M27.822,7.372c-1.894,0-3.435,1.541-3.435,3.435v155.182c0,0.905-0.578,1.701-1.472,2.029
		c-9.357,3.428-15.645,12.504-15.645,22.584c0,13.246,10.651,24.022,23.744,24.022s23.744-10.776,23.744-24.022
		c0-10.081-6.287-19.156-15.644-22.583l0,0c-0.895-0.328-1.473-1.125-1.473-2.03V10.807c0-1.894-1.541-3.435-3.436-3.435H27.822z"
          />
        </g>
        <g fill={fillColorDark}>
          <g>
            <rect x="5.894" y="163.238" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="154.657" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="146.076" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="137.494" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="128.913" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="120.332" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="111.75" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="103.169" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="94.587" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="86.006" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="77.424" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="68.843" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="60.262" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="51.68" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="43.099" width="7.014" height="3" />
          </g>
          <g>
            <rect x="8.407" y="34.518" width="1.986" height="3" />
          </g>
          <g>
            <rect x="5.894" y="25.936" width="7.014" height="3" />
          </g>
        </g>
        <path
          fill={fillColorDark}
          style={{ transform: `translateY(${this.state.yTranslate}px)` }}
          className={'thermometer-arrow'}
          d="M50.337,15.391c-0.373-0.217-0.373-0.756,0-0.972l4.358-2.53V8.047c0-0.433-0.47-0.704-0.844-0.486
	l-11.815,6.858c-0.373,0.217-0.373,0.756,0,0.972l11.815,6.858c0.375,0.218,0.844-0.053,0.844-0.486V17.92L50.337,15.391z"
        />
        <path
          opacity={0.25}
          fill="#FFFFFF"
          d="M20.804,190.333c0.25-5.41,4.717-9.737,10.188-9.737c5.631,0,10.212,4.581,10.212,10.211
	c0,5.631-4.581,10.212-10.212,10.212v3c7.285,0,13.212-5.927,13.212-13.212c0-7.285-5.927-13.211-13.212-13.211
	c-7.125,0-12.935,5.673-13.188,12.737H20.804z"
        />
      </svg>
      //     <svg version="1.1" className={className} viewBox="0 0 53.459 213.286">
      //       <circle fill={fillColorLight} cx="26.986" cy="186.343" r="20.485" />
      //       <rect
      //         fill={'#FFFFFF'}
      //         x="23.599"
      //         y={initialY}
      //         width="6.775"
      //         height={initialHeight}
      //       />
      //       <circle
      //         fill={'#FFFFFF'}
      //         opacity={0.5}
      //         cx="26.986"
      //         cy="186.343"
      //         r="11.712"
      //       />
      //       <rect
      //         ref={this.temperatureBar}
      //         y={this.state.y}
      //         x="23.599"
      //         height={this.state.height}
      //         width="6.775"
      //         fill={fillColorLight}
      //         className={'thermometer-bar'}
      //       />
      //       <g fill={fillColorDark}>
      //         <g>
      //           <rect x="2.864" y="155.837" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="147.439" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="139.042" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="130.644" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="122.246" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="113.848" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="105.45" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="97.052" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="88.654" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="80.256" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="71.858" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="63.461" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="55.063" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="46.665" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="38.267" width="7.014" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="5.378" y="29.869" width="1.986" height="2.936" />
      //         </g>
      //         <g>
      //           <rect x="2.864" y="21.471" width="7.014" height="2.936" />
      //         </g>
      //       </g>
      //
      //       <path
      //         style={{ transform: `translateY(${this.state.yTranslate}px)` }}
      //         className={'thermometer-arrow'}
      //         fill={fillColorDark}
      //         d="M46.308,10.926c-0.373-0.217-0.373-0.756,0-0.972l4.358-2.53V3.581c0-0.433-0.47-0.704-0.844-0.486
      // 	L38.007,9.953c-0.373,0.217-0.373,0.756,0,0.972l11.815,6.858c0.375,0.218,0.844-0.053,0.844-0.486v-3.842L46.308,10.926z"
      //       />
      //
      //       <path
      //         fill={fillColorDark}
      //         d="M35.431,162.614c-0.504-0.185-0.816-0.603-0.816-1.091V6.342c0-2.445-1.99-4.435-4.436-4.435h-6.386
      // c-2.445,0-4.435,1.99-4.435,4.435v155.181c0,0.488-0.313,0.907-0.816,1.091c-9.749,3.571-16.3,13.023-16.3,23.522
      // c0,13.798,11.101,25.023,24.744,25.023s24.744-11.225,24.744-25.023C51.731,175.637,45.18,166.184,35.431,162.614z M35.655,204.883
      // c1.778-3.186,1.897-6.829,1.897-6.829c-3.686,5.83-7.86,7.806-16.011,8.019c-8.667-2.387-15.041-10.305-15.041-19.731
      // c0-10.157,7.4-18.565,17.098-20.182V8.98h6.775V166.16c9.698,1.618,17.098,10.025,17.098,20.182
      // C47.472,194.554,42.63,201.616,35.655,204.883z"
      //       />
      //     </svg>
    );
  }
}

ThermometerSVG.propTypes = propTypes;

export default ThermometerSVG;
