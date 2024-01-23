import { useState } from 'react';
import TimeSlider from '../TimeSlider/TimeSlider';


import './FromAndTo.css';


export interface IFromAndTo {
    type: string
}

export default function FromAndTo(props:IFromAndTo) {

    const [isOpen, setOpen] = useState(false);

    const onClickButton = () => {
        setOpen(!isOpen);
    }

    

    return (
        <div className='fromAndTo-wrapper'>
            <div className='fromAndTo-header'>
                <img className='fromAndTo-img' src={props.type === 'to'?'/images/toIcon.png':'/images/fromIcon.png'}/>
                <div className='fromAndTo-title-wrapper'>
                    <h2 className='fromAndTo-title'>{props.type === 'to'? 'Туда' :'Обратно'}</h2>
                </div>
                <div>
                    <div onClick={onClickButton} className={`fromAndTo-button ${isOpen? 'fromAndTo-button-open':'fromAndTo-button-close'}`}></div>
                </div>
            </div>
            <div 
                className={`fromAndTo-content-wrapper ${isOpen ? 'fromAndTo-content-wrapper-open' : ''}`}
            >
                <TimeSlider 
                    firstKey={props.type === 'to'? 'start_departure_hour_to' : 'start_departure_hour_from' }
                    secondKey={props.type === 'to'? 'end_departure_hour_to' : 'end_departure_hour_from'}
                    direction={'departure'}
                    title={'Время отбытия'}
                />
                <TimeSlider 
                    firstKey={props.type === 'to'? 'start_arrival_hour_to' : 'start_arrival_hour_from'}
                    secondKey={props.type === 'to'? 'end_arrival_hour_to' : 'end_arrival_hour_from'}
                    direction={'arrival'}
                    title={'Время прибытия'}
                />
            </div>
        </div>
    )
}
