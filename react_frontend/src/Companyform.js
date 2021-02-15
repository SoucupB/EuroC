import React from 'react'
import Navbar from './Navbar'
import getRandomID from './scripts/RandomKey';
import './css/Loginpage.css';
import './css/CompanySlice.css';
import functionMap from './scripts/HttpScripts'
import LeftBar from './LeftBar'

const getCompanyByToken = functionMap['getCompanyByToken']
const getStars = functionMap['getStars']
const getSponsorableByToken = functionMap['getSponsorableByToken']

const boxClass = "loginbox"
const companyBox = "company-form"
const companyWindow = "company-window-father"
const shadowBox = "company-shadow-box"
const companyTextStyle = "company-title"
const companyType = 'company-type'
const companyHeader = 'company-left'
const typeIcon = 'fa fa-arrow-right company-type-icon'
const iconPosition = 'pin2'
const positionIcon = 'pin-position'
const locationPosition = 'locations-name'
const locationStarPosition = 'fa fa-thumbs-o-up position-like'

let StarFunction = function({number, of, top, left}) {
  const star = "fa fa-star";
  const fullStar = 'fa fa-star checked';
  let starArrays = []
  let leftIndex = 0;
  for(let i = 0; i < of; i++) {
    if(i < number) {
      starArrays.push(<div style = {{left: leftIndex + left, top: top, position: "relative"}} className = {fullStar}></div>)
    }
    else {
      starArrays.push(<div style = {{left: leftIndex + left, top: top, position: "relative"}} className = {star}></div>)
    }
    left += 5;
  }
  return (
    <div style = {{position: "relative"}}>
      {starArrays}
    </div>
  )
}

let CompanyFormSlice = function({objId, title, type, location, number}) {
  return (
    <div id = {objId} key = {getRandomID()} className = {shadowBox}>
      <div className = {[companyBox].join(' ')}>
        <div className = {[companyHeader, companyTextStyle].join(' ')}>
          {title}
        </div>
        <div className = {[companyHeader, companyType].join(' ')}>
          {type}
        </div>
        <i className = {[typeIcon].join(' ')}></i>
        <div className = {[iconPosition, positionIcon].join(' ')}></div>
        <div className = {locationPosition}>{location}</div>
        <StarFunction number = {number} left = {600} top = {-55} of = {5} />
        <div className = {locationStarPosition}></div>
      </div>
    </div>
  )
}

class Companyform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: false
    };
    this.loadCompanyData()
    this.companyData = {}
    this.stars = {}
  }

  async getStars() {
    for(let i = 0; i < this.companyData['company'].length; i++) {
      const starC = await getStars(this.companyData['company'][i]['id'])
      this.stars[this.companyData['company'][i]['id']] = starC['company_trust']
    }
  }

  async loadCompanyData() {
    let dataCompany = await getCompanyByToken()
    this.companyData = dataCompany
    await this.getStars()
    this.setState({dataLoaded: true})
  }

  showCompanyForms() {
    if(this.state.dataLoaded) {
      let data = []
      for(let i = 0; i < this.companyData['company'].length; i++) {
        data.push(<CompanyFormSlice objId = {getRandomID()} title = {this.companyData['company'][i]['company_nume']}
                  type = {this.companyData['company'][i]['company_type']} location = {this.companyData['company'][i]['company_tara'] + ", " + this.companyData['company'][i]['company_address']}
                  number = {this.stars[this.companyData['company'][i]['id']]} />)
      }
      return data
    }
    return ''
  }

  render() {
    return (
      <div>
        <Navbar title="Euro Contracts"/>
        <LeftBar />
        <div className = {[boxClass, companyWindow].join(' ')} style = {{borderRadius: '0px', width: "900px", height: "800px"}}>
          {this.showCompanyForms()}
        </div>
      </div>
    )
  }
}

export default Companyform;
