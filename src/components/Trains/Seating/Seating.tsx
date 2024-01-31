import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hook";
import { IDirection } from "../../../interfaces/IDirectionsResponse";
import { IDirectionsResponse } from "../../../interfaces/IDirectionsResponse";
import { ITrainForm } from "../../../store/trainForm";
import SeatsCard from "./SeatsCard/SeatsCard";
import { useNavigate } from "react-router-dom";

import './Seating.css';

export default function Seating() {
    const navigator = useNavigate();
    const {index} = useParams();
    const directions: IDirectionsResponse = useAppSelector(state => state.directionsResponse.directionsResponse);
    const trainForm: ITrainForm = useAppSelector(state => state.trainForm)
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
            <>{direction && direction.arrival ? <SeatsCard isDirectionForward={true} trainInfo={direction.arrival}/> : null}</>
            <>{direction && direction.departure ? <SeatsCard isDirectionForward={false} trainInfo={direction.departure}/> : null}</>
            <div className="seating-buttonBar">
                <button 
                    className={trainForm.status ? "seating-button" : "seating-button-blocked"}
                >ДАЛЕЕ</button>
            </div>
        </div>
    )
}
