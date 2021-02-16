import React, { Component } from 'react'
import LeftBar from './LeftBar'
import Navbar from './Navbar'
import functionMap from './scripts/HttpScripts'

let getCompanyByID = functionMap["getCompanyByID"]
export default class CompanyDetailsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDone: false
    };
    this.dataTransformation = {
      "company_nume": "Nume",
      "company_cui": "CUI",
      "company_address": "Address",
      "company_tara": "Tara",
      "company_type": "Tip"
    }
    this.data = undefined;
    this.getAllData()
  }

  getMap() {
    if(this.state.isDone) {
      let street = this.data['company']['company_address']
      let city = this.data['company']['company_tara']
      var srcStr = "<iframe scrolling='no' marginheight='0' marginwidth='0' id='gmap_canvas' src='https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=" + street + "%20" + city + "+(Cluj)&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed' width='750' height='400' frameborder='0'></iframe> <script type='text/javascript' src='https://embedmaps.com/google-maps-authorization/script.js?id=00af1851e8c24c5ab1ac21c94dd1d8783901919f'></script>"
      return (
        <div dangerouslySetInnerHTML={{__html: srcStr}} >
        </div>
      )
    }
    return ''
  }

  getLine(key, value) {
    return (
      <div style = {{position: "relative", height: "70px"}}>
        <span style = {{fontWeight: "900", color: "blue"}}> {key} </span>
        <span style = {{position: 'absolute', left: "300px"}}> {value} </span>
        <hr style = {{width: "750px"}} />
      </div>
    )
  }

  async getAllData() {
    let data = await getCompanyByID(this.props.comp_id)
    this.data = data;
    this.setState({isDone: true})
  }

  renderData() {
    if(this.state.isDone) {
      let domElements = []
      const companyData = this.data['company']
      for(let key in companyData) {
        domElements.push(this.getLine(this.dataTransformation[key], companyData[key]))
      }
      return domElements
    }
    return ''
  }

  render() {
    return (
      <div>
        <Navbar title={"Register Form"}/>
        <LeftBar />
        <div style = {{position: "absolute", left: "600px", top: "200px"}}>
          {this.renderData()}
          {this.getMap()}
        </div>
      </div>
    )
  }
}
