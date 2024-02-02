import { useEffect, useState } from 'react';
import moment from "moment";
import { useAppSelector } from '../../../../hook';
import { IArrivalAndDeparture } from '../../../../interfaces/IDirectionsResponse';
import { makeFirstLetterUppercase } from '../../../../services/makeFirstLetterUppercase';

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
            else {
                const direction = directions.items.find(d => orderForm.departure && d.departure && d.departure._id === orderForm.departure.route_direction_id);

                if (direction && direction.departure) {
                    setDirection(direction.departure);
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
                    <h2 className='fromAndTo-title'>{props.isArriaval? 'Туда' :'Обратно'} <span className='fromAndTo-date'>{moment(direction.from?.datetime).format('DD.MM.YYYY')}</span></h2>
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
                        <div className='info-text'>{makeFirstLetterUppercase(direction.from?.city?.name)}</div>
                        <div className='info-text'>{makeFirstLetterUppercase(direction.to?.city?.name)}</div>
                    </div>
                </div>
                <div className='row-info'>
                    <div>
                        <div className='info-text left'>{moment(direction.from?.datetime).format('HH:mm')}</div>
                        <div className='info-title left'>{direction.from?.datetime ? moment(direction.from?.datetime * 1000).format('DD.MM.YYYY') : null}</div>
                    </div>
                    <div className="duration-wrapper">
                        <div className="directionInfo-duration">{moment(direction.duration).format('HH:mm')}</div>
                        <div className='direction-wrapper'>
                            <img src={`/images/vector${props.isArriaval ? 'To' : 'From'}.png`}/>
                        </div>
                    </div>
                    <div>
                        <div className='info-text'>{moment(direction.to?.datetime).format('HH:mm')}</div>
                        <div className='info-title'>{direction.to?.datetime ? moment(direction.to?.datetime * 1000).format('DD.MM.YYYY') : null}</div>
                    </div>
                </div>
                <div className='row-info'>
                    <div>
                        <div className='info-text left'>{makeFirstLetterUppercase(direction.from?.city?.name)}</div>
                        <div className='info-title left'>{direction.from?.railway_station_name}</div>
                    </div>
                    <div>
                        <div className='info-text'>{makeFirstLetterUppercase(direction.to?.city?.name)}</div>
                        <div className='info-title'>{direction.to?.railway_station_name}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
