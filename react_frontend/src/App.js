import './css/App.css';
import Navbar from './Navbar'
import Loginbox from './Loginbox'

const appTitle = "Euro Contracts"

function App() {
  return (
    <div>
      <Navbar title={appTitle}/>
      <Loginbox buttonLogin = {"Continue"} buttonRegister = {"Register"}/>
    </div>
  );
}

export default App;
