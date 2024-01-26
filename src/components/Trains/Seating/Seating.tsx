import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import { IDirection } from "../../../interfaces/IDirectionsResponse";
import { IDirectionsResponse } from "../../../interfaces/IDirectionsResponse";
import SeatsCard from "./SeatsCard/SeatsCard";
import { useNavigate } from "react-router-dom";

import './Seating.css';

export default function Seating() {
    const navigator = useNavigate()
    const {index} = useParams();
    const directions: IDirectionsResponse = useAppSelector(state => state.directionsResponse.directionsResponse)
    let direction = {} as IDirection;


    if (directions.error) {
        navigator('/');
        return<></>
    }

    if (!isNaN(Number(index))) {
        direction = directions.items[Number(index)]
    }
    
    return (
        <div className="seating">
            <h2 className="seating-title">Выбор мест</h2>
            <SeatsCard isDirectionForward={true} trainInfo={direction.arrival}/>
            <SeatsCard isDirectionForward={false} trainInfo={direction.departure}/>
        </div>
    )
}
