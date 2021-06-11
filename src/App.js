import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const soapConfig = {
    headers: {
      'Content-Type': 'text/xml'      
    }
  };
  const soapXmlBeginPart = `<soapenv:Envelope 
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
  xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
  xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" 
  xmlns:urn="urn:Magento">
  <soapenv:Header/>`;
  const soapXmlAuthXmlBody = `
  <soapenv:Body>
  <urn:login soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
  <username xsi:type="xsd:string">${process.env.REACT_APP_SOAPUSER}</username>
  <apiKey xsi:type="xsd:string">${process.env.REACT_APP_SOAPPASS}</apiKey>
  </urn:login>
  </soapenv:Body>`;
  const soapXmlEndPart = `</soapenv:Envelope>`;

  const soapAuthXml = soapXmlBeginPart + soapXmlAuthXmlBody + soapXmlEndPart;
  const authorize = () => {
    axios.post(
      process.env.REACT_APP_SOAPURL,
      soapAuthXml,
      soapConfig
    ).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.          
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => authorize()}>Authorize</button>
      </header>
    </div>
  );
}

export default App;
