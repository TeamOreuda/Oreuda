import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import Main from "./pages/Main/Main";

import './App.css';

function App() {
  return (
    <div className='App'>
			<Router>
				<Routes>
					<Route path="/" element={<Landing />}></Route>
					<Route path="/main" element={<Main />}></Route>
				</Routes>
			</Router>
		</div>
  );
}

export default App;
