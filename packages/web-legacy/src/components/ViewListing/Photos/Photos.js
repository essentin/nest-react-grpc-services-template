import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Style
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Photos.css';
import { Button } from 'react-bootstrap';
import cx from 'classnames';

// Component
import ListCoverPhoto from '../../ListCoverPhoto';
import ListGridCoverPhoto from '../../ListGridCoverPhoto';
import ImageSlider from '../ImageSlider';
import ListDefaultPhoto from '../../ListDefaultPhoto';
import SocialShareModal from '../SocialShareModal';

// Redux Action
import { openImageLightBox, closeImageLightBox } from '../../../actions/ImageLightBox';
import { setStickyTop } from '../../../actions/Sticky/StrickyActions';
import { openSocialShareModal } from '../../../actions/modalActions';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../locale/messages';

//Images
import viewPhotoImage from '../../../../public/NewIcon/images.svg';

class Photos extends React.Component {
  static propTypes = {
    listPhotos: PropTypes.array,
    coverPhoto: PropTypes.number,
    openImageLightBox: PropTypes.any.isRequired,
    closeImageLightBox: PropTypes.any.isRequired,
    imageLightBox: PropTypes.bool.isRequired,
    formatMessage: PropTypes.any,
  };

  static defaultProps = {
    listPhotos: [],
    imageLightBox: false
  }

  constructor(props) {
    super(props);
    this.state = {
      sources: []
    }
  }

  componentDidMount() {
    const { data, setStickyTop } = this.props;
    let sources = [], sourceObject = {}, coverPhoto;
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    if (data.listPhotos != null && data.listPhotos.length > 0) {
      coverPhoto = data.listPhotos[0].name;

      if (data.coverPhoto != undefined && data.coverPhoto != null) {

        data.listPhotos.map((item, key) => {
          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/x_large_' + item.name;
            sources.push(sourceObject);
          }
        });

        data.listPhotos.map((item, key) => {
          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/x_large_' + item.name;
            sources.push(sourceObject);
          }
        });

      } else {
        data.listPhotos.map((item, key) => {
          sourceObject = {};
          sourceObject['src'] = '/images/upload/x_large_' + item.name;
          sources.push(sourceObject);
        });
      }
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    let sources = [], sourceObject = {}, coverPhoto;
    let sticky = document.querySelector('[data-sticky-top]'), stickyHeight = 412;

    if (data.listPhotos != null && data.listPhotos.length > 0) {

      coverPhoto = data.listPhotos[0].name;

      if (data.coverPhoto != undefined && data.coverPhoto != null) {

        data.listPhotos.map((item, key) => {
          if (item.id === data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/x_large_' + item.name;
            sources.push(sourceObject);
          }
        });

        data.listPhotos.map((item, key) => {
          if (item.id != data.coverPhoto) {
            sourceObject = {};
            sourceObject['src'] = '/images/upload/x_large_' + item.name;
            sources.push(sourceObject);
          }
        });

      } else {
        data.listPhotos.map((item, key) => {
          sourceObject = {};
          sourceObject['src'] = '/images/upload/x_large_' + item.name;
          sourceObject['src'] = '/images/upload/x_large_' + item.name;
          sources.push(sourceObject);
        });
      }
      this.setState({ sources });
    }
    stickyHeight = (sticky.getBoundingClientRect().height + 10);
    setStickyTop(stickyHeight);
  }

  render() {
    const { sources } = this.state;
    const { data, openImageLightBox, closeImageLightBox, imageLightBox, activityType } = this.props;
    let moodsOptions, coverPhoto, listPhotos;

    moodsOptions = data.moodsOptions;
    coverPhoto = data.coverPhoto;
    listPhotos = data.listPhotos;

    return (
      <div className={s.bannerContainer} data-sticky-top>
        <SocialShareModal
          listId={data.id}
          title={data.title}
          city={data.city}
          state={data.state}
          country={data.country}
          activityType={activityType}
        />
        <ImageSlider
          imageLightBox={imageLightBox}
          closeImageLightBox={closeImageLightBox}
          sources={sources}
        />

        {
          listPhotos && listPhotos.length == 0 && <ListDefaultPhoto
            className={s.bannerImage}
            coverPhoto={coverPhoto}
            listPhotos={listPhotos}
            photoType={"xx_large"}
            bgImage
          >
          </ListDefaultPhoto>
        }
        {
          moodsOptions && moodsOptions.length > 0 &&
          <div className={s.moodSection}>
            {
              moodsOptions.map((item) => (
                <span className={s.moodText}>
                  {item.listsettings.itemName}
                </span>
              ))
            }
          </div>
        }
        <a onClick={void (0)}
          onClick={openImageLightBox}
        >

          {
            listPhotos && listPhotos.length > 0 && listPhotos.length <= 3 && <ListCoverPhoto
              className={s.bannerImage}
              coverPhoto={coverPhoto}
              listPhotos={listPhotos}
              photoType={"xx_large"}
              bgImage
            >
              {
                listPhotos && listPhotos.length > 0 && <Button
                  className={cx(s.viewPhotosBtn)}
                  onClick={openImageLightBox}
                >
                  <span className={s.paddingRight}><FormattedMessage {...messages.viewPhotos} /></span>
                  <span><img src={viewPhotoImage} /></span>
                </Button>
              }
            </ListCoverPhoto>
          }

          {
            sources && sources.length > 0 && sources.length > 3 &&
            <ListGridCoverPhoto
              className={s.bannerImage}
              coverPhoto={coverPhoto}
              listPhotos={sources}
              photoType={"xx_large"}
              bgImage
            >
            </ListGridCoverPhoto >
          }
        </a>
        {
          sources && sources.length > 0 && <div><Button
            className={cx(s.viewPhotosBtn)}
            onClick={openImageLightBox}
          >
            <span className={s.paddingRight}><FormattedMessage {...messages.viewPhotos} /></span>
            <span><img src={viewPhotoImage} /></span>
          </Button>
          </div>
        }

        {
          moodsOptions && moodsOptions.length > 0 &&
          <div className={s.moodSection}>
            {
              moodsOptions.map((item) => (
                <span className={s.moodText}>
                  {item.listsettings.itemName}
                </span>
              ))
            }
          </div>
        }


      </div>
    );
  }
}

const mapState = (state) => ({
  imageLightBox: state.viewListing.imageLightBox
});

const mapDispatch = {
  openImageLightBox,
  closeImageLightBox,
  setStickyTop,
  openSocialShareModal
};

export default withStyles(s)(connect(mapState, mapDispatch)(Photos));