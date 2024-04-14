import React, { Component } from 'react'

export default class Color extends Component {

  

  render() {
    return (
        <span className={`${this.props.bg} rounded-circle colorbox-btn`} onClick={this.props.onClick}></span>
    )
  }
}
