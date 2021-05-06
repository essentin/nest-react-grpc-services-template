import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FeatureFlagError.css';

// Locale
import messages from '../../../locale/messages';

class FeatureFlagError extends React.Component {

  render() {
    return (
      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.space6, s.spaceTop6)}>
            <Col xs={12} sm={12} md={12} lg={12} className={s.textCenter}>
              <h1 className={cx(s.textJumbo, 'hidden-xs', 'hidden-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h1 className={cx(s.textMedium, 'visible-xs', 'visible-sm')}><FormattedMessage {...messages.notFoundTitle} /></h1>
              <h2><FormattedMessage {...messages.hostFeatureError} /></h2>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapState = (state) => ({

});

const mapDispatch = {};

export default withStyles(s)(connect(mapState, mapDispatch)(FeatureFlagError));
