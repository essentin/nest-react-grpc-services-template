import React, { Component } from 'react';
import PropTypes from 'prop-types';
// Redux
import { connect } from 'react-redux';
// Redux form
import { change } from 'redux-form';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '!isomorphic-style-loader!css-loader!lyef-switch-button/css/main.css';
import * as SwitchButton from 'react-switch';

export const uncheckedIcon = (
  <svg
    viewBox="0 0 52 52"
    fill="#000000"
    fillOpacity="0"
    stroke="#000000"
    strokeWidth="4"
    role="presentation"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: 'absolute',
      top: 1,
      height: '33px',
      width: '33px',
      display: 'block',
      transform: 'scale(1.5)',
    }}
  >
    <path d="m19.1 19.1 l14 14 m 0 -14 l -14 14"></path>
  </svg>
);

export const checkedIcon = (
  <svg
    viewBox="0 0 52 52"
    fill="#000000"
    fillOpacity="0"
    stroke="#000000"
    strokeWidth="4"
    role="presentation"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      position: 'absolute',
      top: 1,
      height: '33px',
      width: '33px',
      display: 'block',
      transform: 'scale(1.5)',
    }}
  >
    <path d="m19.1 25.2 4.7 6.2 12.1-11.2"></path>
  </svg>
);
class Switch extends Component {
  static propTypes = {
    change: PropTypes.any.isRequired,
  };

  static defaultProps = {
    checked: false,
    checkedValue: true,
    unCheckedValue: false,
    offColor: '#dce0e0',
    onColor: '#f56e9f',
    checkedIcon: checkedIcon,
    uncheckedIcon: uncheckedIcon,
    height: 32,
    width: 55,
    boxShadow: 'none',
    activeBoxShadow: '0px 0px 2px 3px #f56e9f',
    isPersonalize: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
    this.handleCallback = this.handleCallback.bind(this);
  }

  componentDidMount() {
    const { defaultValue } = this.props;
    this.setState({
      checked: defaultValue,
    });
  }

  async handleCallback(e) {
    const { change, index } = this.props;

    this.setState({ checked: e });
    await change('ListPlaceStep3', `spaceAvailability[${index}].isOpen`, e);
    if (e) {
      await change(
        'ListPlaceStep3',
        `spaceAvailability[${index}].isWholeDay`,
        'true',
      );
    } else {
      await change(
        'ListPlaceStep3',
        `spaceAvailability[${index}].isWholeDay`,
        'false',
      );
      await change(
        'ListPlaceStep3',
        `spaceAvailability[${index}].timeSlot`,
        [],
      );
    }
  }

  render() {
    const {
      offColor,
      onColor,
      checkedIcon,
      uncheckedIcon,
      height,
      width,
      boxShadow,
    } = this.props;
    const { checked } = this.state;

    return (
      <div>
        <SwitchButton
          id="open-type"
          checked={checked}
          onChange={this.handleCallback}
          className={'siwtchLapel'}
          offColor={offColor}
          onColor={onColor}
          checkedIcon={checkedIcon}
          uncheckedIcon={uncheckedIcon}
          height={height}
          width={width}
          boxShadow={boxShadow}
        />
        <label className={'siwtchLapelText'}>
          {' '}
          {checked ? 'Open' : 'Closed'}{' '}
        </label>
      </div>
    );
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  change,
};

export default withStyles(s)(connect(mapState, mapDispatch)(Switch));
