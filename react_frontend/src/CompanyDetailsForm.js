import React, { Component } from 'react'
import LeftBar from './LeftBar'
import Navbar from './Navbar'

export default class CompanyDetailsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {

    };

  }

  getLine(key, value) {
    return (
      <div style = {{position: "relative", height: "70px"}}>
        <span style = {{fontWeight: "900", color: "blue"}}> {key} </span>
        <span style = {{position: 'absolute', left: "300px"}}> {value} </span>
        <hr style = {{width: "650px"}} />
      </div>
    )
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <LeftBar />
        <div style = {{position: "absolute", left: "700px", top: "200px"}}>
          {this.getLine("Ana", "Mere")}
          {this.getLine("Agfdgfdna", "gdfdd")}
        </div>
      </div>
    )
  }
}
