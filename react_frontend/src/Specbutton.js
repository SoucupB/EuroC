import React, { Component } from 'react'
import './css/Loginpage.css';
const buttonClass = 'button-class'
const middleText = "text-vertical-center"

export default class Specbutton extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        <div onClick = {this.props.onClickListener} className = {buttonClass + " " + this.props.className}><p className={middleText}>{this.props.name}</p></div>
      </div>
    )
  }
}
