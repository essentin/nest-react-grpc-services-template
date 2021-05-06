import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import s from './StepThree.css';

import {
    Row,
    Col,
    Button,
    Grid
} from 'react-bootstrap';

import DropZone from '../../EditProfileForm/DropZone';
import Loader from '../../Loader';
import ProfilePicture from '../../ProfilePicture/ProfilePicture';

import { doRemoveProfilePicture, updateStepThree } from '../../../actions/manageUserProfilePicture';

import messages from '../../../locale/messages';

class StepThree extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    static propTypes = {
        formatMessage: PropTypes.func,
    };

    handleClick(isPhotoSkipped) {
        const { updateStepThree, doRemoveProfilePicture, userAccount } = this.props
        isPhotoSkipped && userAccount && userAccount.picture && doRemoveProfilePicture(userAccount.picture)
        updateStepThree(isPhotoSkipped);
    }

    render() {
        const { formatMessage } = this.props.intl;
        const { doRemoveProfilePicture, picture, userAccount } = this.props;
        const { profilePhotoLoading } = this.props;

        return (
            <div className={s.root}>
                <div className={s.container}>
                    <Grid fluid>
                        <Row>
                            <h2 className={s.registerText}>{formatMessage(messages.uploadProfileTitle)}</h2>
                            <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
                                <div className={s.profileImg}>
                                    <div className={'loaderSection'}>
                                        <Loader show={profilePhotoLoading} type={"page"}>
                                            <ProfilePicture />
                                            {
                                                userAccount.picture != null && <a className={s.trashIcon} href="javascript:void(0);" onClick={() => doRemoveProfilePicture(userAccount.picture)}>
                                                    <FontAwesome.FaTrash />
                                                </a>
                                            }
                                        </Loader>
                                    </div>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                <div className={s.centerFlex}>
                                    <Col xs={12} sm={12} md={12} lg={12} className={cx(s.spaceTop2, s.fullWidth, s.dropZoneHeight, 'signUpDroupZone')}>
                                        <DropZone show={true} data={userAccount} placeHolder={formatMessage(messages.uploadProfilePlaceHolder)}
                                        >
                                        </DropZone>
                                    </Col>
                                </div>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.paddingBtn, s.space5)}>
                                <p className={s.descText}>{formatMessage(messages.uploadProfileDesc)}</p>
                                <Button disabled={userAccount && !userAccount.picture} onClick={() => { this.handleClick(false) }}
                                    className={cx(s.button, s.btnPrimary, s.spaceTop5, userAccount && !userAccount.picture ? s.disabledBtn : '')}
                                    bsSize="large" block >
                                    {formatMessage(messages.save)}
                                </Button>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                                <div className={s.footerSection}>
                                    <div className={s.footerSectionTableCell}>
                                        {formatMessage(messages.uploadProfileSkipContent)}
                                    </div>
                                    <div className={s.footerSectionTableCell}>
                                        <Button onClick={() => { this.handleClick(true) }} className={cx(s.btnText, s.footerBtn)}>
                                            {formatMessage(messages.skipLabel)}
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    profilePhotoLoading: state.account.profilePhotoLoading,
    userAccount: state.account.data
});

const mapDispatch = {
    doRemoveProfilePicture,
    updateStepThree
}

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(StepThree)));