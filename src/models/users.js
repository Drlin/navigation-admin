import { parse } from 'qs';
import key from 'keymaster';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import _ from 'lodash';
import Cookie from 'js-cookie';
import { login, getSortList, query, updateSort} from '../services/users';
import CookieUtil from '../utils/Utils'

export default {
  namespace: 'users',
  state: {
    inputData: [
      {content: '小程序名称', key: 'name'}
    ],
    loading: false,
    visible: false,
    list: [],
    uid: '',
    totalPage: '',
    phoneNo: '',
    largeImage: '',
    dataSource: []
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        switch (location.pathname) {
          case '/' :
            dispatch({
              type: 'query',
              payload: location.query,
            });
            dispatch({
              type: 'getSortList',
              payload: location.query,
            });
          break;
        };
      });
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const { data } = yield call(login, parse(payload));
      if (data) {
        yield put({
          type: 'users/showModel',
          payload: {
            visible: false
          },
        });
        if (data.statusCode === 0) {
          let phoneNo = data.data.phoneNo;
          Cookie.set('phoneNo', phoneNo);
          yield put({
            type: 'loginSuccess',
            payload: data.data,
          });
          yield put(routerRedux.push({
            pathname: '/',
            query: { phoneNo }
          }));
        } else {
          message.error(data.msg);
        }
      }
    },
    *query({ payload }, { call, put, select }) {
      const todos = Cookie.get('PHPSESSID')
      if (todos) {
       const { data } = yield call(query, payload);
       if (data && data.statusCode === 0) {
          yield put({
            type: 'querySuccess',
            payload: {
              list: data.data.list
            },
          });
        } else {
          message.error(data.msg);
        }
      }
    },
    *getSortList({ payload}, { call, put, select }) {
      const todos = Cookie.get('PHPSESSID')
      let status = payload.status;
      if (todos) {
        const { data } = yield call(getSortList, payload);
        if (data && data.statusCode === 0) {
          yield put({
            type: 'getSortListSuccess',
            payload: {
              dataSource: data.data.productList,
              totalPage: data.data.totalPage
            },
          });
          if (status === '2') {
            let trs = document.getElementsByTagName('tr');
            for (let i = 0; i < trs.length; i++) {
              if (i !== 0) {
                trs[i].setAttribute('draggable', 'true');
                trs[i].dataset.id = (i - 1);
              }
            }
          }
        } else {
          message.error(data.msg);
        }
      }
    },
    *updateSort({ payload }, { call, put, select }) {
      let query = payload.myLocation.query
      const { data } = yield call(updateSort, {
        productId: payload.productId,
        targetProductId: payload.targetProductId,
        category: query.category || ''
      });

      if (data && data.statusCode === 0) {
        yield put({
          type: 'getSortList',
          payload: query,
        });
      } else {
        message.error(data.msg);
      }
    }
  },
  reducers: {
    loginSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    querySuccess(state, action) {
      return { ...state, ...action.payload };
    },
    getSortListSuccess(state, action) {
      return { ...state, ...action.payload };
    },
    showModel(state, action) {
      return { ...state, ...action.payload };
    },
    up(state, action) {
      let i = action.payload;
      let nextState = _.cloneDeep(state);
      let dataSource = nextState.dataSource;
      if (i !== 0) {
        dataSource.splice(i, 1)
        //dataSource.splice(i - 1, 0, ...dataSource.splice(i, 1));
      }
      return nextState;
    },
    down(state, action) {
      let i = action.payload;
      let nextState = _.cloneDeep(state);
      let dataSource = nextState.dataSource;
      if (i !== 20) {
        dataSource.splice(i + 1, 0, ...dataSource.splice(i, 1));
      }
      return nextState;
    },
    largeImage(state, action) {
      return { ...state, ...action.payload };
    },
    hideModel(state, action) {
      let nextState = _.cloneDeep(state);
      nextState.largeImage = '';
      return nextState;
    }
  },
};
