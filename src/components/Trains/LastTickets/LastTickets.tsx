import { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import { IDirection } from "../../../interfaces/IDirectionsResponse";
import LastTicket from "./LastTicket/LastTicket";

import './LastTickets.css';

export default function LastTickets() {
  

  const getLastTickets = async () => {
    const newLastTickets = await ApiService.getLastRoutes();
    setLastTickets(newLastTickets)
  }

  const [lastTickets, setLastTickets] = useState([] as IDirection[]);

  useEffect(()=> {
    getLastTickets();
  },[])

  return (
    <div className="lastTickets-wrapper">
      <h2 className="lastTickets-title">последние билеты</h2>
      <ul className="lastTickets">
        {
          lastTickets.map((lastTicket, i) => {
            return <LastTicket lastTicket={lastTicket} key={i}/>
          })
        }
      </ul>
    </div>
  )
}
