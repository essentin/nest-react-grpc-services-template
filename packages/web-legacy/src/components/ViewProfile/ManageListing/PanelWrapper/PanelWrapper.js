import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Col } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
// Locale
import messages from '../../../../locale/messages';
import ListSlider from '../../ListSlider';
import ManageListingsQuery from './ManageListingsProfile.graphql';
import s from './PanelWrapper.css';

class PanelWrapper extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
  };
  static defaultProps = {
    ManageListingsData: {
      ManageListingsProfile: [],
      loading: true,
    },
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      ManageListingsData: { loading, ManageListingsProfile },
    } = this.props;
    const completedTitle = (
      <h3>
        <FormattedMessage {...messages.myHostSpaces} />
      </h3>
    );

    return (
      <div
        className={cx(s.pageContainer, s.space2, s.spaceTop4, 'ViewProfile')}
      >
        <Col
          md={12}
          lg={12}
          sm={12}
          xs={12}
          className={cx(s.space4, s.smPadding)}
        >
          {!loading && (
            <ListSlider
              data={ManageListingsProfile}
              panelTitle={completedTitle}
            />
          )}
        </Col>
      </div>
    );
  }
}

export default compose(
  injectIntl,
  withStyles(s),
  graphql(ManageListingsQuery, {
    name: 'ManageListingsData',
    options: (props) => ({
      variables: {
        userId: props.userId,
      },
      fetchPolicy: 'network-only',
    }),
  }),
)(PanelWrapper);
