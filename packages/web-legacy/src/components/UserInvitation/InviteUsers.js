import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import getAllUserInvitation from './getAllUserInvitation.graphql';

import cancelUserInvitation from '../../actions/UserInvitation/cancelUserInvitation';

import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../../locale/messages';

import UserInviteForm from './InvitationForm/UserInviteForm'
import Loader from '../Loader';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './InviteUsers.css';
import cx from 'classnames';

//Images
import TrashIcon from '../../../public/NewIcon/trash.svg';
class InviteUsers extends React.Component {

    static defaultProps = {
        cardRemoveLoader: false,
        userInvitations: {
            loading: true
        }

    };

    static propTypes = {
        account: PropTypes.shape({
            maxInviteCount: PropTypes.number,
            inviteCode: PropTypes.stringUserInvitation
        }),
        userInvitations: PropTypes.shape({
            loading: PropTypes.bool,
            getAllUserInvitation: PropTypes.shape({
                status: PropTypes.number,
                count: PropTypes.number,
                results: PropTypes.arrayOf(PropTypes.shape({
                    id: PropTypes.numberUserInvitation,
                    email: PropTypes.stringUserInvitation,
                    status: PropTypes.stringUserInvitation,
                    inviteCode: PropTypes.stringUserInvitation,
                    invitedAt: PropTypes.stringUserInvitation,
                    registeredAt: PropTypes.stringUserInvitation,
                    cancelledAt: PropTypes.stringUserInvitation,
                    registeredEmail: PropTypes.stringUserInvitation
                }))
            }),
        })
    };

    render() {
        const { userInvitations: { loading, getAllUserInvitation }, account: { maxInviteCount }, cancelUserInvitation, cardRemoveLoader } = this.props;
        let invitesData = getAllUserInvitation && getAllUserInvitation.results;
        let usedInvitesCount = getAllUserInvitation && getAllUserInvitation.count || 0;

        let remainingCount = (maxInviteCount || 0) - usedInvitesCount;

        return (
            <div className={s.container}>
                {loading && <div> <Loader type={"text"} /> </div>}
                {
                    !loading && remainingCount <= 0 && <div><FormattedMessage {...messages.noInvitesLeft} /></div>
                }
                {
                    !loading && remainingCount > 0 && <div className={s.padding5}>
                        <UserInviteForm usedInvitesCount={usedInvitesCount} maxInviteCount={maxInviteCount} />
                        <div className={s.descScetion}>
                            <p className={s.descText}>
                                <FormattedMessage {...messages.inviteMember} />{' '}<span className={s.fontWeight}>{remainingCount}</span>{' '}<FormattedMessage {...messages.inviteMemberDesc} />
                            </p>
                        </div>
                    </div>
                }
                {
                    !loading && invitesData && invitesData.length > 0 && <div className={cx('paymentCardTable', 'table-ResponsiveInvite', s.noBorder)}>
                        <table className={cx('table', s.noBorder)}>
                            <thead>
                                <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                                    <th className={cx(s.noBorder, s.TableTitleText)}><FormattedMessage {...messages.invitedFriends} /></th>
                                    <th className={cx(s.noBorder, s.TableTitleText, s.textCenter)}><FormattedMessage {...messages.status} /></th>
                                    <th className={cx(s.noBorder, s.TableTitleText, s.textAlignRight)}><FormattedMessage {...messages.action} /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    invitesData.map((item, index) => {
                                        return (
                                            <tr key={index} className={cx(s.rowBorder, s.sectionTitleLight)}>
                                                <td className={s.cardDetailText}>{item.email}</td>
                                                <td className={cx(s.textTruncate, s.textAlignRight, s.defaultWidth, s.setDefaultSection)}>{item.status}</td>
                                                {item.status === 'invited' && <td className={cx(s.textTruncate, s.textAlignRight, s.removeWidth)}>
                                                    <a className={cx(s.removeText, s.linkText, { [s.transparentText]: cardRemoveLoader })} onClick={() => { cancelUserInvitation({ id: item.id }) }}>
                                                        <span><FormattedMessage {...messages.remove} /></span>
                                                        <span className={s.trashImg}><img src={TrashIcon} /></span>
                                                    </a>
                                                </td>}
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

const mapState = (state) => ({
    account: state.account.data,
    cardRemoveLoader: state.loader.cardRemove,
});

const mapDispatch = {
    cancelUserInvitation
};

export default compose(
    connect(mapState, mapDispatch),
    injectIntl,
    withStyles(s),
    graphql(getAllUserInvitation, {
        name: 'userInvitations',
        options: {}
    })
)(InviteUsers);