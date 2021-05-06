import React from 'react';
import PropTypes from 'prop-types';

import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';

import cx from 'classnames';
import Confirm from 'react-confirm-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import {
    Grid,
    Button,
    Row,
    Col
} from 'react-bootstrap';

import s from './EditWishListGroup.css';

import Loader from '../../../components/Loader';
import Link from '../../Link';
import WishListGroupModal from '../WishListGroupModal';
import ListingItem from '../ListingItem';

import { openAddWishListGroupModal } from '../../../actions/WishList/modalActions';
import { deleteWishListGroup } from '../../../actions/WishList/deleteWishListGroup';

import getWishListGroupQuery from './getWishListGroup.graphql';

import messages from '../../../locale/messages';

class EditWishListComponent extends React.Component {
    static propTypes = {
        data: PropTypes.shape({
            loading: PropTypes.bool,
            getWishListGroup: PropTypes.any
        }),
    };

    static defaultProps = {
        data: {
            loading: true
        },
    }

    render() {
        const { data: { loading, getWishListGroup } } = this.props;
        const { formatMessage } = this.props.intl;
        const { openAddWishListGroupModal, deleteWishListGroup } = this.props;

        let initialValues = {};
        if (getWishListGroup && getWishListGroup.id) {
            initialValues = {
                id: getWishListGroup.id,
                name: getWishListGroup.name,
                isPublic: getWishListGroup.isPublic,
                userId: getWishListGroup.userId
            };
        }

        return (
            <div>
                <WishListGroupModal actionType={'edit'} />
                <Grid fluid>
                    {
                        loading && <Col xs={12} sm={12} md={12} lg={12}>
                            <Loader type="text" />
                        </Col>
                    }
                    {
                        !loading && getWishListGroup && <Col xs={12} sm={12} md={12} lg={12} className={cx(s.landingContent, s.noPadding, s.marginTop)}>
                            <Col xs={12} sm={12} md={12} lg={12} className={cx(s.noPadding, s.space2)}>
                                <Col xs={12} sm={6} md={4} lg={4} className={s.space2}>
                                    <div className={s.innerPadding}>
                                        <Link to={"/wishlists"} className={cx(s.modalCaptionLink, s.modalCaptionLinkLarge, s.btnlarge, s.resposiveBtn)}>
                                            {formatMessage(messages.goToAllLists)}
                                        </Link>
                                    </div>
                                </Col>
                                <Col xs={12} sm={12} md={8} lg={8} className={s.space2}>
                                    <div className={cx(s.innerPadding, s.displayInlineBlock)}>
                                        <Button className={cx(s.button, s.btnPrimary, s.btnlarge, s.pullRight, s.noMargin, s.resposiveBtn, s.pullRghtNone)}
                                            onClick={() => openAddWishListGroupModal(initialValues, 'EditWishListGroupForm')}>
                                            <FormattedMessage {...messages.editWishList} />
                                        </Button>
                                    </div>
                                    <div className={s.displayInlineBlock}> 
                                        <Confirm
                                            onConfirm={() => deleteWishListGroup(getWishListGroup.id)}
                                            body={formatMessage(messages.areYouSureDeleteWishList)}
                                            confirmText={formatMessage(messages.confirmDelete)}
                                            title={formatMessage(messages.wishList)}
                                        >
                                            <a href="javascript:void(0)"
                                                className={cx(s.modalCaptionLinkLarge, s.pullRight, s.noMargin, s.modalCaptionLink, s.btnlarge, s.resposiveBtn, s.responsiveDeleteBtn, s.pullRghtNone)}>
                                                <FormattedMessage {...messages.deleteWishList} />
                                            </a>
                                        </Confirm>
                                    </div>
                                </Col>
                            </Col>
                            <Col xs={12} sm={8} md={8} lg={8}>
                                <h2 className={cx(s.landingTitle, s.innerPadding)}>
                                    {
                                        getWishListGroup.name
                                    }
                                </h2>
                            </Col>
                            {
                                !loading && getWishListGroup && <Col xs={12} sm={12} md={12} lg={12}>
                                    {
                                        getWishListGroup.wishListCount > 0 && getWishListGroup.wishLists && getWishListGroup.wishLists.length > 0 && <div className={cx(s.landingContentTitle, s.innerPadding)}>
                                            <FormattedMessage {...messages.yourSpaces} />
                                            <label className={cx(s.pullRight)}>
                                                <small>{getWishListGroup.wishListCount} {getWishListGroup.wishListCount > 1 ? formatMessage(messages.spaces) : formatMessage(messages.space)}</small>
                                            </label>
                                        </div>
                                    }
                                    {
                                        getWishListGroup.wishLists && getWishListGroup.wishLists.length > 0 && getWishListGroup.wishListCount > 0 && <div>
                                            {
                                                getWishListGroup.wishLists.map((item, index) => {
                                                    if (item.listData != null) {
                                                        return (
                                                            <div key={index} className={s.listingSection}>
                                                                <ListingItem
                                                                    id={item.listData.id}
                                                                    currency={item.listData.listingData.currency}
                                                                    title={item.listData.title}
                                                                    personCapacity={item.listData.personCapacity}
                                                                    coverPhoto={item.listData.coverPhoto}
                                                                    listPhotos={item.listData.listPhotos}
                                                                    bookingType={item.listData.bookingType}
                                                                    reviewsCount={item.listData.reviewsCount}
                                                                    spaceSize={item.listData.spaceSize}
                                                                    reviewsStarRating={item.listData.reviewsStarRating}
                                                                    activity={item.listData.activity}
                                                                />
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    }
                                    {
                                        getWishListGroup && getWishListGroup.wishListCount == 0 && <Row>
                                            <Col lg={12} md={12} sm={12} xs={12}>
                                                <h3 className={cx(s.innerPadding)}>{formatMessage(messages.noWishlistsHomes)}</h3>
                                            </Col>
                                        </Row>
                                    }
                                </Col>
                            }
                        </Col>
                    }
                </Grid>
            </div>
        )
    }
}

const mapState = (state) => ({
});

const mapDispatch = {
    openAddWishListGroupModal,
    deleteWishListGroup
};

export default compose(
    injectIntl,
    withStyles(s),
    connect(mapState, mapDispatch),
    graphql(getWishListGroupQuery,
        {
            options: (props) => ({
                variables: {
                    profileId: props.profileId,
                    id: props.wishListId
                },
                fetchPolicy: 'network-only',
            })
        }
    )
)(EditWishListComponent);