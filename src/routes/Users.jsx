import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Users.less';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModel from '../components/Users/UserModel';
import UserTest from '../components/Users/UserTest';
import UserImage from '../components/Users/UserImage';
import UserAnmiate from '../components/Users/UserAnmiate';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

function Users({ location, dispatch, users }) {
  const {
    inputData, loading, visible, dataSource, phoneNo, list, totalPage,
    largeImage
    } = users;

  const myLocation = location;

  const userListProps = {
    dataSource,
    totalPage,
    myLocation, 
    onPageChange(pageNo) {
      let newObj = location.query
      delete newObj.pageNo
      dispatch(routerRedux.push({
        pathname: '/',
        query: { pageNo, ...newObj },
      }));
    },
    onInquiries(id, name) {
      dispatch({
        type: 'users/inquiries',
        payload: {
          book_id: id,
          name: name
        },
      });
    },
    onQuality(id) {
      dispatch({
        type: 'users/quality',
        payload: id,
      });
    },
    sort(fromId, toId) {
      if (!dataSource[fromId] || !dataSource[toId]) {
        return;
      }
      let productId = dataSource[fromId].productId;
      let targetProductId = dataSource[toId].productId;
      dispatch({
        type: 'users/updateSort',
        payload: {
          productId, targetProductId, myLocation
        },
      });
    },
    handlePreview(src) {
      dispatch({
        type: 'users/largeImage',
        payload: {
          largeImage: src
        }
      });
    }
  };

  const userSearchProps = {
    myLocation,
    inputData,
    list,
    onSearch(fieldsValue) {
      dispatch(routerRedux.push({
        pathname: '/',
        query: { ...fieldsValue },
      }));
    },
    changeCategory(value) {
      dispatch(routerRedux.push({
        pathname: '/',
        query: { phoneNo,  category: value},
      }));
    }
  };

  const userModelProps = {
    loading,
    visible,
    handleOk(value) {
      dispatch({
        type: 'users/login',
        payload: value
      });
    }, 
    handleCancel() {
      dispatch({
        type: 'users/showModel',
        payload: {
          visible: false
        },
      });
    }
  };

  function onModel() {
    dispatch({
      type: 'users/showModel',
      payload: {
        visible: true
      },
    });
  }

  function hideModel() {
    dispatch({
      type: 'users/hideModel'
    });
  }

  function handleClick(e) {
    let newObj = myLocation.query
    dispatch(routerRedux.push({
      pathname: '/',
      query: { ...newObj,  ...{status: e.key}},
    }));
  }

  return (
    <MainLayout location={location} onModel={onModel} phoneNo={phoneNo}>
      <div className={styles.normal}>
         <Menu
          onClick={handleClick}
          mode="horizontal"
          selectedKeys={[myLocation.query.status || '1']}
          style={{ marginBottom: '20px' }}
        >
          <Menu.Item key='1'>
            <Icon type="question-circle-o" />未审核
          </Menu.Item>
          <Menu.Item key='2'>
            <Icon type="check-circle-o" />审核通过
          </Menu.Item>
        </Menu>
        <UserSearch {...userSearchProps} />
        <UserList {...userListProps} />
        <UserModel {...userModelProps}/>
        <UserImage largeImage={largeImage} hideModel={hideModel}/>
        {
          // <UserTest />
          // <UserAnmiate />
        }
      </div>
    </MainLayout>
  );
}

Users.propTypes = {
  users: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

function mapStateToProps({ users }) {
  return { users };
}

export default connect(mapStateToProps)(Users);
