import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NavBar from './components/NavBar';
import CreateNote from './components/CreateNote';
import DisplayNotes from './components/DisplayNotes';
import UpdateNote from './components/UpdateNote';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<DisplayNotes/>} />
            <Route path='/create' element={<CreateNote />} />
            <Route path='/update/:id' element={<UpdateNote />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
