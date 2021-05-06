import React from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Style
import s from './Home.css';

// Component
import Search from './Search';

function Homepage() {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Search />
      </div>
    </div>
  );
}

export default withStyles(s)(Homepage);
