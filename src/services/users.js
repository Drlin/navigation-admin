import request from '../utils/request';
import qs from 'qs';

export async function query(params) {
  return request(`/category/getList`, {
  //return request('../getList.json', {
    credentials: 'include'
  });
}

export async function login(params) {
  return request('/account/login', {
    method: 'post',
    credentials: 'include',
    body: JSON.stringify(params)
  });
}

export async function getSortList(params) {
  return request(`/product/getSortList?${qs.stringify(params)}`, {
  //return request('../getSortList.json', {
    credentials: 'include'
  });
}









