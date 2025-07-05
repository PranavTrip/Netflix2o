import HomeScreen from "./components/HomeScreen/HomeScreen"
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/user/userSlice";
import Profile from "./components/Profile/Profile";


function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          uid: userAuth?.uid,
          email: userAuth?.email
        }))
      } else {
        dispatch(logout())
      }
    })
    return unsubscribe
  }, [])
  return (
    <div className="app">
      <BrowserRouter>
        {!user ? <Login /> : <Routes>
          <Route path='/profile' element={<Profile />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>}
      </BrowserRouter>
    </div>
  )
}

export default App
