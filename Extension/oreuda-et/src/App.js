import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";
import Folder from "./pages/Folder/Folder";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/folder/:name" element={<Folder />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
