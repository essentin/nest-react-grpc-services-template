import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import React from 'react';
import { Button } from 'react-bootstrap';
import s from './Selector.css';
import { connect } from 'react-redux';
// Redux Form
import {
  formValueSelector
} from 'redux-form';


class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.selectedDate,
      activity: props.selectedActivity,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { selectedDate, selectedActivity } = nextProps;
    if (selectedDate) {
      this.setState({ date: selectedDate });
    } else {
      this.setState({ date: null });
    }

    if (selectedActivity) {
      this.setState({ activity: selectedActivity });
    }

  }

  render() {
    const { title, options, onSelect, alignRight,
      component, selectedActivityType, personalized: { activityType }, dates, month } = this.props;
    const { date } = this.state;
    return (
      <div className={cx(s.container, alignRight ? s.alignRight : '', s.mobileDisplayFlex)}>
        <label className={s.label}>{title}</label>
        {component === 'date' && <span className={s.monthsText}>{month}</span>}
        {options.map((option, i) => {
          let active;
          if (component == 'date') {
            active = dates && date == option.value ? s.active : '';
          } else if (component == 'activity') {
            active = selectedActivityType && activityType == option.value ? s.active : '';
          }

          return (
            <div
              key={i}
              className={cx(s.displayInlineBlock, { 'homeDate': component == 'date' })}
              onClick={() => {
                if (component == 'date') {
                  this.setState({ date: option.value });
                } else if (component == 'activity') {
                  this.setState({ activity: option.value });
                }

                if (onSelect) {
                  onSelect(option.value);
                }
              }}
            >
              <span className={cx(
                s.navItem,
                active,
                s.btn,
                'dateNav'
              )}>
                {option.name}</span>
            </div>
          );
        })}
      </div>
    );
  }
}

// Decorate with connect to read form values
const selector = formValueSelector('SearchForm'); // <-- same as form name

const mapState = (state) => ({
  personalized: state.personalized,
  dates: selector(state, 'dates'),
  selectedActivityType: selector(state, 'activityType')
});

const mapDispatch = {
};

export default withStyles(s)(connect(mapState, mapDispatch)(Selector));