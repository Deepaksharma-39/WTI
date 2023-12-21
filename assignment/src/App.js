import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  const [clients, setClients] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
       <div className="navbar">
       <a href="#" className="active" id="clientsPanel">Clients Panel</a>
    <a href="#" className="clients">Clients</a>
       </div>
       
      </header>
<div className='content' >
<div>

<Table clients={clients} setClients={setClients} />
</div>

<div>
  <Form clients={clients} setClients={setClients} />
</div>
</div>


    </div>
  );
}

export default App;
