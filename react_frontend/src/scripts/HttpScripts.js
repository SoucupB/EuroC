let loginFormHttp = async function(email, parola) {
  const requestOptions = {
    method: 'post',
    mode: "cors",
    headers: {
      "Content-type":"application/json;charset=utf-8"
    },
    body: JSON.stringify({ user: {email: email, parola: parola} })
  };
  const response = await fetch('http://localhost:8000/login', requestOptions);
  return await response.json();
}

let getCompanyByToken = async function() {
  let token = localStorage.getItem('token')
  const response = await fetch('http://localhost:8000/companyUser?token=' + token);
  return await response.json();
}

let getSponsorableByToken= async function() {
  let token = localStorage.getItem('token')
  const response = await fetch('http://localhost:8000/showOtherCompanies?token=' + token);
  return await response.json();
}

let getStars = async function(company_id) {
  let token = localStorage.getItem('token')
  const response = await fetch('http://localhost:8000/getStars?company_id=' + company_id);
  return await response.json();
}

let getUserType = async function(company_id) {
  let token = localStorage.getItem('token')
  const response = await fetch('http://localhost:8000/userType?token=' + token);
  return await response.json();
}

let createCompany = async function(company) {
  const requestOptions = {
    method: 'post',
    mode: "cors",
    headers: {
      "Content-type":"application/json;charset=utf-8"
    },
    body: JSON.stringify(company)
  };
  let token = localStorage.getItem("token")
  const response = await fetch('http://localhost:8000/company?token=' + token, requestOptions);
  let data = await response.json();
  console.log(data)
  return data;
}

export default {"loginFormHttp": loginFormHttp, "getCompanyByToken": getCompanyByToken,
                "getStars": getStars, "createCompany": createCompany, "getUserType": getUserType, "getSponsorableByToken": getSponsorableByToken}