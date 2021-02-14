import React from 'react'
import Navbar from './Navbar'

class Companyform extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      something: true
    };
  }

  render() {
    console.log(localStorage.getItem('token'))
    return (
      <div>
        <Navbar title="Companies"/>
      </div>
    )
  }
}

export default Companyform;
