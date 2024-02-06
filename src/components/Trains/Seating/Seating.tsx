import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { IDirection, IDirectionsResponse } from "../../../interfaces/IDirectionsResponse";
import SeatsCard from "./SeatsCard/SeatsCard";
import { useNavigate } from "react-router-dom";
import { initOrderForm } from "../../../store/orderFormSlice";
import { useEffect, useState } from "react";
import { goAhead } from "../../../store/stepSlice";

import './Seating.css';

export default function Seating() {
    const navigator = useNavigate();
    const { index } = useParams();
    const directions: IDirectionsResponse = useAppSelector(state => state.directions.directions);
    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const dispatch = useAppDispatch();
    const [direction, setDirection] = useState<IDirection | null>(null);

    useEffect(() => {
        if (directions.error) {
            return;
        }
        
        const direction = directions.items[Number(index)];
        dispatch(initOrderForm(direction));
        setDirection(direction);
    }, [directions])

    const isOrderFormValid = () : boolean => {
        return orderForm.arrival != null
            && orderForm.arrival.route_direction_id != null
            && orderForm.arrival.seats != null
            && orderForm.arrival.seats.length > 0
            && orderForm.departure != null
            && orderForm.departure.route_direction_id != null
            && orderForm.departure.seats != null
            && orderForm.departure.seats.length > 0
            && orderForm.arrival.seats.length === orderForm.departure.seats.length
    }

    if (directions.error) {
        navigator('/');
        return <></>
    }

    if (isNaN(Number(index))) {
        return <></>
    }

    if (!direction) {
        return <></>
    }

    return (
        <div className="seating">
            <h2 className="seating-title">Выбор мест</h2>
            {direction && direction.arrival ? <SeatsCard isArrival={true} trainInfo={direction.arrival}/> : null}
            {direction && direction.departure ? <SeatsCard isArrival={false} trainInfo={direction.departure}/> : null}
            <div className="seating-buttonBar">
                <button 
                    className={isOrderFormValid() ? "seating-button" : "seating-button-blocked"}
                    onClick={()=> {
                        if (isOrderFormValid()) {
                            dispatch(goAhead());
                            navigator(`/trains/${index}/passengers`);
                        }
                        
                    }}
                >Выбрать места</button> 
            </div>
        </div>
    )
}
