import Navbar from './Navbar'
import React, { Component } from 'react'
import './css/Loginpage.css';
import './css/Registerpage.css';
import ReactDOM from 'react-dom';
import getRandomID from './scripts/RandomKey';
import Specbutton from './Specbutton'

const boxClass = "loginbox"
const bigform = 'big-class'
const absolute = "inside-objects"
const registerButton = "register-button"
const regError = "error-message-register"

const errorMessages = {
  normal: 0,
  wrongEmail: 1,
  missingField: 2,
  wrongType: 3
}

export default class Registerform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorState: 0,
      errorMessage: ""
    };
    this.styleType = {fontWeight: "bold", fontSize: "26px", position: "relative", left: "30px"}
    this.labelsName = ['Email', 'Parola', 'Gen', "Prenume", "CNP", "Adresa", "Oras", "Tara", "Telefon", "Tip", "Nume"]
    this.dataMaping = {}
    this.bodyField = {}
    this.toLowerString();
  }

  toLowerString() {
    for(let i = 0; i < this.labelsName.length; i++) {
      this.bodyField[this.labelsName[i]] = this.labelsName[i].toLowerCase()
    }
    this.bodyField["Tip"] = 'user_type'
    this.bodyField["CNP"] = 'CNP'
    this.bodyField["cnp"] = 'CNP'
  }

  validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  isNumeric(str) {
    if (typeof str != "string") return false
    return !isNaN(str) &&
           !isNaN(parseFloat(str))
  }

  correctField(key, value) {
    if(value === "" || value === undefined) {
      return {"Error": "Fields are empty!"};
    }
    if(key === "Email") {
      if(!this.validateEmail(value)) {
        return {"Error": "Email format is wrong!"};
      }
    }
    if(key === "Tip") {
      console.log(key, value)
      if(!(value === "normal" || value === "admin" || value === "sponsor")) {
        return {"Error": "Tipurile permise sunt sponsor, normal sau admin!"};
      }
    }
    return 1;
  }

  registerRequest() {
    let bodyRequest = { "user": {} };
    for(let i = 0; i < this.labelsName.length; i++) {
      let ID = this.dataMaping[this.labelsName[i]];
      let fieldData = document.getElementById(ID).value;
      let valueChecker = this.correctField(this.labelsName[i], fieldData);
      if(valueChecker != 1) {
        return valueChecker
      }
      bodyRequest["user"][this.bodyField[this.labelsName[i]]] = fieldData
    }
    return bodyRequest;
  }

  getLabels(labels) {
    let value = [];
    for(let i = 0; i < labels.length; i++) {
      value.push(<div key = {getRandomID()} style={this.styleType}>{labels[i]}</div>)
      let randomKey = getRandomID()
      this.dataMaping[labels[i]] = randomKey;
      value.push(<input key = {getRandomID()} style={this.styleType} id = {randomKey}></input>)
    }
    return <div style = {{position: "relative", top: "50px"}}>{value}</div>
  }

  async registerRequest(req) {
    const requestOptions = {
      method: 'post',
      mode: "cors",
      headers: {
        "Content-type":"application/json;charset=utf-8"
      },
      body: JSON.stringify({ user: req["user"] })
    };
    const response = await fetch('http://localhost:8000/register', requestOptions);
    const data = await response.json();
    console.log(data)
  }

  showData() {
    let req = this.registerRequest()
    this.registerRequest(req)
  }

  errorMessage() {
    if(this.state.errorState !== errorMessages['normal']) {
      return <span className = {[absolute, regError].join(' ')}>{this.state.errorMessage}</span>
    }
    return '';
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <div className = {[boxClass, bigform].join(' ')}>
          {this.getLabels(this.labelsName)}
          {this.errorMessage()}
          <Specbutton className = {[absolute, registerButton].join(' ')} onClickListener = {this.showData.bind(this)} name = {"Register"}></Specbutton>
        </div>
      </div>
    )
  }
}
