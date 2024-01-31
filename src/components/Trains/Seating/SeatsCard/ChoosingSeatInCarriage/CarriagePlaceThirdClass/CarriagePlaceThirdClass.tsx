import React, { useEffect, useState } from 'react'
import { ISeat } from '../../../../../../interfaces/ISeatsResponse'

import './CarriagePlaceThirdClass.css';

interface ISeatForm {
    index: number
    available: boolean
    selected: boolean
}

export default function CarriagePlaceThirdClass(props: { seats: ISeat[], selectedSeats: number[], selectSeats: (seats: number[]) => void }) {

    const seatsCount = 48;
    const seatsCountInCompartment = 6;
    const compartmentCount = seatsCount / seatsCountInCompartment;
    const compartmentCountArr = Array.from({ length: compartmentCount }, (v, i) => i);

    const initSeats: ISeatForm[] = new Array(seatsCount).fill('1')
        .map((_, i) =>  {
            let seat: ISeatForm = { index: i + 1, available: false, selected: false };

            if (!props.seats[i]) {
                return seat;
            }

            return ({...props.seats[i], selected: false});
        });
        
    const [seats, setSeats] = useState([] as ISeatForm[]);

    useEffect(() => {
        if (!props.selectedSeats.length) {
            setSeats(initSeats)
        }
    },[ props ]);

    
    const togglePlace = (index: number) => {
        if (seats[index].available) {
            let copy = Object.assign([] as ISeatForm[], seats);
            copy[index].selected = !copy[index].selected;
            setSeats(copy);
            props.selectSeats((seats.filter(item => item.selected).map(item => item.index)));
        }
    }

    const Place = (index: number) => {
        let classNames = 'CarriagePlace-seat';

        if (!seats[index - 1].available) {
            classNames += ' CarriagePlace-seatOccupied';
        }

        if (seats[index - 1].selected) {
            classNames += ' CarriagePlace-seatSelected';
        }

        return <div className={classNames} onClick={() => {togglePlace(index - 1)}}>
            { index }
        </div> 
    }

    
    if (!seats.length) {
        return <></>;
    }
    
    return (
        <div className='CarriagePlace-wrapper'>
            <div className='CarriagePlace'>
            {
                compartmentCountArr.map((item, index) => 
                    <div className='CarriagePlace-compartment' key={index}>
                            <div className='CarriagePlace-compartment-row'>
                                {Place(index * 4 + 2)}
                                <div className='CarriagePlace-empty-seat'></div>
                                {Place(index * 4 + 4)}
                            </div>
                            <div className='CarriagePlace-compartment-row'>
                                {Place(index * 4 + 1)}
                                <div className='CarriagePlace-empty-seat'></div>
                                {Place(index * 4 + 3)}
                            </div>
                            <div className='CarriagePlace-compartment-row'>
                                <div className='CarriagePlace-empty-seat'></div>
                                <div className='CarriagePlace-empty-seat'></div>
                                <div className='CarriagePlace-empty-seat'></div>
                            </div>
                            <div className='CarriagePlace-compartment-row'>
                                {Place(compartmentCount * 4 + index * 2 + 1)}
                                <div className='CarriagePlace-empty-seat'></div>
                                {Place(compartmentCount * 4 + index * 2 + 2)}
                            </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
