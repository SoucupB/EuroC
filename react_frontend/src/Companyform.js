import React from 'react'
import Navbar from './Navbar'
import getRandomID from './scripts/RandomKey';
import './css/Loginpage.css';
import './css/CompanySlice.css';

//import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'

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
    left += 7;
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
        <StarFunction number = {number} left = {600} top = {-70} of = {5} />
      </div>
    </div>
  )
}

class Companyform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      something: true
    };
  }

  showForms() {
    let data = []
    for(let i = 0; i < 15; i++) {
      data.push(<CompanyFormSlice objId = {getRandomID()} title = "fdfds" type = "gfdgdfhh" location = "Romania" number = {3} />)
    }
    return data
  }

  render() {
    console.log(localStorage.getItem('token'))
    return (
      <div>
        <Navbar title="Companies"/>
        <div className = {[boxClass, companyWindow].join(' ')} style = {{borderRadius: '0px', width: "900px", height: "800px"}}>
          {this.showForms()}
        </div>
      </div>
    )
  }
}

export default Companyform;
