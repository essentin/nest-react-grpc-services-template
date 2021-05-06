// General
import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';

// Styles
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Security.css';

import Security from '../../components/Security';

class SecurityContainer extends React.Component {
  static propTypes = {
    // reservationId: PropTypes.number.isRequired,
    writeReview: PropTypes.shape({
      loading: PropTypes.bool,
      writeReviewData: PropTypes.object
    }),
  };

  static defaultProps = {};

  render() {
    const { writeReview } = this.props;
    return (
      <div className={s.root}>
        <div className={s.container}>
            <Security />
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s)
)(SecurityContainer);
