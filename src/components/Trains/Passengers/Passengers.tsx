import { useAppSelector } from "../../../hook";
import Passenger from "./Passenger/Passenger";

import './Passengers.css';

export default function Passengers() {
    const orderForm = useAppSelector(state => state.orderForm.orderForm);

    return (
        <div className="passengers-form">
            <>
            {
                orderForm.arrival && orderForm.arrival.seats && orderForm.arrival.seats.length > 0
                    ? orderForm.arrival.seats.map((seat, index) => <Passenger index={index}></Passenger>)
                    : null
            }
            </>
            <>
            {
                orderForm.departure && orderForm.departure.seats && orderForm.departure.seats.length > 0
                    ? orderForm.departure.seats.map((seat, index) => <Passenger index={index}></Passenger>)
                    : null
            }
            </>
        </div>
    )
}
