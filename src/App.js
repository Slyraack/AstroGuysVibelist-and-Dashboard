import './App.css';
import './Media.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from './Components/Sidebar/SideBar';
import Stacking from './Components/Stacking/Stacking';
import Market from './Components/Market/Market';
import VibeList from './Components/Vibelist/Vibelist';
import Dashboard from './Components/Dashboard/Dashboard';
import Bridge from './Components/Bridge/Bridge';
import Buyguys from './Components/Buyguys/Buyguys';
import Portfolio from './Components/Portfolio/Portfolio';


function App() {
 
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/sidebar" element={<Dashboard />} />
          <Route exact path="/staking" element={<Dashboard />} />
          <Route exact path="/market" element={<Dashboard />} />
          <Route exact path="/" element={<VibeList />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/bridge" element={<Dashboard />} />
          <Route exact path="/buyguys" element={<Dashboard />} />
          <Route exact path="/portfolio" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
