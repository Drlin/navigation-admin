import React, { PropTypes } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import styles from './Users.less';
import UserList from '../components/Users/UserList';
import UserSearch from '../components/Users/UserSearch';
import UserModel from '../components/Users/UserModel';
import UserTest from '../components/Users/UserTest';
import UserImage from '../components/Users/UserImage';
import UserAnmiate from '../components/Users/UserAnmiate';

function Users({ location, dispatch, users }) {
  const {
    inputData, loading, visible, dataSource, phoneNo, list, totalPage,
    largeImage
    } = users;

  const myLoaction = location;

  const userListProps = {
    dataSource,
    totalPage,
    onPageChange(page) {
      let newObj = location.query
      delete newObj.page
      dispatch(routerRedux.push({
        pathname: '/',
        query: { page, ...newObj },
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
    up(i) {
      dispatch({
        type: 'users/up',
        payload: i,
      });
    },
    down(i) {
      dispatch({
        type: 'users/down',
        payload: i,
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
    myLoaction,
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
        query: { phoneNo,  categoryId: value},
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

  return (
    <MainLayout location={location} onModel={onModel} phoneNo={phoneNo}>
      <div className={styles.normal}>
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
