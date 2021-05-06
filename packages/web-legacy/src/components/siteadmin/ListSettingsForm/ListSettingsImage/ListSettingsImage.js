import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'react-apollo';
// Redux
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  Row,
  Col,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ListSettingsImage.css';
import DropZone from './DropZone';
import Loader from '../../../Loader';
import noLogo from './noLogo1.jpg';
import { iconUploadDir } from '../../../../config';

class ListSettingsImage extends React.Component {

  static propTypes = {
    formatMessage: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      locationImage: undefined,
    }
  }

  static defaultProps = {
    iconUploadLoader: false
  };

  componentWillReceiveProps(nextProps) {
    const { picture } = nextProps;
    if (picture && picture != '' && picture != null) {
      this.setState({
        locationImage: picture,
      });
    } else {
      this.setState({
        locationImage: undefined
      });
    }
  }

  render() {
    const { picture, iconUploadLoader, thumbnail, typeId, id, isEnable, formName } = this.props;
    return (
      <div>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} className={s.textAlignCenter}>
            <Loader
              show={iconUploadLoader}
              type={"page"}
            >
              <div className={cx(s.picContainer, s.agencyMainSection)}>
                <div className={cx(s.profilePic, s.picRound, s.mb12)}>
                  {
                    picture && <img
                      src={'/images/icon/' + picture}
                      height={200}
                      width={200}
                      alt="picture"
                    />
                  }
                  {
                    !picture && <img
                      src={noLogo}
                      height={200}
                      width={200}
                      alt="noLogo"
                    />
                  }
                </div>
              </div>
            </Loader>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12} className={s.spaceTop4}>
            <div
              className={cx(s.fullWidth, s.button, s.btnPrimaryBorder, s.btnlarge)}>
              <DropZone
                picture={picture}
                typeId={typeId}
                id={id}
                isEnable={isEnable}
                defaultMessage={'Choose File'}
                formName={formName}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}


const mapState = (state) => ({
  iconUploadLoader: state.iconUploadLoader.iconUploadLoader
});

const mapDispatch = {};


export default compose(
  injectIntl,
  withStyles(s),
  connect(mapState, mapDispatch)
)(ListSettingsImage);
