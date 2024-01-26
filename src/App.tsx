import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import Trains from "./components/Trains/Trains";
import Header from "./components/Header/Header";

import './App.css';
import TrainList from "./components/Trains/TrainList/TrainList";
import Seating from "./components/Trains/Seating/Seating";


function App() {
  return (
    <div className="App">
      <Header></Header>
      <main className="main">
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/trains" element={<Trains/>}>
            <Route index element={<TrainList/>}></Route>
            <Route path=":index" element={<Seating/>}/>
          </Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
