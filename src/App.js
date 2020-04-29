import React from 'react';
import './App.css';
import Board from './components/Board'
// import SpringDraggable from './components/SpringDraggable'
import BeautifulDraggable from './components/BeautifulDraggable'

function App() {
  return (
    <div className="App">
      <Board />
      {/* <SpringDraggable /> */}
      <BeautifulDraggable />
    </div>
  );
}

export default App;
