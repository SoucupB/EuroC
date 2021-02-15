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

export default {"loginFormHttp": loginFormHttp}