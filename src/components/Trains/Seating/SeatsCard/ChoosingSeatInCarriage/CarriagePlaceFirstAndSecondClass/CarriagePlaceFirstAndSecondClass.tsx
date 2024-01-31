import React, { useEffect, useState } from 'react'
import { ISeat } from '../../../../../../interfaces/ISeatsResponse'

import './CarriagePlaceFirstAndSecondClass.css';

interface ISeatForm {
    index: number
    available: boolean
    selected: boolean
}

export default function CarriagePlaceFirstAndSecondClass(props: { seats: ISeat[], selectedSeats: number[], carriageType: string, selectSeats: (seats: number[]) => void }) {

    const seatsCount = props.carriageType === 'first' ? 18 : 32;
    const seatsCountInCompartment = props.carriageType === 'first' ? 2: 4;
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
                            {
                                props.carriageType === 'first'
                                ? <>
                                    <div className='CarriagePlace-compartment-row'>
                                        {Place(index * seatsCountInCompartment + 1)}
                                        <div className='CarriagePlace-empty-seat'></div>
                                        {Place(index * seatsCountInCompartment + 2)}
                                    </div>
                                </>
                                : <>
                                    <div className='CarriagePlace-compartment-row'>
                                        {Place(index * seatsCountInCompartment + 2)}
                                        <div className='CarriagePlace-empty-seat'></div>
                                        {Place(index * seatsCountInCompartment + 4)}
                                    </div>
                                    <div className='CarriagePlace-compartment-row'>
                                        {Place(index * seatsCountInCompartment + 1)}
                                        <div className='CarriagePlace-empty-seat'></div>
                                        {Place(index * seatsCountInCompartment + 3)}
                                    </div>
                                </>
                            }
                            
                            <div className='CarriagePlace-compartment-row'>
                                <div className='CarriagePlace-empty-seat'></div>
                                <div className='CarriagePlace-empty-seat'></div>
                                <div className='CarriagePlace-empty-seat'></div>
                            </div>
                    </div>
                )
            }
            </div>
        </div>
    )
}
