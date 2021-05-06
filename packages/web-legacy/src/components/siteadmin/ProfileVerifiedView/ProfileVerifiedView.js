import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toastr } from 'react-redux-toastr';
import moment from 'moment';
import Confirm from 'react-confirm-bootstrap';
import {
    Form,
    Table
} from 'react-bootstrap';


import { graphql, gql, compose } from 'react-apollo';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ProfileVerifiedView.css';
import * as FontAwesome from 'react-icons/lib/fa';
import Link from '../../Link';

// Send Email
import { sendEmail } from '../../../core/email/sendEmail';

import Avatar from '../../Avatar';

const query = gql`query($profileId: Int, $isUser: Boolean) {
    showUserProfile(profileId: $profileId, isUser: $isUser) {
      userId
      profileId
      firstName
      lastName
      dateOfBirth
      gender
      phoneNumber
      preferredLanguage
      preferredCurrency
      location
      info
      createdAt
      picture
      reviewsCount
      country
      profileBanStatus{
        email
      }
      userVerifiedInfo{
        isEmailConfirmed
        isIdVerification
        isGoogleConnected
        isFacebookConnected
        isPhoneVerified
      }
    }
  }`;

class ProfileVerifiedView extends React.Component {

    static propTypes = {
        data: PropTypes.array,
        title: PropTypes.string.isRequired
    };

    static defaultProps = {
        data: {
            profileBanStatus: null,
            userVerifiedInfo: null
        }
    }

    constructor(props) {
        super(props);
    }


    render() {
        const { data, intl, title } = this.props;
        let isVerifiedInfo = data && data.userVerifiedInfo;
        let isVerify = (data && data.userVerifiedInfo) && (data.userVerifiedInfo.isEmailConfirmed || data.userVerifiedInfo.isGoogleConnected || data.userVerifiedInfo.isIdVerification || data.userVerifiedInfo.isFacebookConnected || data.userVerifiedInfo.isPhoneVerified) ? true : false;

        let isEmail, isGoogle, isDocument, isFacebook, isSMS;

        if (isVerifiedInfo && data.userVerifiedInfo.isEmailConfirmed == true) {
            isEmail = "Email";
        }
        if (isVerifiedInfo && data.userVerifiedInfo.isGoogleConnected == true) {
            isGoogle = "Google";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isFacebookConnected == true) {
            isFacebook = "Facebook";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isIdVerification == true) {
            isDocument = "Document";
        }

        if (isVerifiedInfo && data.userVerifiedInfo.isPhoneVerified == true) {
            isSMS = "SMS";
        }

        let language = '';

        if (data.preferredLanguage == "en") {
            language = "English"
        } else if (data.preferredLanguage == "sv") {
            language = "Svenska"
        }

        return (
            <div className={cx(s.pagecontentWrapper)}>
                <div className={s.contentBox}>
                    <h1 className={s.headerTitle}>{title}</h1>
                    <div className={cx('table-responsive')}>

                        <Link
                            to={"/siteadmin/users"}
                            className={cx('pull-right', s.goBackLink)}
                        >
                            Go back
                        </Link>

                        <Table>
                            <tbody>
                                <tr>
                                    <td className={'table-width'}>Profile Picture</td>
                                    {
                                        data && data.picture && <td>
                                            <img
                                                src={"/images/avatar/" + data.picture}
                                                width="110"
                                                height="auto"
                                                alt="avatarImage"
                                            />
                                        </td>
                                    }
                                    {
                                        !data.picture && <td>
                                            <Avatar
                                                isUser
                                                height={200}
                                                width={200}
                                                className={s.profileAvatar}
                                            />
                                        </td>
                                    }
                                </tr>
                                <tr>
                                    <td className={'table-width'}>First Name</td>
                                    <td>{data.firstName}</td>
                                </tr>
                                <tr>
                                    <td className={'table-width'}>Last Name</td>
                                    <td>{data.lastName}</td>
                                </tr>
                                {
                                    data && data.dateOfBirth && <tr>
                                        <td className={'table-width'}>Date of birth </td>
                                        <td>{data.dateOfBirth}</td>
                                    </tr>
                                }
                                {
                                    data && data.gender && <tr>
                                        <td className={'table-width'}>Gender</td>
                                        <td>{data.gender}</td>
                                    </tr>
                                }
                                {
                                    data && data.profileBanStatus.email && <tr>
                                        <td className={'table-width'}>Email</td>
                                        <td>{data.profileBanStatus.email}</td>
                                    </tr>
                                }
                                {
                                    data && data.phoneNumber && <tr>
                                        <td className={'table-width'}>Phone Number</td>
                                        <td>{data.phoneNumber}</td>
                                    </tr>
                                }
                                {
                                    data && data.preferredLanguage && <tr>
                                        <td className={'table-width'}>Language</td>
                                        <td>{language}</td>
                                    </tr>
                                }
                                {
                                    data && data.preferredCurrency && <tr>
                                        <td className={'table-width'}>Currency</td>
                                        <td>{data.preferredCurrency}</td>
                                    </tr>
                                }
                                {
                                    data && data.info && <tr>
                                        <td className={'table-width'}>Bio Info</td>
                                        <td>{data.info}</td>
                                    </tr>
                                }
                                {
                                    data && data.location && <tr>
                                        <td className={'table-width'}>Location</td>
                                        <td>{data.location}</td>
                                    </tr>
                                }
                                {
                                    isVerify && <tr>
                                        <td className={'table-width'}>Verification</td>
                                        {
                                            <td>
                                                <tr>
                                                    <td>{isEmail} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isGoogle} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isDocument} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isFacebook} </td>
                                                </tr>
                                                <tr>
                                                    <td>{isSMS} </td>
                                                </tr>
                                            </td>
                                        }
                                    </tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }

}


export default compose(
    withStyles(s)
)(ProfileVerifiedView);






