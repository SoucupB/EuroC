import React, { Component } from 'react'
import './css/LeftBar.css'
import ReactDOM from 'react-dom';
import Loginbox from './Loginbox';
import Registerform from './Registerform'
import Companyform from './Companyform'
import Createcompany from './Createcompany'

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

  login() {
    ReactDOM.render(
      <Loginbox buttonLogin = {"Continue"} buttonRegister = {"Register"}/>,
      document.getElementById('root')
    );
  }

  companies() {
    ReactDOM.render(
      <Companyform />,
      document.getElementById('root')
    );
  }

  createCompanies() {
    ReactDOM.render(
      <Createcompany />,
      document.getElementById('root')
    );
  }

  logoutForm() {
    const token = localStorage.getItem('token')
    if(token) {
      return <BarButton title = 'Logout' onClickCaller = {this.logout} />
    }
    return ''
  }

  loginForm() {
    const token = localStorage.getItem('token')
    if(!token) {
      return <BarButton title = 'Login' onClickCaller = {this.login} />
    }
    return ''
  }

  render() {
    return (
      <div className = {leftBar}>
        {this.logoutForm()}
        {this.loginForm()}
        <BarButton title = 'Register' onClickCaller = {this.register} />
        <BarButton title = 'Companies' onClickCaller = {this.companies} />
        <BarButton title = 'Create Company' onClickCaller = {this.createCompanies} />
      </div>
    )
  }
}
