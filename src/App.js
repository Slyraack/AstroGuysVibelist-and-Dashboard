import './App.css';
import './Media.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from './Components/Sidebar/SideBar';
import Stacking from './Components/Stacking/Stacking';
import Market from './Components/Market/Market';
import Vibelist from "./Components/Vibelist/Vibelist";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/sidebar" element={<SideBar />} />
          <Route exact path="/" element={<Stacking />} />
          <Route exact path="/market" element={<Market />} />
          <Route exact path="/vibelist" element={<Vibelist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
