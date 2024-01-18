import { IArrivalAndDeparture, IDirection, IFromAndTo } from "../../../../interfaces/IDirectionsResponse"
import moment from "moment"
export default function TrainCard(direction: IDirection) {

    const TimeAndStationInfo = (info: IFromAndTo | undefined) => {
        if (!info) {
            return (<></>);
        }
       
        return (
            <div className="timeAndStationInfo">
                <div>{moment(info.datetime).format('HH:MM')}</div>
                <div>{info.city?.name}</div>
                <div>{info.railway_station_name}</div>
            </div>);
    }

    const DirectionInfo = (info: IArrivalAndDeparture | undefined) => {
        if (!info) {
            return (<></>);
        }
    
        return (
            <div>
                <div className="directionInfo">
                    {TimeAndStationInfo(info.from)}
                </div>
                <div>
                    <div></div>
                </div>
                <div className="directionInfo">
                    {TimeAndStationInfo(info.to)}
                </div>    
            </div>);
    }

    const DirectionsInfo = () => {
        return (
            <div>
                <div>
                    {DirectionInfo(direction.arrival)}
                </div>
                <div>
                    {DirectionInfo(direction.departure)}
                </div>
            </div>);
    }

    const SeatInfo = (show: boolean | undefined, classNumber: string, placeCount: number | undefined, bottomPrice: number | undefined) => {
        if (!show) {
            return (<></>); 
        }

        return (<div>
            <div>{classNumber === 'first' ? 'Люкс'
                : classNumber === 'second' ? 'Купе'
                    : classNumber === 'third' ? 'Плацкарт'
                        : classNumber === 'fourth' ? 'Сидячий' : null}</div>
            <div>{placeCount}</div>
            <div>от {bottomPrice}</div>
        </div>);
    }

    const SeatsInfo = (info: IArrivalAndDeparture | undefined) => {
        if (!info) {
            return (<></>);
        }

        return <div>
            {SeatInfo(info.have_first_class, 'first', info.available_seats_info['first'], info.price_info['first'])}
            {SeatInfo(info.have_second_class, 'second', info.available_seats_info['second'], info.price_info['second'])}
            {SeatInfo(info.have_third_class, 'third', info.available_seats_info['third'], info.price_info['third'])}
            {SeatInfo(info.have_fourth_class, 'fourth', info.available_seats_info['fourth'], info.price_info['fourth'])}
        </div>
    }

    const MainSeatsInfo= () => {
        return (
           <div>
            {SeatsInfo(direction.arrival)}
            <button className="mainSeatsInfo-button">Выбрать места</button>
           </div> 
        )
    }

    const MainInfo = () => {
        return (
            <div className="MainInfo">
                <img className="MainInfo-logo" src="./images/TrainCardMainLogo.png" alt="MainInfo-logo"/>
                <h2 className="MainInfo-train_name">{direction.arrival?.train?.name}</h2>
                <div className="MainInfo-direction">
                    <p>{direction.arrival?.from?.city?.name}</p>
                    <p>{direction.arrival?.to?.city?.name}</p>
                </div>
            </div>
        )
    }

    
    return (
        <div className="TrainCard">

        </div>
    )
}
