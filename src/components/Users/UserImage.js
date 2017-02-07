import React, { Component } from 'react';
import styles from './UserList.less';

export default class UserImage extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      visible: true
    }
  }


  render() {
    let {visible} = this.state;
    let {largeImage, hideModel} = this.props;
    return (
      largeImage
      ?
        (<div className={styles.model} onClick={hideModel}>
          <img src={largeImage}/>
        </div>)
      : null
    );
  }

}