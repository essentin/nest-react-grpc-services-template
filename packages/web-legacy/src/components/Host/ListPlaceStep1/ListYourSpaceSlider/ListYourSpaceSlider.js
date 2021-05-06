import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slider from 'react-slick';
import s from './ListYourSpaceSlider.css';
import {
	Button
} from 'react-bootstrap';
import cx from 'classnames';
import sliderOne from './slider 1.svg';
import sliderTwo from './slide 2.svg';
import sliderThree from './slide 3.svg';
import sliderFour from './slide 4.svg';
import Location from '../Location';
import prevIcon from '../../../../../public/SiteIcons/left-arrow-list.png';
import nextIcon from '../../../../../public/SiteIcons/right-arrow-list.png';

// Translation
import { FormattedMessage } from 'react-intl';

// Locale
import messages from '../../../../locale/messages';


class ListYourSpaceSlider extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			showSlider: true,
			updateCount: 1,
			loading: true
		};
		this.handleSkip = this.handleSkip.bind(this);
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
	}

	componentDidMount() {
		this.setState({ loading: false });
	}

	next() {
		const { updateCount } = this.state;
		let currentValue = updateCount;
		currentValue = Number(updateCount) + 1
		this.setState({
			updateCount: currentValue
		});
		if (updateCount > 4) {
			this.setState({
				showSlider: !this.state.showSlider,
				updateCount: 1
			})
		}
		this.slider.slickNext();
	}

	previous() {
		const { updateCount } = this.state;
		let currentValue = updateCount;
		currentValue = Number(updateCount) - 1
		this.setState({
			updateCount: currentValue
		});
		
		if (updateCount <= 1) {
			this.setState({
				updateCount: 1
			})
		}
		this.slider.slickPrev();
	}

	handleSkip() {
		this.setState({
			showSlider: !this.state.showSlider
		})
	}

	render() {
		const { nextPage, isExistingList, previousPage, onSubmit } = this.props;
		const { showSlider, loading } = this.state;
		const settings = {
			dots: true,
			infinite: false,
			fade: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
			initialSlide: 0,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: false,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						initialSlide: 0
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		};

		return (
			<div className={s.container}>
				{showSlider && !loading && <div>
					<div className={cx(s.minHeight, 'listYourPlace')}>
						<div className={s.landingContentTitle}><FormattedMessage {...messages.listYourSpace} /></div>
						<Slider ref={c => (this.slider = c)} {...settings} className={s.tabPadding}>
							<div>
								<div className={s.displayGrid}>
									<div className={cx(s.content, 'contentAnimation')}><h2><FormattedMessage {...messages.sliderContent1} /></h2></div>
									<div className={s.svgImage}><img src={sliderOne} alt="slider" /></div>
								</div>
							</div>
							<div>
								<div className={s.displayGrid}>
									<div className={cx(s.content, 'contentAnimation')}><h2><FormattedMessage {...messages.sliderContent2} /></h2></div>
									<div className={s.svgImage}><img src={sliderTwo} alt="slider" /></div>
								</div>
							</div>
							<div>
								<div className={s.displayGrid}>
									<div className={cx(s.content, 'contentAnimation')}><h2><FormattedMessage {...messages.sliderContent3} /></h2></div>
									<div className={s.svgImage}><img src={sliderThree} alt="slider" /></div>
								</div>
							</div>
							<div>
								<div className={s.displayGrid}>
									<div className={cx(s.content, 'contentAnimation')}><h2><FormattedMessage {...messages.sliderContent4} /></h2></div>
									<div className={s.svgImage}><img src={sliderFour} alt="slider" /></div>
								</div>
							</div>
						</Slider>
						<div className={s.buttonPosition}>
							<div className={s.buttonrelative}>
								<Button className={s.listPrevArrow} onClick={() => this.previous()}>
									<img src={prevIcon} alt="preview" />
								</Button>
								<Button className={s.listNextArrow} onClick={() => this.next()}>
									<img src={nextIcon} alt="next" />
								</Button>
							</div>
						</div>
					</div>
					<div className={s.skipButton}>
						<a href="javascript:void(0);" onClick={() => this.handleSkip()} ><FormattedMessage {...messages.skipLabel} /></a>
					</div>
				</div>}
				{
					!showSlider && !loading && <Location
						nextPage={nextPage}
						previousPage={previousPage}
						onSubmit={onSubmit}
					/>
				}
			</div>
		);
	}
}

export default withStyles(s)(ListYourSpaceSlider);

