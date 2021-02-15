import Navbar from './Navbar'
import React, { Component } from 'react'
import './css/Loginpage.css';
import './css/Registerpage.css';
import './css/CompanyCreate.css';
import ReactDOM from 'react-dom';
import getRandomID from './scripts/RandomKey';
import Specbutton from './Specbutton'
import Companyform from './Companyform'
import functionMap from './scripts/HttpScripts'
import LeftBar from './LeftBar'

const boxClass = "company-create"
const bigform = 'big-class'
const absolute = "inside-objects"
const registerButton = "register-button"
const regError = "error-message-register"
const regTotalError = 'error-message-create'

const errorMessages = {
  normal: 0,
  wrongEmail: 1,
  missingField: 2,
  wrongType: 3,
  serverError: 4
}

let createCompany = functionMap["createCompany"]
let createContract = functionMap["createContract"]

export default class Contractform extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorState: 0,
      errorMessage: ""
    };
    this.styleType = {fontWeight: "bold", fontSize: "26px", position: "relative", left: "30px"}
    this.labelsName = ['Your Company ID', 'Target Company ID', "Funds", "Tip", "Procent"]
    this.dataMaping = {}
    this.bodyField = {}
    this.toLowerString();
  }

  toLowerString() {
    this.bodyField["Your Company ID"] = 'param_id'
    this.bodyField["Target Company ID"] = 'second_cmp_id'
    this.bodyField["Funds"] = 'funds'
    this.bodyField["Procent"] = 'procent'
    this.bodyField["Tip"] = 'type'
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
      return {"Error": "Fields are empty!", "ErrorState": errorMessages['missingField']};
    }
    return 1;
  }

  componentDidMount() {
    this.preload();
  }

  componentDidUpdate() {
    this.preload();
  }

  preload() {
    let values = localStorage.getItem("SavedFields")
    if(values) {
      let data = JSON.parse(values)
      for(let key in data) {
        let domElement = document.getElementById(this.dataMaping[key]);
        if(domElement) {
          domElement.value = data[key]
        }
      }
    }
  }

  presave(data) {
    localStorage.setItem("SavedFields", JSON.stringify(data))
  }

  registerRequest() {
    let bodyRequest = { "user_contract": {} };
    let dataToSave = {}
    let errorState = undefined;
    for(let i = 0; i < this.labelsName.length; i++) {
      let ID = this.dataMaping[this.labelsName[i]];
      let fieldData = document.getElementById(ID).value;
      let valueChecker = this.correctField(this.labelsName[i], fieldData);
      dataToSave[this.labelsName[i]] = fieldData
      if(valueChecker != 1) {
        errorState = valueChecker
      }
      bodyRequest["user_contract"][this.bodyField[this.labelsName[i]]] = fieldData
    }
    this.presave(dataToSave)
    if(errorState) {
      this.setState({errorState: errorState['ErrorState'], errorMessage: errorState['Error']})
      return errorState
    }
    this.setState({errorState: errorMessages['normal'], errorMessage: ""})
    return bodyRequest;
  }

  getLabels(labels) {
    let value = [];
    for(let i = 0; i < labels.length; i++) {
      value.push(<div key = {getRandomID()} style={this.styleType}>{labels[i]}</div>)
      let randomKey = getRandomID()
      this.dataMaping[labels[i]] = randomKey;
      value.push(<input key = {randomKey} style={this.styleType} id = {randomKey}></input>)
    }
    return <div style = {{position: "relative", top: "50px"}}>{value}</div>
  }

  async registerRequestHttp(req) {
    let data = await createContract(req)
    if(data["user_contract"]) {
      ReactDOM.render(
        <Companyform use = {{"g": "partial"}} />,
        document.getElementById('root')
      );
    }
    else {
      this.setState({errorState: errorMessages['serverError'], errorMessage: "There was an error with the server!"})
    }
  }

  showData() {
    let req = this.registerRequest()
    if(!req["Error"]) {
      this.registerRequestHttp(req)
    }
  }

  errorMessage() {
    if(this.state.errorState != errorMessages['normal']) {
      return <span className = {[absolute, regTotalError].join(' ')}>{this.state.errorMessage}</span>
    }
    return '';
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <LeftBar />
        <div className = {[boxClass, bigform].join(' ')} style = {{height: "550px"}}>
          {this.getLabels(this.labelsName)}
          {this.errorMessage()}
          <Specbutton className = {[absolute, registerButton].join(' ')} onClickListener = {this.showData.bind(this)} name = {"Create"}></Specbutton>
        </div>
      </div>
    )
  }
}
