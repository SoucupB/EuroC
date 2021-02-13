import React from 'react'
import './css/Loginpage.css';

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
  return (
    <div className = {boxClass}>
      <label className = {[absolute, labelClass, labelUsername].join(' ')}>Email</label>
      <input className = {[absolute, classInput, inputEmail].join(' ')} type="email"/>
      <label className = {[absolute, labelClass, labelParola].join(' ')}>Parola</label>
      <input className = {[absolute, classInput, inputPassword].join(' ')} type="password"/>
      <div className = {[absolute, buttonClass, buttonPoss].join(' ')}><p className={middleText}>{buttonLogin}</p></div>
      <div className = {[absolute, buttonClass, buttonPoss, registerClass].join(' ')}><p className={middleText}>{buttonRegister}</p></div>
    </div>
  )
}
