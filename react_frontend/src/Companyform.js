import React from 'react'
import Navbar from './Navbar'
import getRandomID from './scripts/RandomKey';
import './css/Loginpage.css';
import './css/CompanySlice.css';
import functionMap from './scripts/HttpScripts'
import LeftBar from './LeftBar'
import CompanyDetailsForm from './CompanyDetailsForm'
import Createcompany from './Createcompany';
import ReactDOM from 'react-dom';

const getCompanyByToken = functionMap['getCompanyByToken']
const getStars = functionMap['getStars']
const getSponsorableByToken = functionMap['getSponsorableByToken']
const getContractData = functionMap['getContractData']

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

let sumMoney = function(sum) {
  if(sum) {
    return <span className = {[companyHeader, companyTextStyle].join(' ')} style = {{color: "green", fontSize: "15px", position: "absolute",
                                                                           left: "580px", top: "55px", fontWeight: "bold"}}>Contract total: ${sum}</span>
  }
  return ''
}

let redirectToCompany = function(comp_id) {
  console.log(comp_id)
  ReactDOM.render(
    <CompanyDetailsForm comp_id = {comp_id} />,
    document.getElementById('root')
  );
  return false
}

let CompanyFormSlice = function({objId, title, type, location, number, cmp_id, contract_money}) {
  return (
    <div id = {objId} key = {getRandomID()} className = {shadowBox}>
      <div className = {[companyBox].join(' ')} onClick = {() => redirectToCompany(cmp_id)} >
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
        <div className = {[companyHeader, companyTextStyle].join(' ')} style = {{fontSize: "15px", position: "absolute",
                                                                                 left: "480px", top: "55px", fontWeight: "bold"}}>{"ID " + cmp_id}</div>
        {sumMoney(contract_money)}
      </div>
    </div>
  )
}

class Companyform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dataLoaded: false,
      reloaded: true
    };
    this.companyData = {}
    this.stars = {}
    this.allContracts = {}
  }

  async getStarsType() {
    for(let i = 0; i < this.companyData['company'].length; i++) {
      const starC = await getStars(this.companyData['company'][i]['id'])
      if(this.companyData && this.companyData['company'] && this.companyData['company'][i] && this.companyData['company'][i]['id']) {
        this.stars[this.companyData['company'][i]['id']] = starC['company_trust']
      }
    }
  }

  async getContractsType() {
    for(let i = 0; i < this.companyData['company'].length; i++) {
      const starC = await getContractData(this.companyData['company'][i]['id'])
      if(Object.keys(starC['user_contract']).length) {
        this.allContracts[this.companyData['company'][i]['id']] = starC['user_contract']['contract_sum']
      }
    }
  }

  componentDidMount() {
    this.loadCompanyData()
  }

  componentDidUpdate() {
    if(this.props.use['g'] === "all" || this.props.use['g'] === "partial") {
      this.loadCompanyData()
      this.props.use['g'] = ''
    }
  }

  async loadCompanyData() {
    let dataCompany;
    if(this.props.useAll === "true") {
      dataCompany = await getSponsorableByToken()
    }
    else {
      dataCompany = await getCompanyByToken()
    }
    this.companyData = dataCompany
    await this.getStarsType()
    await this.getContractsType()
    this.setState({dataLoaded: true})
  }

  showCompanyForms() {
    if(this.state.dataLoaded) {
      let data = []
      for(let i = 0; i < this.companyData['company'].length; i++) {
        data.push(<CompanyFormSlice objId = {getRandomID()} title = {this.companyData['company'][i]['company_nume']}
                  type = {this.companyData['company'][i]['company_type']} location = {this.companyData['company'][i]['company_tara'] + ", " + this.companyData['company'][i]['company_address']}
                  number = {this.stars[this.companyData['company'][i]['id']]} cmp_id = {this.companyData['company'][i]['id']} contract_money = {this.allContracts[this.companyData['company'][i]['id']]}/>)
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
