import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Button,
  Row,
  Col,
  ProgressBar,
  Panel,
} from 'react-bootstrap';
import s from './NoItem.css';

// Internal Helpers
import history from '../../../../core/history';

// Locale
import messages from '../../../../locale/messages';

class NoItem extends React.Component {
  static propTypes = {
    userType: PropTypes.string.isRequired,
    formatMessage: PropTypes.any,
  };

  handleClick() {
    history.push('/activity/all');
  }

  render() {
    const { userType, type } = this.props;

    return (

      <div>
        <div>
          {type == 'current' && <p className={s.noResults}>
            <FormattedMessage {...messages.noUpcomingReservation} />
          </p>
          }
          {type != 'current' && <p className={s.noResults}>
            <FormattedMessage {...messages.noPreviousReservation} />
          </p>
          }
        </div>
      </div>

    );
  }
}

export default withStyles(s)(NoItem);

