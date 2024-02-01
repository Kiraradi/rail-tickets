import { IArrivalAndDeparture, IDirection, IFromAndTo } from "../../../../interfaces/IDirectionsResponse"
import moment from "moment";
import { makeFirstLetterUppercase } from "../../../../services/makeFirstLetterUppercase";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../hook";
import { goAhead } from "../../../../store/stepSlice";

import './TrainCard.css'

export interface ITrainCard {
    direction: IDirection
    index: number
}

export function TimeAndStationInfo (info: IFromAndTo | undefined)  {
    if (!info) {
        return (<></>);
    }
   
    return (
        <div className="timeAndStationInfo">
            <div className="timeAndStationInfo-time">{moment(info.datetime).format('HH:MM')}</div>
            <div className="timeAndStationInfo-city">{makeFirstLetterUppercase(info.city?.name)}</div>
            <div className="timeAndStationInfo-station">{makeFirstLetterUppercase(info.railway_station_name) + ' вокзал'}</div>
        </div>);
}

export function DirectionInfo  (info: IArrivalAndDeparture | undefined, direction: string)  {
    if (!info) {
        return (<></>);
    }

    return (
        <div className="directionInfo">
            {TimeAndStationInfo(info.from)}
            <div className="directionInfo-duration-wrapper">
                <div className="directionInfo-duration">{moment(info.duration).format('HH:MM')}</div>
                <img src={`/images/vector${direction === "to"? 'To' : 'From'}.png`}/>
            </div>
            {TimeAndStationInfo(info.to)}   
        </div>);
}

export default function TrainCard(props: ITrainCard) {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const DirectionsInfo = () => {
        return (
            <div className="directionsInfo">
                {DirectionInfo(props.direction.arrival, 'to')}               
                {DirectionInfo(props.direction.departure, 'from')}                
            </div>);
    }

    const SeatInfo = (show: boolean | undefined, classNumber: string, placeCount: number | undefined, bottomPrice: number | undefined) => {
        if (!show) {
            return (<></>); 
        }

        return (<div className="seatInfo">
            <div className="carriageСlass">
                {
                    classNumber === 'first' ? 'Люкс'
                    : classNumber === 'second' ? 'Купе'
                        : classNumber === 'third' ? 'Плацкарт'
                            : classNumber === 'fourth' ? 'Сидячий' : null
                }
            </div>
            <div className="seatInfo-placeCount-wrapper">
                <div className="seatInfo-placeCount">{placeCount}</div>
            </div>
            
            <div className="seatInfo-bottomPrice-wrapper">
                <span>от</span>
                <span className="seatInfo-bottomPrice">{bottomPrice}</span> 
                <span className="seatInfo-rub">₽</span>
            </div>
        </div>);
    }

    const SeatsInfo = (info: IArrivalAndDeparture | undefined) => {
        if (!info) {
            return (<></>);
        }

        return <div className="seatsInfo">
            {SeatInfo(info.have_first_class, 'first', info.available_seats_info['first'], info.price_info['first']?.bottom_price)}
            {SeatInfo(info.have_second_class, 'second', info.available_seats_info['second'], info.price_info['second']?.bottom_price)}
            {SeatInfo(info.have_third_class, 'third', info.available_seats_info['third'], info.price_info['third']?.bottom_price)}
            {SeatInfo(info.have_fourth_class, 'fourth', info.available_seats_info['fourth'], info.price_info['fourth']?.bottom_price)}
        </div>
    }

    const MainSeatsInfo= () => {
        return (
           <div className="mainSeatsInfo">
            {SeatsInfo(props.direction.arrival)}
            
            <div className="mainSeatsInfo-bottom">
                <img className="mainSeatsInfo-img" alt="img" src="/images/lastTiketIcons.png"/>
                <button 
                    className="mainSeatsInfo-button" 
                    onClick={()=> {
                        dispatch(goAhead());
                        navigate(`/trains/${props.index}`);
                    }}
                >Выбрать места</button> 
            </div>
            
           </div> 
        )
    }

    const MainInfo = () => {
        return (
            <div className="MainInfo">
                <img className="MainInfo-logo" src="./images/TrainCardMainLogo.png" alt="MainInfo-logo"/>
                <h2 className="MainInfo-train_name">{props.direction.arrival?.train?.name}</h2>
                <div className="MainInfo-direction">
                    <p>
                        <>{makeFirstLetterUppercase(props.direction.arrival?.from?.city?.name)}</>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5L13 4.5V3.5L0 3.5L0 4.5Z" fill="#292929"/>
                        </svg>
                    </p>
                    <p>{makeFirstLetterUppercase(props.direction.arrival?.to?.city?.name)}</p>
                </div>
            </div>
        )
    }

    
    return (
        <div className="TrainCard">
            <>{MainInfo()}</>
            <>{DirectionsInfo()}</>
            <>{MainSeatsInfo()}</>
        </div>
    )
}
