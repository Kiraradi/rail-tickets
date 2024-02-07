
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../hook";
import { goAhead, goTo } from '../../../store/stepSlice';
import { PaymentMethod } from '../../../interfaces/IOrderRequest';
import moment from 'moment';
import { IArrivalAndDeparture, IFromAndTo } from '../../../interfaces/IDirectionsResponse';
import { makeFirstLetterUppercase } from '../../../services/makeFirstLetterUppercase';
import { cleanOrderForm, cleanUser } from '../../../store/orderFormSlice';
import ApiService from '../../../services/ApiService';

import './Checking.css';

export default function Checking() {
    
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const { index } = useParams();

    const directions = useAppSelector(state => state.directions.directions);
    const orderForm = useAppSelector(state => state.orderForm.orderForm);

    if (!directions || directions.error || !orderForm) {
        return <></>
    }
    
    const direction = directions.items[Number(index)];

    if (!direction) {
        return <></>
    }
    
    const getSum = () => {
        let sum = 0;

        if (orderForm.arrival?.seats.length && direction.arrival?.min_price) {
            sum += orderForm.arrival?.seats.length * direction.arrival?.min_price;
        }

        if (orderForm.departure?.seats.length && direction.departure?.min_price) {
            sum += orderForm.departure?.seats.length * direction.departure?.min_price;
        }

        return sum;
    }

    const TrainCard = () => {
        const MainInfo = () => {
            return (
                <div className="MainInfo">
                    <img className="MainInfo-logo" src="/images/TrainCardMainLogo.png" alt="MainInfo-logo"/>
                    <h2 className="MainInfo-train_name">{direction.arrival?.train?.name}</h2>
                    <div className="MainInfo-direction">
                        <p>
                            <>{makeFirstLetterUppercase(direction.arrival?.from?.city?.name)}</>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                                <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5L13 4.5V3.5L0 3.5L0 4.5Z" fill="#292929"/>
                            </svg>
                        </p>
                        <p>{makeFirstLetterUppercase(direction.arrival?.to?.city?.name)}</p>
                    </div>
                </div>
            )
        }

        const TimeAndStationInfo = (info: IFromAndTo | undefined) => {
            if (!info) {
                return (<></>);
            }
           
            return (
                <div className="timeAndStationInfo">
                    <div className="timeAndStationInfo-time">{moment(info.datetime).format('HH:mm')}</div>
                    <div className="timeAndStationInfo-city">{makeFirstLetterUppercase(info.city?.name)}</div>
                    <div className="timeAndStationInfo-station">{makeFirstLetterUppercase(info.railway_station_name)}</div>
                </div>);
        }

        const DirectionInfo = (info: IArrivalAndDeparture | undefined, isArrival: boolean) => {
            if (!info) {
                return (<></>);
            }
        
            return (
                <div className="directionInfo">
                    {TimeAndStationInfo(info.from)}
                    <div className="directionInfo-duration-wrapper">
                        <div className="directionInfo-duration">{moment(info.duration).format('HH:mm')}</div>
                        <img src={`/images/vector${isArrival ? 'To' : 'From'}.png`}/>
                    </div>
                    {TimeAndStationInfo(info.to)}   
                </div>);
        }

        const DirectionsInfo = () => {
            return (
                <div className="directionsInfo">
                    {DirectionInfo(direction.arrival, true)}               
                    {DirectionInfo(direction.departure, false)}                
                </div>);
        }

        const SeatInfo = (show: boolean | undefined, classNumber: string, placeCount: number | undefined, bottomPrice: number | undefined) => {
            if (!show) {
                return (<></>); 
            }
    
            return (<div className="seatInfo">
                <div className="carriageClass">
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
    
        const MainSeatsInfo = () => {
            return (
               <div className="mainSeatsInfo">
                    {SeatsInfo(direction.arrival)}
                    
                    <div className="mainSeatsInfo-bottom">
                        <img className="mainSeatsInfo-img" alt="img" src="/images/lastTiketIcons.png"/>
                    </div>
               </div> 
            )
        }

        return <div className='card'>
            <div className='card-title-wrapper'>
                <h2 className='card-title'>Поезд</h2>
            </div>
            <div className='card-body'>
                <div className='card-body-left train-card-body-left'>
                    {MainInfo()}
                    {DirectionsInfo()}
                </div>
                <div className='card-body-right'>
                    {MainSeatsInfo()}
                    <button className='card-body-right-button' onClick={() => {
                        dispatch(cleanOrderForm())
                        dispatch(goTo(0));
                        navigator(`/trains`);
                    }}>
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    }

    const PassengersCard = () => {
        return <div className='card'>
            <div className='card-title-wrapper'>
                <h2 className='card-title'>Пассажиры</h2>
            </div>
            <div className='card-body'>
                <div className='card-body-left passengers-card-body-left'>
                    {
                        orderForm.arrival?.seats
                            .map(seat => {
                                return <div className='passenger-wrapper'>
                                    <div className='passenger-body-left'>
                                        <img className='passenger-img' src='/images/passenger.png'/>
                                        <div className='passenger-age'>{seat.is_child ? 'Детский' : 'Взрослый'}</div>
                                    </div>
                                    <div className='passenger-body-right'>
                                        <p className='passenger-info'>{seat.person_info?.last_name} {seat.person_info?.first_name} {seat.person_info?.patronymic}</p>
                                        <p className='passenger-info'>Пол {seat.person_info?.gender ? 'мужской' : 'женский'}</p>
                                        <p className='passenger-info'>Дата рождения {seat.person_info?.birthday ? moment(new Date(seat.person_info?.birthday)).format('DD.MM.yyyy') : null}</p>
                                        <p className='passenger-info'>{seat.person_info?.document_type === 'passport' ? 'Паспорт РФ' : 'Свидетельство о рождении'} {seat.person_info?.document_data}</p>
                                    </div>
                                </div>
                            })
                    }
                </div>
                <div className='card-body-right'>
                    <div className='sum-info'>
                        <p className='sum-text'>Всего</p>
                        <div className='sum-result-text'>
                            {getSum()} <img src='/images/rubles.png' />
                        </div>
                    </div>
                    <button className='card-body-right-button' onClick={() => {
                        dispatch(cleanUser());
                        dispatch(goTo(1));
                        navigator(`/trains/${index}/passengers`);
                    }}>
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    }

    const PaymentMethodCard = () => {
        return <div className='card'>
            <div className='card-title-wrapper'>
                <h2 className='card-title'>Способ оплаты</h2>
            </div>
            <div className='card-body'>
                <div className='card-body-left payment-method-card-body-left'>
                    { orderForm.user?.payment_method === PaymentMethod.cash ? 'Наличными' : 'Онлайн' }
                </div>
                <div className='card-body-right'>
                    <button className='card-body-right-button' onClick={() => {
                        dispatch(goTo(2));
                        navigator(`/trains/${index}/payment`);
                    }}>
                        Изменить
                    </button>
                </div>
            </div>
        </div>
    }

    return <div className="Checking">
        <div className='checking-wrapper'>
            {TrainCard()}
            {PassengersCard()}
            {PaymentMethodCard()}
        </div>
        <div className="checking-button-wrapper">
            <button
                className="checking-form-button"
                onClick={async ()=> {
                    await ApiService.order(orderForm);
                    dispatch(goAhead());
                    navigator(`/successful-buy`);
                }}
                >
                Подтвердить
            </button>     
        </div>
    </div>
}