import React from 'react'
import './css/Loginpage.css';
import _uniqueId from 'lodash/uniqueId';
import ReactDOM from 'react-dom';
import Companyform from './Companyform'
import Registerform from './Registerform'
import Specbutton from './Specbutton'

const boxClass = "loginbox"
const labelClass = "label-loginbox"
const classInput = "input-class"
const labelParola = 'label-parola'
const labelUsername = 'label-email'
const inputEmail = 'input-class-email'
const inputPassword = 'input-class-password'
const buttonClass = 'button-class'
const absolute = "inside-objects"
const middleText = "text-vertical-center"
const buttonPoss = "button-class-position"
const registerClass = "register"
const errorClass = 'error-message'

class Loginbox extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
    this.emailId = 0;
    this.parolaId = 0;
    this.state = {
      isLogged: false,
      failLoggin: false
    };
  }

  getEmailId() {
    if(this.emailId) {
      return this.emailId;
    }
    this.emailId = _uniqueId('')
    return this.emailId
  }

  getParolaId() {
    if(this.parolaId) {
      return this.parolaId;
    }
    this.parolaId = _uniqueId('')
    return this.parolaId
  }

  getEmail() {
    return document.getElementById(this.getEmailId()).value
  }

  getPasword() {
    return document.getElementById(this.getParolaId()).value
  }

  async loginFunction(email, parola) {
    const requestOptions = {
      method: 'post',
      mode:"cors",
      headers: {
        "Content-type":"application/json;charset=utf-8"
      },
      body: JSON.stringify({ user: {email: email, parola: parola} })
    };
    const response = await fetch('http://localhost:8000/login', requestOptions);
    const data = await response.json();
    if(data['Error'] !== "No such record exists!") {
      localStorage.setItem("token", data["client"])
      ReactDOM.render(
        <Companyform />,
        document.getElementById('root')
      );
    }
    else {
      this.setState({failLoggin: true})
    }
  };

  registerForm() {
    ReactDOM.render(
      <Registerform />,
      document.getElementById('root')
    );
  }

  loginFunctionNormal(event) {
    const email = this.getEmail();
    const parola = this.getPasword();
    this.loginFunction(email, parola)
  }

  errorMessage(message) {
    if(this.state.failLoggin) {
      return <span className = {[absolute, errorClass].join(' ')}>{message}</span>
    }
    return ''
  }

  loginForm() {
    return (
      <div className = {boxClass}>
        <label className = {[absolute, labelClass, labelUsername].join(' ')}>Email</label>
        <input id = {this.getEmailId()} className = {[absolute, classInput, inputEmail].join(' ')} type="email"/>
        <label className = {[absolute, labelClass, labelParola].join(' ')}>Parola</label>
        <input id = {this.getParolaId()} className = {[absolute, classInput, inputPassword].join(' ')} type="password"/>
        {this.errorMessage("Wrong email or password!")}
        <Specbutton className = {[absolute, buttonPoss].join(' ')} onClickListener = {this.loginFunctionNormal.bind(this)} name = {this.props.buttonLogin}></Specbutton>
        <Specbutton className = {[absolute, buttonPoss, registerClass].join(' ')} onClickListener = {this.registerForm.bind(this)} name = {this.props.buttonRegister}></Specbutton>
      </div>
    )
  }

  render() {
    return this.loginForm();
  }
}

export default Loginbox;