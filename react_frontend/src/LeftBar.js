import React, { Component } from 'react'
import './css/LeftBar.css'
import ReactDOM from 'react-dom';
import Loginbox from './Loginbox';
import Registerform from './Registerform'

const leftBar = 'left-bar'
const leftBarLine = 'line'
const normalDrop = 'normal-drop'
const titleClass = 'title-class'

function BarButton({title, onClickCaller}) {
  return (
    <div className = {normalDrop} onClick = {onClickCaller}>
      <div className = {titleClass}>{title}</div>
      <div className = {leftBarLine}></div>
    </div>
  )
}

export default class LeftBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: false
    };
  }

  register() {
    ReactDOM.render(
      <Registerform />,
      document.getElementById('root')
    );
  }

  logout() {
    localStorage.removeItem("token");
    ReactDOM.render(
      <Loginbox buttonLogin = {"Continue"} buttonRegister = {"Register"}/>,
      document.getElementById('root')
    );
  }

  render() {
    return (
      <div className = {leftBar}>
        <BarButton title = 'Logout' onClickCaller = {this.logout} />
        <BarButton title = 'Register' onClickCaller = {this.register} />
      </div>
    )
  }
}
