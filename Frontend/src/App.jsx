import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import Listemployee from './Listemployee';
import Footer from './Footer';
import Headercomponent from './Headercomponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Addemployee from './Addemployee';

function App() {
  return (
    <div>
      <Router>
        <Headercomponent />
        <div className="container">
          <Routes>
            <Route path="/" element={<Listemployee />} />
            <Route path="/employees" element={<Listemployee />} />
            <Route path="/add-employee" element={<Addemployee />} />
            <Route exact path="/update-employee/:id" element={<Addemployee />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
