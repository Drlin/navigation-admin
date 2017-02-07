import React, { PropTypes } from 'react';
import { Form, Input, Modal, Button, Menu, Icon } from 'antd';
import { Link } from 'dva/router';

function UserModel({ 
  location, onModel, 
  visible, handleOk, 
  handleCancel, loading,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  }
  }) {

  function handleSubmit(e) {
    e.preventDefault();
    validateFields((errors) => {
      if (!!errors) {
        return;
      }
      handleOk(getFieldsValue());
    });
  }

  
  return (
    <Modal
      visible={visible}
      title="登录后台"
      onCancel={handleCancel}
      footer={[
        <Button key="back" type="ghost" size="large" onClick={handleCancel}>取消</Button>
      ]}
    >
      <Form inline onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('phoneNo', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

UserModel.propTypes = {
  location: PropTypes.object,
};

export default Form.create()(UserModel);
