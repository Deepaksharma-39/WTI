import { useState } from "react";

const Form=({clients,setClients})=>{
   
    const [clientName, setClientName] = useState('');
    const [clientLastName, setClientLastName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [clientMobile, setClientMobile] = useState('');
    const [clientProject, setClientProject] = useState('');
  
    const createObject = async(event) => {
      event.preventDefault();
      try {
        const response = await fetch('http://localhost:5000/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // Your data to be sent in the POST request
            id: Math.floor(Math.random() * 100),
            name: clientName,
            lastName: clientLastName,
            Email: clientEmail,
            mobile: clientMobile,
            project: clientProject,
          }),
        });
  
        const newData = await response.json();
        console.log(newData)
        console.log("clients",clients)
        setClients([...clients, newData]); // Add the newly created client to the existing list
        console.log(clients)
      } catch (error) {
        console.log(error)
      }

      alert(`Created A new client with name: ${clientName}`);
    };
  
    return (
        <>
        <h1>
            Create Client
        </h1>
      <form onSubmit={createObject}>
        <label htmlFor="clientName">Name:</label>
        <input
          type="text"
          id="clientName"
          name="clientName"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          />
  
        <label htmlFor="clientLastName">Last Name:</label>
        <input
          type="text"
          id="clientLastName"
          name="clientLastName"
          value={clientLastName}
          onChange={(e) => setClientLastName(e.target.value)}
          required
          />
  
        <label htmlFor="clientEmail">Email:</label>
        <input
          type="email"
          id="clientEmail"
          name="clientEmail"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          required
        />
  
        <label htmlFor="clientMobile">Mobile:</label>
        <input
          type="tel"
          id="clientMobile"
          name="clientMobile"
          value={clientMobile}
          onChange={(e) => setClientMobile(e.target.value)}
          required
          />
  
        <label htmlFor="clientProject">Project:</label>
        <input
          type="text"
          id="clientProject"
          name="clientProject"
          value={clientProject}
          onChange={(e) => setClientProject(e.target.value)}
          required
          />
  
        <button type="submit">Create Client</button>
      </form>
          </>
    );
}

export default Form;