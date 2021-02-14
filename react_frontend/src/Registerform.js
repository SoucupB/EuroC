import Navbar from './Navbar'
import React, { Component } from 'react'
import './css/Loginpage.css';
import './css/Registerpage.css';
import ReactDOM from 'react-dom';
import _uniqueId from 'lodash/uniqueId';
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
const bigform = 'big-class'
const registerForm = 'register-page'

export default class Registerform extends Component {

  getLabels(labels) {
    let value = [];
    for(let i = 0; i < labels.length; i++) {
      value.push(<div>DSADASDAS</div>)
      value.push(<button>DSADASDAS</button>)
    }
    console.log(value)
    return value
  }

  showData() {
    console.log("FDSFDSFSD")
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <div className = {[boxClass, bigform].join(' ')}>
          {this.getLabels('ana', 'mere', 'gay')}
        </div>
        <Specbutton onClickListener = {this.showData} name = {"Caca"}></Specbutton>
      </div>
    )
  }
}
