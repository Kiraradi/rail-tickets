import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import MainPage from "./components/MainPage/MainPage";
import Trains from "./components/Trains/Trains";
import Header from "./components/Header/Header";
import TrainList from "./components/Trains/TrainList/TrainList";
import Seating from "./components/Trains/Seating/Seating";
import Passengers from "./components/Trains/Passengers/Passengers";
import SuccessfulBuy from "./components/SuccessfulBuy/SuccessfulBuy";
import Payment from "./components/Trains/Payment/Payment";

import './App.css';

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
            <Route path=":index/passengers" element={<Passengers/>}/>
            <Route path=":index/payment" element={<Payment/>}/>
          </Route>
          <Route path="/successful-buy" element={<SuccessfulBuy/>}></Route>
        </Routes>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
