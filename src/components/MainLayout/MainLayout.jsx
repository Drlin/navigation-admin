import React, { PropTypes } from 'react';
import styles from './MainLayout.less';
import Header from './Header';

function MainLayout({ children, location, onModel, phoneNo }) {
  return (
    <div className={styles.normal}>
      <Header location={location} onModel={onModel} phoneNo={phoneNo}/>
      <div className={styles.content}>
        <div className={styles.main}>
          {children}
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
};

export default MainLayout;
