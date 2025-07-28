import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomeComponent from './components/HomeComponent';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeComponent/>}/>
      </Routes>
      </Router>
  );
}

export default App;
