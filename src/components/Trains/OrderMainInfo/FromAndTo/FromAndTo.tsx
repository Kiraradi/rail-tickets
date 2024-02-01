import { useEffect, useState } from 'react';
import moment from "moment";
import { useAppSelector } from '../../../../hook';
import { IArrivalAndDeparture } from '../../../../interfaces/IDirectionsResponse';

import './FromAndTo.css';


export interface IFromAndTo {
    isArriaval: boolean
}

export default function FromAndTo(props: IFromAndTo) {
    const directions = useAppSelector(state => state.directions.directions);
    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const [isOpen, setOpen] = useState(false);
    const [direction, setDirection] = useState<IArrivalAndDeparture | null>(null);

    useEffect(() => {
        if (directions?.items?.length) {
            
            if (props.isArriaval) {
                const direction = directions.items.find(d => orderForm.arrival && d.arrival && d.arrival._id === orderForm.arrival.route_direction_id);

                if (direction && direction.arrival) {
                    setDirection(direction.arrival);
                }
            }
        }
    }, [ directions, orderForm ])

    const onClickButton = () => {
        setOpen(!isOpen);
    }

    if (!direction) {
        return <></>;
    }
    
    return (
        <div className='fromAndTo-wrapper'>
            <div className='fromAndTo-header'>
                <img className='fromAndTo-img' src={props.isArriaval?'/images/toIcon.png':'/images/fromIcon.png'}/>
                <div className='fromAndTo-title-wrapper'>
                    <h2 className='fromAndTo-title'>{props.isArriaval? 'Туда' :'Обратно'}</h2>
                    <span className='fromAndTo-date'>{moment(direction.from?.datetime).format('DD.MM.YYYY')}</span>
                </div>
                <div>
                    <div onClick={onClickButton} className={`fromAndTo-button ${isOpen? 'fromAndTo-button-open':'fromAndTo-button-close'}`}></div>
                </div>
            </div>
            <div className={`fromAndTo-content-wrapper ${isOpen ? 'fromAndTo-content-wrapper-open' : ''}`}>
                <div className='row-info'>
                    <div className='info-title'>№ Поезда</div>
                    <div className='info-text'>{direction.train?.name}</div>
                </div>
                <div className='row-info'>
                    <div className='info-title'>Направление</div>
                    <div>
                        <div className='info-text'>{direction.from?.city?.name}</div>
                        <div className='info-text'>{direction.to?.city?.name}</div>
                    </div>
                </div>
                <div className='row-info'>
                    <div>
                        <div className='info-text'>{moment(direction.from?.datetime).format('HH:mm')}</div>
                        <div className='info-title'>{moment(direction.from?.datetime).format('DD.MM.YYYY')}</div>
                    </div>
                    <div>
                        <div className='info-text'>{moment(direction.to?.datetime).format('HH:mm')}</div>
                        <div className='info-title'>{moment(direction.to?.datetime).format('DD.MM.YYYY')}</div>
                    </div>
                </div>
                <div className='row-info'>
                    <div>
                        <div className='info-text'>{direction.from?.city?.name}</div>
                        <div className='info-title'>{direction.from?.railway_station_name}</div>
                    </div>
                    <div>
                        <div className='info-text'>{direction.to?.city?.name}</div>
                        <div className='info-title'>{direction.to?.railway_station_name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
