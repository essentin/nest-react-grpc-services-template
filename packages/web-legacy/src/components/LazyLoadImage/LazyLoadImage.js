import React from 'react';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';

import s from './LazyLoadImage.css';

class LazyLoadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSrc: null,
    };
  }

  componentDidMount() {
    const { src } = this.props;
    const imageLoader = new Image();
    imageLoader.src = src;
    imageLoader.onload = () => {
      this.setState({ imageSrc: src });
    };
  }

  render() {
    const { placeholderSrc, className, placeholderClassName } = this.props;
    const { imageSrc } = this.state;

    return (
      <div className={s.lazyLoadImageContainer}>
        <span
          className={cx(s.lazyLoadImagePreload, placeholderClassName)}
          style={{
            backgroundImage: `url(${placeholderSrc})`,
          }}
        />
        <div
          className={cx(s.lazyLoadImageLoaded, className)}
          style={{
            backgroundImage: `url(${imageSrc})`,
          }}
        />

        <div className={cx(s.lazyLoadImageBg)} />
      </div>
    );
  }
}

export default withStyles(s)(LazyLoadImage);