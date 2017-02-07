import React, { Component } from 'react';

var placeholder = document.createElement("li");
placeholder.className = "placeholder";

export default class UserTest extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      colors:  ["Red","Green","Blue","Yellow","Black","White","Orange"],
      dragged: null,
      over: null,
      nodePlacement: null
    }
  }
  dragStart (e) {
    this.setState({
      dragged: e.target
    })
    e.dataTransfer.effectAllowed = 'move'; //应该把拖动的元素移动到放置目标
  }
  dragEnd(e) {
    let {dragged, over, colors, nodePlacement} = this.state;
    dragged.style.display = "block";
    dragged.parentNode.removeChild(placeholder);
    let from = +dragged.dataset.id;
    let to = +over.dataset.id;
    if (from < to) {
      to--;
    }
    if(nodePlacement === "after") {
      to++;
    }
    colors.splice(to, 0, colors.splice(from, 1)[0]);
    this.setState(colors);
  }

  dragOver(e) {
    e.preventDefault();
    let {dragged, over} = this.state;
    dragged.style.display = 'none';
    if(e.target.className == "placeholder") {
      return;
    }
    this.setState({
      over: e.target
    })
    let relY = e.clientY - e.target.offsetTop;
    let height = e.target.offsetHeight / 2;
    let parent = e.target.parentNode;
    if(relY > height) {
      this.setState({
        nodePlacement: "after"
      });
      parent.insertBefore(placeholder, e.target.nextElementSibling);
    }
    else if(relY < height) {
      this.setState({
        nodePlacement: "before"
      });
      parent.insertBefore(placeholder, e.target);
    }
  }

  render() {
    return (
      <ul onDragOver={(e) => this.dragOver(e)}>
        {this.state.colors.map((item, i) => {
          return <li 
            data-id={i}
            key={i}
            draggable="true"
            onDragEnd={(e) => this.dragEnd(e)}
            onDragStart={(e) => this.dragStart(e)}
          >
            {item}
          </li>;
        })}
      </ul>
    );
  }

}
