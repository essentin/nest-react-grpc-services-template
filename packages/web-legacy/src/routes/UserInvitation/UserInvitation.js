import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserInvitation.css';

import InviteUsers from '../../components/UserInvitation/InviteUsers';
import {
    Grid,
    Row,
    Col
} from 'react-bootstrap';
class UserInvitation extends React.Component {
    render() {
        return (
            <div className={s.container}>
                <Grid fluid>
                    <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                            <InviteUsers />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default withStyles(s)(UserInvitation);