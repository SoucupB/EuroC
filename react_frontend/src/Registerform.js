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

export default class Registerform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      something: true
    };
    this.styleType = {"font-weight": "bold", "font-size": "26px", position: "relative", left: "30px"}
    this.labelsName = ['Email', 'Parola', 'Gen', "Varsta", "Prenume", "CNP", "Adresa", "Oras", "Tara", "Telefon"]
    this.dataMaping = {}
  }

  getLabels(labels) {
    let value = [];
    for(let i = 0; i < labels.length; i++) {
      value.push(<div style={this.styleType}>{labels[i]}</div>)
      let randomKey = getRandomID()
      this.dataMaping[labels[i]] = randomKey;
      value.push(<input style={this.styleType} id = {randomKey}></input>)
    }
    return <div style = {{position: "relative", top: "50px"}}>{value}</div>
  }

  showData() {
    console.log("DADGG")
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <div className = {[boxClass, bigform].join(' ')}>
          {this.getLabels(this.labelsName)}
          <Specbutton className = {[absolute, registerButton].join(' ')} onClickListener = {this.showData} name = {"Register"}></Specbutton>
        </div>
      </div>
    )
  }
}
