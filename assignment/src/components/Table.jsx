import { useEffect, useState } from "react";

const Table = ({ clients, setClients, }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedClient, setEditedClient] = useState({});

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:5000/clients')
      .then(response => response.json())
      .then(data => {
        setClients(data.clients);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEdit = (id) => {
    setEditMode(true);
    setEditedClient(clients.find(client => client.id === id));
  };

  const handleUpdate = () => {
    // Make a PUT request to the API endpoint
    fetch(`http://localhost:5000/clients/${editedClient.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedClient),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update client');
        }
        // Update the client in the state
        setClients(clients.map(client => (client.id === editedClient.id ? editedClient : client)));
        setEditMode(false);
        setEditedClient({});
        alert("CLIENT UPDATED");
      })
      .catch(error => {
        console.error('Error updating client:', error);
      });
  };

  const handleDelete = (id) => {
    // Make a DELETE request to the API endpoint
    fetch(`http://localhost:5000/clients/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete client');
        }
        // Remove the deleted client from the state
        setClients(clients.filter(client => client.id !== id));
        alert("CLIENT DELETED");
      })
      .catch(error => {
        console.error('Error deleting client:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Project</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody id="clientTableBody">
          {clients.map(client => (
            <tr key={client.id}>
              <td>{editMode && editedClient.id === client.id ? <input type="text" value={editedClient.name} onChange={(e) => setEditedClient({ ...editedClient, name: e.target.value })} /> : client.name}</td>
              <td>{editMode && editedClient.id === client.id ? <input type="text" value={editedClient.lastName} onChange={(e) => setEditedClient({ ...editedClient, lastName: e.target.value })} /> : client.lastName}</td>
              <td>{editMode && editedClient.id === client.id ? <input type="text" value={editedClient.Email} onChange={(e) => setEditedClient({ ...editedClient, email: e.target.value })} /> : client.Email}</td>
              <td>{editMode && editedClient.id === client.id ? <input type="text" value={editedClient.mobile} onChange={(e) => setEditedClient({ ...editedClient, mobile: e.target.value })} /> : client.mobile}</td>
              <td>{editMode && editedClient.id === client.id ? <input type="text" value={editedClient.project} onChange={(e) => setEditedClient({ ...editedClient, project: e.target.value })} /> : client.project}</td>
              <td>
                {editMode && editedClient.id === client.id ? (
                  <>
                    <span className="actionButton" onClick={handleUpdate}>Update</span>
                    |
                    <span className="actionButton" onClick={() => { setEditMode(false); setEditedClient({}); }}>Cancel</span>
                  </>
                ) : (
                  <>
                    <span className="actionButton" onClick={() => handleEdit(client.id)}>Edit</span>
                    |
                    <span className="actionButton" onClick={() => handleDelete(client.id)}>Delete</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
