import React, { useEffect, useState } from 'react'
import { ISeat } from '../../../../../../interfaces/ISeatsResponse'

import './CarriagePlaceFourthClass.css';

interface ISeatForm {
    index: number
    available: boolean
    selected: boolean
}

export default function CarriagePlaceFourthClass (props: { seats: ISeat[], selectedSeats: number[], selectSeats: (seats: number[]) => void }) {

    const compartmentCount =  8;
    const compartmentCountArr = Array.from({ length: compartmentCount }, (v, i) => i);

    const initSeats: ISeatForm[] = new Array(62).fill('1')
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
        let copy = Object.assign([] as ISeatForm[], seats);
        
        if (seats[index].available) {
            copy[index].selected = !copy[index].selected;
            setSeats(copy);
        }

        props.selectSeats((seats.filter(item => item.selected).map(item => item.index)));
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
                                {
                                    index === 0
                                    ? <div className='CarriagePlace-seat_none'></div>
                                    : Place(compartmentCount * 4 + 3 + (index - 1) * 4 + 2)
                                }
                                <div className='CarriagePlace-empty-seat'></div>
                                {
                                    index === compartmentCount - 1
                                    ? <div className='CarriagePlace-seat_none'></div>
                                    : Place(compartmentCount * 4 + 3 + (index - 1) * 4 + 4)
                                }
                            </div>
                            <div className='CarriagePlace-compartment-row'>
                                {Place(index === 0 ? compartmentCount * 4 + 1 : compartmentCount * 4 + 3 + (index - 1) * 4 + 1)}
                                <div className='CarriagePlace-empty-seat'></div>
                                {Place(index === 0 ? compartmentCount * 4 + 2 : compartmentCount * 4 + 3 + (index - 1) * 4 + 3)}
                            </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
