import React, { PropTypes } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import Cookie from 'js-cookie';
import styles from './MainLayout.less';
import CookieUtil from '../../utils/Utils'

function Header({ location, onModel }) {
  return (
    <Menu
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="home">
        <a href="/"><Icon type="home" />审核后台</a>
      </Menu.Item>
      <Menu.Item key="login" style={{float: 'right'}}>
        {
          !Cookie.get('phoneNo') ? <span className={styles.login} onClick={onModel}>登录</span>
          : <span>欢迎你,{Cookie.get('phoneNo')}</span>
        }
        
      </Menu.Item>
    </Menu>
  );
}

Header.propTypes = {
  location: PropTypes.object,
};

export default Header;
