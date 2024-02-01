
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hook';
import FromAndTo from './FromAndTo/FromAndTo';

import './OrderMainInfo.css';
import { IDirection } from '../../../interfaces/IDirectionsResponse';

export default function OrderMainInfo() {
    const directions = useAppSelector(state => state.directions.directions);
    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const [direction, setDirection] = useState<IDirection | null>(null);
    
    useEffect(() => {
        if (directions?.items?.length) {
            
            const direction = directions.items.find(d => orderForm.arrival && d.arrival && d.arrival._id === orderForm.arrival.route_direction_id
                || orderForm.departure && d.departure && d.departure._id === orderForm.departure.route_direction_id);

            if (direction && direction) {
                setDirection(direction);
            }
        }
    }, [ directions, orderForm ])


    if (!direction) {
        return <></>
    }

    return (
        <div className='orderMainInfo'>
            <h2 className='orderMainInfo-title'>Детали поездки</h2>
            { direction.arrival ? <FromAndTo isArriaval={true}/> : null }
            { direction.departure ? <FromAndTo isArriaval={false}/> : null }
        </div>
    )
}