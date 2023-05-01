import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";
import Folder from "./pages/Folder/Folder";
import Oauth from "./pages/Oauth/Oauth";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Folder />}></Route>
          <Route path="/main" element={<Main />}></Route>
          <Route path="/folder/:name" element={<Folder />}></Route>
          <Route path="/oauth2/success" element={<Oauth />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
