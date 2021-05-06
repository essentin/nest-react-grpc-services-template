import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

// Style
import {
  Button,
  Label,
} from 'react-bootstrap';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../SavedCards.css';

// Redux actions
import { openCardModal } from '../../../actions/modalActions';
import { setDefaultCard } from '../../../actions/Cards/setDefaultCard';
import { removeCard } from '../../../actions/Cards/removeCard';

// Components
import CardModal from '../CardModal';

//Images
import CardImg from '../../../../public/NewIcon/card.svg';
import TrashIcon from '../../../../public/NewIcon/trash.svg';

// Locale
import messages from '../../../locale/messages';

class SavedCardsList extends Component {

  static defaultProps = {
    cardRemoveLoader: false,
    cardDefaultLoader: false,
    data: []
  };

  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { openCardModal } = this.props;

    openCardModal()
  }

  render() {
    const { data, removeCard, setDefaultCard } = this.props;
    const { cardRemoveLoader, cardDefaultLoader } = this.props;

    return (
      <div>
        <CardModal />
        <div className={cx(s.panelBody, 'paymentCardTable')}>
          <p className={cx(s.paymentTitleText, s.space3)}>
            <FormattedMessage {...messages.payment} />
          </p>
          <table className={cx('table', s.noBorder)}>
            <thead>
              <tr className={cx(s.rowBorder, s.sectionTitleLight, s.textTruncate)}>
                <th className={cx(s.noBorder, s.TableTitleText)}><FormattedMessage {...messages.cardDetails} /></th>
                <th colSpan={2} className={cx(s.noBorder, s.TableTitleText, s.textAlignRight)}><FormattedMessage {...messages.options} /></th>
              </tr>
            </thead>
            <tbody>
              {
                data.length > 0 && data.map((item, index) => {
                  return (
                    <tr className={cx(s.rowBorder, s.sectionTitleLight)} key={index}>
                      <td className={s.cardDetailText}>
                        <span>
                          <img src={CardImg} className={s.cardImg} />
                        </span>
                        <span className={s.cardListSection}>
                          xxxx-xxxx-xxxx-{item.last4Digits}
                        </span>

                      </td>
                      <td className={cx(s.textTruncate, s.textAlignRight, s.defaultWidth)}>
                        {
                          !item.default ? <a
                            href="javascript:void(0)"
                            className={cx({ [s.transparentText]: cardDefaultLoader }, s.cardDetailText, s.setDefaultSection, s.setDeafutOverFlow)}
                            onClick={() => {
                              if (!cardDefaultLoader) {
                                setDefaultCard(item.id)
                              }
                            }}
                          >
                            <FormattedMessage {...messages.setAsDefault} />
                          </a> : <a
                          href="javascript:void(0)"
                          className={cx({ [s.transparentText]: cardDefaultLoader }, s.cardDetailText, s.setDefaultSection)}
                        >
                          <Label bsStyle="success" className={s.defaultBtn}><FormattedMessage {...messages.default} /></Label>
                        </a>
                        }
                      </td>
                      <td className={cx(s.textTruncate, s.textAlignRight, s.removeWidth)}>
                      {
                        // !item.default && <a
                        //   className={cx(s.removeText, { [s.transparentText]: cardRemoveLoader })}
                        //   href="javascript:void(0)"
                        //   onClick={() => {
                        //     if (!cardRemoveLoader) {
                        //       removeCard(item.id);
                        //     }
                        //   }}
                        // >
                        //   <span><FormattedMessage {...messages.remove} /></span>
                        //   <span className={s.trashImg}><img src={TrashIcon} /></span>
                        // </a>
                      }
                        {
                          // item.default && <a
                        //   className={cx(s.removeText, { [s.transparentText]: cardRemoveLoader })}
                        //   href="javascript:void(0)"
                        //   onClick={() => {
                        //     if (!cardRemoveLoader) {
                        //       removeCard(item.id);
                        //     }
                        //   }}
                        // >
                        //   <span><FormattedMessage {...messages.remove} /></span>
                        //   <span className={s.trashImg}><img src={TrashIcon} /></span>
                        // </a>
                        }
                        <a
                          className={cx(s.removeText, { [s.transparentText]: cardRemoveLoader })}
                          href="javascript:void(0)"
                          onClick={() => {
                            if (cardRemoveLoader) return
                              removeCard(item.id);
                          }}
                        >
                          <span><FormattedMessage {...messages.remove} /></span>
                          <span className={s.trashImg}><img src={TrashIcon} /></span>
                        </a>

                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
          <div className={cx(s.sectionTitleLight, s.space2)}>
            <Button className={cx(s.button, s.addCardPadding, s.btnPrimary)} onClick={this.handleClick}>
              <FormattedMessage {...messages.addCard} />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  cardRemoveLoader: state.loader.cardRemove,
  cardDefaultLoader: state.loader.cardDefault,
});

const mapDispatch = {
  removeCard,
  setDefaultCard,
  openCardModal
};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(SavedCardsList)));