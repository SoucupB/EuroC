import React from 'react'
import './css/Loginpage.css';
import _uniqueId from 'lodash/uniqueId';
import ReactDOM from 'react-dom';
import Companyform from './Companyform'

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


export default function Loginbox({buttonLogin, buttonRegister}) {
  let emailId;
  let parolaId;

  const getEmailId = function() {
    if(emailId) {
      return emailId;
    }
    emailId = _uniqueId('')
    return emailId
  }

  const getParolaId = function() {
    if(parolaId) {
      return parolaId;
    }
    parolaId = _uniqueId('')
    return parolaId
  }

  const getEmail = function() {
    return document.getElementById(getEmailId()).value
  }

  const getPasword = function() {
    return document.getElementById(getParolaId()).value
  }

  const loginFunction = async function() {
    const requestOptions = {
      method: 'post',
      mode:"cors",
      headers: {
        "Content-type":"application/json;charset=utf-8"
      },
      body: JSON.stringify({ user: {email: "lana@gmail.com", parola: "admin12345"} })
    };
    console.log(getEmail(), getPasword());
    const response = await fetch('http://localhost:8000/login', requestOptions);
    const data = await response.json();
    console.log(data)
    ReactDOM.render(
      Companyform(),
      document.getElementById('root')
    );
  };

  const loginForm = function() {
    return (
      <div className = {boxClass}>
        <label className = {[absolute, labelClass, labelUsername].join(' ')}>Email</label>
        <input id = {getEmailId()} className = {[absolute, classInput, inputEmail].join(' ')} type="email"/>
        <label className = {[absolute, labelClass, labelParola].join(' ')}>Parola</label>
        <input id = {getParolaId()} className = {[absolute, classInput, inputPassword].join(' ')} type="password"/>
        <div onClick = {loginFunction} className = {[absolute, buttonClass, buttonPoss].join(' ')}><p className={middleText}>{buttonLogin}</p></div>
        <div className = {[absolute, buttonClass, buttonPoss, registerClass].join(' ')}><p className={middleText}>{buttonRegister}</p></div>
      </div>
    )
  }

  return loginForm()
}
