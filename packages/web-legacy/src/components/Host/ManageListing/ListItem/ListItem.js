import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// External Component
import moment from 'moment';

// Style
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { Button, Row, Col, ProgressBar } from 'react-bootstrap';

import s from './ListItem.css';
import * as FontAwesome from 'react-icons/lib/fa';

// For Redirect
import history from '../../../../core/history';
// Component
import ListCoverPhoto from '../../../ListCoverPhoto';
import EditButton from '../../ManageListing/EditButton';

// Redux
import { connect } from 'react-redux';

// Redux action
import { removeListing } from '../../../../actions/removeListing';

// Locale
import messages from '../../../../locale/messages';
class ListItem extends React.Component {
  static propTypes = {
    formatMessage: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isRemove: false,
      tabs: {
        editButton: false,
      },
      overlay: false,
    };
    this.openRemoveList = this.openRemoveList.bind(this);
    this.closeRemoveList = this.closeRemoveList.bind(this);
    this.handleTabToggle = this.handleTabToggle.bind(this);
  }

  handleTabToggle(currentTab, isExpand) {
    const { tabs } = this.state;

    for (let key in tabs) {
      if (key == currentTab) {
        tabs[key] = isExpand;
      } else {
        tabs[key] = false;
      }
    }
    this.setState({
      tabs,
      overlay: isExpand,
    });
  }

  percentage(data) {
    let totalPercentage = 100;
    let percentage = 0;
    let step1Percentage = 0,
      step2Percentage = 0,
      step2PhotosPercentage = 0,
      step3Percentage = 0;
    let step1 = data.listingSteps && data.listingSteps.step1;
    let step2 = data.listingSteps && data.listingSteps.step2;
    let step3 = data.listingSteps && data.listingSteps.step3;
    let step4 = data.listingSteps && data.listingSteps.step4;
    let listPhotos = data.listPhotos;
    if (data) {
      if (step1 === 'active') {
        step1Percentage = 0.2;
      }
      if (step1 === 'completed') {
        step1Percentage = 0.3;
      }
      if (step2 === 'completed') {
        step2Percentage = 0.2;
      }
      if (listPhotos.length > 0) {
        step2PhotosPercentage = 0.1;
      }
      if (step4 === 'completed') {
        step3Percentage = 0.4;
      }
    }
    percentage =
      step1Percentage +
      step2Percentage +
      step2PhotosPercentage +
      step3Percentage;
    return Number(totalPercentage * percentage);
  }
  title(data) {
    if (data) {
      if (data.title != null) {
        return data.title;
      } else {
        return 'Space in ' + data.city;
      }
    }
  }
  handlePreview(listId) {
    if (listId) {
      history.push('/space/' + listId + '/preview');
    }
  }
  handleEditListing(listId) {
    if (listId) {
      history.push('/become-a-host/' + listId + '/home');
    }
  }
  handleRemoveListing(listId) {
    const { removeListing } = this.props;
    removeListing(listId);
    this.setState({ isRemove: false });
  }
  openRemoveList() {
    this.setState({
      isRemove: true,
      overlay: false,
      tabs: {
        editButton: false,
      },
    });
  }
  closeRemoveList() {
    this.setState({
      isRemove: false,
      overlay: false,
      tabs: {
        editButton: false,
      },
    });
  }
  removeItem(listId) {
    return (
      <li className={s.panelBodyAlert}>
        <div className={cx(s.alertBlock)}>
          <Row>
            <Col
              xs={12}
              xsOffset={0}
              smOffset={1}
              sm={10}
              mdOffset={1}
              md={10}
              lgOffset={1}
              lg={10}
            >
              <p className={cx(s.h5, s.spaceTop5)}>
                <span>
                  <FormattedMessage {...messages.deleteListing} />
                </span>
              </p>
              <p className={cx(s.spaceTop2, s.alertText)}>
                <span>
                  <FormattedMessage {...messages.deleteListingInfo} />
                </span>
              </p>
              <Col xs={12} sm={12} md={12} lg={12} className={s.noPadding}>
                <Button
                  className={cx(
                    s.button,
                    s.btnPrimary,
                    s.btnlarge,
                    s.spaceRight2,
                    s.smButton,
                  )}
                  onClick={() => this.handleRemoveListing(listId)}
                >
                  <FormattedMessage {...messages.delete} />
                </Button>
                <Button
                  className={cx(
                    s.button,
                    s.btnPrimaryBorder,
                    s.btnlarge,
                    s.smButton,
                  )}
                  onClick={this.closeRemoveList}
                >
                  <FormattedMessage {...messages.goBack} />
                </Button>
              </Col>
            </Col>
          </Row>
        </div>
      </li>
    );
  }
  render() {
    const { isRemove, tabs } = this.state;
    const { data } = this.props;
    let updatedDate = moment(data.updatedAt).format('Do MMMM YYYY');
    let listId = data.id;
    let coverPhoto = data.coverPhoto;
    let listPhotos = data.listPhotos;
    if (isRemove) {
      return this.removeItem(listId);
    } else {
      return (
        <li className={s.panelBody}>
          <Row>
            <Col xs={12} sm={4} md={4} lg={4}>
              <div className={s.listPhotoCover}>
                <div>
                  {data && data.isReady && (
                    <a href={'/space/' + listId + '/preview'}>
                      <ListCoverPhoto
                        className={s.imgResponsive}
                        coverPhoto={coverPhoto}
                        listPhotos={listPhotos}
                        photoType={'x_medium'}
                      />
                    </a>
                  )}
                  {data && !data.isReady && (
                    <ListCoverPhoto
                      className={s.imgResponsive}
                      coverPhoto={coverPhoto}
                      listPhotos={listPhotos}
                      photoType={'x_medium'}
                    />
                  )}
                </div>
              </div>
            </Col>
            <Col xs={12} sm={8} md={8} lg={8} className={s.listDetailContent}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={cx(s.noPadding, s.spaceTop2)}
              >
                <div>
                  <div className={s.progressWidth}>
                    <ProgressBar
                      bsClass={s.leanProgressBar}
                      className={s.leanProgressContainer}
                      now={this.percentage(data)}
                    />
                  </div>
                  <div className={s.progresTextWidth}>
                    <span className={s.labelText}>
                      {this.percentage(data)}%{' '}
                      <FormattedMessage {...messages.progressBarText2} />
                    </span>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                sm={12}
                md={10}
                lg={10}
                className={cx(s.noPadding, s.spaceTop2, s.textOverFlow)}
              >
                {data && data.isReady && (
                  <a href={'/space/' + listId + '/preview'}>
                    <span className={s.listContent}> {this.title(data)} </span>
                  </a>
                )}
                {data && !data.isReady && (
                  <span className={s.listContent}> {this.title(data)} </span>
                )}
              </Col>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={cx(s.noPadding, s.spaceTop2)}
              >
                <div className={s.displayInlineBlock}>
                  <span className={s.landingStep}>
                    <FormattedMessage {...messages.listingUpdateInfo} />{' '}
                    {updatedDate}
                  </span>
                </div>
                <div className={s.floatRight}>
                  <div className={s.displayInlineBlock}>
                    <Button
                      className={cx(s.button, s.btnPrimary, s.spaceRight2)}
                      onClick={() => this.handleEditListing(listId)}
                    >
                      {data.listingSteps && data.listingSteps.step4 === 'completed' &&
                        listPhotos.length > 0 && (
                          <span>
                            <FormattedMessage {...messages.editListing} />
                          </span>
                        )}
                      {data.listingSteps && data.listingSteps.step4 === 'completed' &&
                        listPhotos.length <= 0 && (
                          <span>
                            <FormattedMessage {...messages.finishListing} />
                          </span>
                        )}
                      {data.listingSteps && data.listingSteps.step4 !== 'completed' && (
                        <span>
                          <FormattedMessage {...messages.finishListing} />
                        </span>
                      )}
                    </Button>
                  </div>
                  <div className={s.editButtoncss}>
                    <EditButton
                      className={cx(s.filterButtonContainer)}
                      handleTabToggle={this.handleTabToggle}
                      isExpand={tabs.editButton}
                      listId={listId}
                      openRemoveList={this.openRemoveList}
                      data={data}
                    />
                  </div>
                </div>
              </Col>
            </Col>
          </Row>
        </li>
      );
    }
  }
}

const mapState = (state) => ({});

const mapDispatch = {
  removeListing,
};

export default withStyles(s)(connect(mapState, mapDispatch)(ListItem));
