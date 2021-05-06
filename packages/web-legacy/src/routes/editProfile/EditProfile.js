import React from 'react';
import PropTypes from 'prop-types';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import cx from 'classnames';

import s from './EditProfile.css';

import EditProfileForm from '../../components/EditProfileForm';

class EditProfile extends React.Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const { title } = this.props;
    return (

      <div className={s.container}>
        <Grid fluid>
          <Row className={cx(s.landingContainer)}>
            <Col xs={12} sm={12} md={9} lg={9} className={s.smPadding}>
              <EditProfileForm />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }

}

export default withStyles(s)(EditProfile);