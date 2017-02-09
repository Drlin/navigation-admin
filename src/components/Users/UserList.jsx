import React, { PropTypes, Component } from 'react';
import { Table, Popconfirm, Pagination, Button, Icon } from 'antd';
import { Link } from 'dva/router';
import Animate from 'rc-animate';
import moment from 'moment';
import styles from './UserList.less';

export default class UserList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dragged: null,
      over: null
    }
  }

  componentDidMount() {
    let trs = document.getElementsByTagName('tr');
    for (let i = 0; i < trs.length; i++) {
      if (i !== 0) {
        trs[i].setAttribute('draggable', 'true');
        trs[i].dataset.id = (i - 1);
      }
    }
    document.addEventListener('dragstart', (e)=> {
      this.dragstart(e);
    })
    document.addEventListener('dragend', (e)=> {
      this.dragend(e);
    })
    document.addEventListener('dragover', (e)=> {
     this.dragover(e);
    })
  }

  dragstart(e) {
    this.setState({
      dragged: e.target
    })
    e.dataTransfer.effectAllowed = 'move'; //应该把拖动的元素移动到放置目标
  }

  dragend(e) {
    let {dragged} = this.state;
    dragged.style.display = 'table-row';
    let fromId = +dragged.dataset.id;
    let toId = +this.over.parentNode.dataset.id;
    this.props.sort(fromId, toId)
  }

  dragover(e) {
    e.preventDefault();
    this.over = e.target;
    let {dragged} = this.state;
    dragged.style.display = 'none';
    if(this.over.className == "placeholder") {
      return;
    }
  }

  getBodyWrapper(body) {
    return (
      <Animate 
        transitionName="move" 
        component="tbody" 
        className={body.props.className}
      >
        {body.props.children}
      </Animate>
    );
  }

  render() {
    const {totalPage, myLocation, current, loading, onPageChange, dataSource, sort, handlePreview} = this.props;

    const status = {
      0: '未审核',
      1: '已审核'
    }

    const columns = [{
      title: '小程序名称',
      dataIndex: 'name',
      key: 'name'
    },{
      title: '产品介绍',
      dataIndex: 'slogan',
      key: 'slogan'
    }, {
      title: '二维码',
      dataIndex: 'qrImgUrl',
      key: 'qrImgUrl',
      render: (text) => <img className={styles.qrImgUrl} src={text} onClick={handlePreview.bind(this, text)} />,
    }, {
      title: '产品介绍图',
      dataIndex: 'logoImgUrl',
      key: 'logoImgUrl',
      render:  (logoImgUrl) => <img className={styles.qrImgUrl} src={logoImgUrl} onClick={handlePreview.bind(this, logoImgUrl)} />
    },{
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => <span>{status[text]}</span>
    },{
      title: '申请时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => <span>{moment(text*1000).format('YYYY-MM-DD HH:mm:ss')}</span>
    },{
      title: '操作',
      key: 'operation',
      render: (text, record) => record.subject === 0 ? <div><Button>通过</Button><Button>退回</Button></div> : <Button>修改</Button>
    }, {
      title: '排序',
      key: 'sort',
      render: (text, record, i) => 
                <div className={styles.sort} draggable="true">
                  <Button onClick={sort.bind(this, i, (i - 1))} 
                          type="ghost" shape="circle" icon="up" />
                  <Button type="ghost" onClick={sort.bind(this, i, (i + 1))} 
                          shape="circle" icon="down" />
                </div>
    }];


    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          rowKey={record => record.productId}
          pagination={false}
          bordered
          getBodyWrapper={this.getBodyWrapper}
        />
       
        <Pagination
          className="ant-table-pagination"
          total={+totalPage}
          current={+myLocation.query.pageNo || 1}
          pageSize={20}
          onChange={onPageChange}
        />
      </div>
    );
  }

}

