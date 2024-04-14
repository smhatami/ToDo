import React, { Component } from 'react'

export default class Button extends Component {
  render() {
    return (
        <button id={this.props.type} className="mybtn btn-secondary division-btn mx-2">{this.props.children}</button>
    )
  }
}
