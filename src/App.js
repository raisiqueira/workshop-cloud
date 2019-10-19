import './App.css';
import React from 'react';
import ListUsers from './components/UserList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Users list</h2>
        <ListUsers />
      </header>
    </div>
  );
}

export default App;
