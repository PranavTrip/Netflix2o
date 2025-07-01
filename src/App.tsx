import HomeScreen from "./components/HomeScreen/HomeScreen"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";


function App() {
  const user = null;
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? <Login /> : <Routes>
          <Route path="/" element={<HomeScreen />} />
        </Routes>}
      </BrowserRouter>
    </div>
  )
}

export default App
