import React, { Component } from 'react'
import './css/LeftBar.css'
import ReactDOM from 'react-dom';
import Loginbox from './Loginbox';
import Registerform from './Registerform'
import Companyform from './Companyform'
import Createcompany from './Createcompany'
import functionMap from './scripts/HttpScripts'

const leftBar = 'left-bar'
const leftBarLine = 'line'
const normalDrop = 'normal-drop'
const titleClass = 'title-class'

const getUserType = functionMap['getUserType']

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
      dataLoaded: false,
      isSponsor: false
    };
    this.allComps = undefined
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

  createCompanyForm() {
    const token = localStorage.getItem('token')
    if(token) {
      return <BarButton title = 'Create Company' onClickCaller = {this.createCompanies} />
    }
    return ''
  }

  companiesForm() {
    const token = localStorage.getItem('token')
    if(token) {
      return <BarButton title = 'Companies' onClickCaller = {this.companies} />
    }
    return ''
  }

  async getAllCompaniesAsync() {
    const type = await getUserType()
    this.setState({isSponsor: true})
    if(type["type"] === 'sponsor') {
      const token = localStorage.getItem('token')
      if(token) {
        this.allComps = <BarButton title = 'All Companies' onClickCaller = {this.companies} />
      }
    }
    return ''
  }

  getAllCompanies() {
    if(this.state.isSponsor) {
      return this.allComps
    }
    else {
      this.getAllCompaniesAsync()
    }
  }

  render() {
    return (
      <div className = {leftBar}>
        {this.logoutForm()}
        {this.loginForm()}
        <BarButton title = 'Register' onClickCaller = {this.register} />
        {this.companiesForm()}
        {this.createCompanyForm()}
        {this.getAllCompanies()}
      </div>
    )
  }
}
