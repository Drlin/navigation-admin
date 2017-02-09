import React, { PropTypes } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import * as routes from 'dva/router';
import styles from './UserSearch.less';

const { RangePicker } = DatePicker;

const UserSearch = ({
  field, inputData, selectData,
  onSearch,
  defaultContent,
  list,
  changeCategory,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    },
    myLocation
  }) => {
  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      onSearch(getFieldsValue());
    });
  }

  function handleChange(value) {
    changeCategory(value);
  }

  return (
    <div className={styles.normal}>
      <div className={styles.search}>
        <Form inline onSubmit={handleSubmit}>
          {
            inputData.map((item, index, array) => {
              return (<Form.Item
                hasFeedback
                key={item.key}
              >
                {getFieldDecorator(item.key, {
                  initialValue: myLocation.query[item.key] || '',
                })(
                  <Input type="text" placeholder={item.content}/>
                )}
              </Form.Item>)
            })
          }
          <Form.Item
          >
            {getFieldDecorator('RangePicker')(
              <RangePicker />
            )}
          </Form.Item>
          <Button style={{ marginRight: '10px' }} type="primary" htmlType="submit">搜索</Button>
        </Form>
      </div>
      <Select value={myLocation.query.category || ''} style={{ width: 120 }} onChange={handleChange}>
      <Select.Option value="">全部</Select.Option>
        {
          list.map((item) => {
            return <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
          })
        }
      </Select>
    </div>
  );
};

UserSearch.propTypes = {
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
  field: PropTypes.string
};

export default Form.create()(UserSearch);
