import { IDirection } from '../../../../interfaces/IDirectionsResponse';
import { makeFirstLetterUppercase } from '../../../../services/makeFirstLetterUppercase';

import './LastTicket.css';

export interface ILastTicket {
    lastTicket: IDirection
}

export default function LastTicket(props: ILastTicket) {
  return (
    <div className='lastTicket-wrapper'>
        <div className='citys-wrapper'>
            <div className='city city-from'>
                <h2 className='city-title'>{makeFirstLetterUppercase(props.lastTicket.departure?.from?.city?.name)}</h2>
                <p className='city-content city-content-from'>
                    <p>{props.lastTicket.departure?.from?.railway_station_name}</p> 
                    <p>вокзал</p> 
                </p>
            </div>
            <div className='city city-to'>
                <h2 className='city-title'>{makeFirstLetterUppercase(props.lastTicket.departure?.to?.city?.name)}</h2>
                <p className='city-content city-content-to'>
                    <p>{props.lastTicket.departure?.to?.railway_station_name}</p> 
                    <p>вокзал</p> 
                </p>
            </div>
        </div>
        <div className='lastTicket-info'>
            <img className='lastTiket-icons' src='/images/lastTiketIcons.png' alt='Icons'/>
            <div className='lastTiket-price'>
                <span>от </span>
                <span className='lastTiket-price-min'>{props.lastTicket.min_price}</span>
                <span className='lastTiket-price-rub'> ₽</span>
            </div>
        </div>
    </div>
  )
}
