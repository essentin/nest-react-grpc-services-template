import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Collapsible from 'react-collapsible';
import { injectIntl, FormattedMessage } from 'react-intl';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './ListingDetails.css';

import ListItem from '../ListingDetails/ListItem';

import messages from '../../../locale/messages';

class Rules extends Component {
	static propTypes = {
		formatMessage: PropTypes.any,
		refer: PropTypes.string,
		siteName: PropTypes.string.isRequired
	};

	constructor(props) {
		super(props);
	}

	render() {
		const { parkingOptions, isParking, parkingDescription, houseRuleDesc, isAllAge } = this.props;
		const { formatMessage } = this.props.intl;

		return (

			<div className={s.faqsection}>
				{isParking && <div className={cx(s.noPadding, "viewListing-CollapsParking")}>
					<div>
						<div className={cx(s.rulersSection, s.faqcolumn, s.noBroderBottom)}>
							<Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={<FormattedMessage {...messages.parking} />}>
								<p className={s.noMargin}>
									{
										parkingOptions.length > 0 && <div><ListItem
											itemList={parkingOptions}
											hideImg={true}
											label={formatMessage(messages.parkingOptions)}
											showLabel={formatMessage(messages.showAllParking)}
											hideLabel={formatMessage(messages.closeAllParking)}
										/>
										</div>
									}
								</p>
								<p className={s.space2}>
									<span className={s.noPaddingTop}><FormattedMessage {...messages.parkingDescription} /></span>
									<span className={cx(s.lineBreak)}>{parkingDescription}</span>
								</p>
							</Collapsible>
						</div>
					</div>
				</div>}
				{
					houseRuleDesc && <div className={cx(s.noPadding, "viewListing-Collaps")}>
						<div>
							<div className={cx(s.rulersSection, s.faqcolumn, s.rulersSectionNoBorder)}>
								<Collapsible triggerOpenedClassName={s.questionOpen} triggerClassName={s.question} transitionTime="200" trigger={<FormattedMessage {...messages.houseRules} />}>
									<div>
										<p className={cx(s.listingFontSize, s.wordBreak, s.lineBreak)}>
											{houseRuleDesc}
										</p>
									</div>
								</Collapsible>
							</div>
						</div>
					</div>
				}
			</div>
		);
	}
}

const mapState = state => ({
	siteName: state.siteSettings.data.siteName

});

const mapDispatch = {};

export default injectIntl(withStyles(s)(connect(mapState, mapDispatch)(Rules)));