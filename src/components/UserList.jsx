import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  const addUser = (e) => {
    e.preventDefault();
const newUser = { name, email };
    axios.post('http://localhost:5000/users', newUser)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error('Error adding user:', error));
  };
  const editUser = (id, updatedName, updatedEmail) => {
    axios.put(`http://localhost:5000/users/${id}`, { name: updatedName, email: updatedEmail })
      .then(response => {
        setUsers(users.map(user => user.id === id ? response.data : user));
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <>
      <form onSubmit={addUser}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Add User</button>
      </form>
      <table>
        <tbody> 
          {users.map(user => (
            <tr key={user.id}>
            <td>
              <input
                value={user.name}
                onChange={(e) => editUser(user.id, e.target.value, user.email)}
              />
            </td>
            <td>
              <input
                value={user.email}
                onChange={(e) => editUser(user.id, user.name, e.target.value)}
              />
            </td>
            <td>
              <button onClick={() => editUser(user.id, user.name, user.email)}>Editar</button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </> 
  );
};

export default UserList;