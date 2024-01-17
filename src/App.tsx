import { Routes, Route, NavLink } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import Trains from "./components/Trains/Trains";
import Header from "./components/Header/Header";

import './App.css';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/trains" element={<Trains/>}/>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
