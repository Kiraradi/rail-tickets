import { useEffect, useState } from 'react';
import { ISeat, ISeatsResponse } from '../../../../../interfaces/ISeatsResponse';
import CarriagePlaceFourthClass from './CarriagePlaceFourthClass/CarriagePlaceFourthClass';

import './ChoosingSeatInCarriage.css';
import CarriagePlaceThirdClass from './CarriagePlaceThirdClass/CarriagePlaceThirdClass';
import CarriagePlaceFirstAndSecondClass from './CarriagePlaceFirstAndSecondClass/CarriagePlaceFirstAndSecondClass';


export interface IChoosingSeatInCarriage {
    filteredCarriages: ISeatsResponse []
    carriageType: string
}
export default function ChoosingSeatInCarriage(props: IChoosingSeatInCarriage) {
    

    const [activeCarriage, setActiveCarriage] = useState(props.filteredCarriages[0]);
    const [isWifiIncluded, setWifiIncluded] = useState(false);
    const [isLinensIncluded, setLinensIncluded] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([] as number[]);
    const [sum, setSum] = useState(0)
    
    useEffect(() => {
        setActiveCarriage(props.filteredCarriages[0])
        setSelectedSeats([]);
    }, [props.carriageType]);

    useEffect(() => {
        setSum(getSum())
    }, [selectedSeats, isWifiIncluded, isLinensIncluded])

    const GetTopAndBottomSeatsCount = (seats: ISeat[], type:string) => {
        let counter : number = 0
        if (type === 'up') {
            counter  = seats.reduce((accumulator, currentValue) => {
                if (currentValue.index % 2 === 0 && currentValue.available) {
                    return accumulator + 1
                } 
                return accumulator
            },0) }

        if (type === 'down') {
            counter = seats.reduce((accumulator, currentValue) => {
                    if (currentValue.index % 2 === 0 && currentValue.available) {
                        return accumulator + 1
                    } 
                    return accumulator
                },0)
        }
        return counter
    }

    const selectSeats = (seats: number[]) => {
        setSelectedSeats(seats);
    }
    
    const getSum = () => {
        let sum = 0;

        if (selectedSeats.length) {
            if (props.carriageType === 'fourth' || props.carriageType === 'first') {
                sum = selectedSeats.length * (activeCarriage.coach.top_price 
                    + (isWifiIncluded ? activeCarriage.coach.wifi_price : 0) 
                    + (isLinensIncluded ? activeCarriage.coach.linens_price : 0));
            }
            else {
                sum = selectedSeats
                    .map(item => {
                        let itemSum = (item) % 2 === 0
                            ? activeCarriage.coach.top_price
                            : activeCarriage.coach.bottom_price

                        itemSum += (isWifiIncluded ? activeCarriage.coach.wifi_price : 0) 
                            + (isLinensIncluded ? activeCarriage.coach.linens_price : 0)

                        return itemSum;
                    })
                    .reduce((acc, currValue) => acc + currValue, 0);
            }
        }

        return sum;
    }

    return (

        <div className='choosingSeatInCarriage-wrapper'>
            <div className='choosingSeatInCarriage-header-wrapper'>
                <h2 className='choosingSeatInCarriage-header-title'>Вагоны</h2>
                <div className='choosingSeatInCarriage-header-content'>{ props.filteredCarriages.map((c) => {
                    return <p 
                                className={`choosingSeatInCarriage-header-content-title ${c.coach.name === activeCarriage.coach.name? 'choosingSeatInCarriage-header-content-title-active' : ''}`}
                                onClick={() => c.coach.name === activeCarriage.coach.name? '' : setActiveCarriage(c)}
                            >{c.coach.name}</p>
                }) }</div>
            </div>
            <div className='choosingSeatInCarriage-content-wrapper'>
                <div className='choosingSeatInCarriage-content-title-wrapper'>
                    <h2 className='choosingSeatInCarriage-content-title'>{activeCarriage.coach.name}</h2>
                    <p className='choosingSeatInCarriage-content-text'>вагон</p>
                </div>
                <div className='choosingSeatInCarriage-content-places-wrapper'>
                    <div className='choosingSeatInCarriage-content-places-title-wrapper'>
                        <span className='choosingSeatInCarriage-content-places-title'>Места</span> 
                        <span className='choosingSeatInCarriage-content-places-content'>
                            {activeCarriage.seats.filter(s => s.available).length}
                        </span>
                    </div>
                    {
                        props.carriageType === 'third' || props.carriageType === 'second'
                            ? <>
                                <div className='choosingSeatInCarriage-content-places-content-wrapper'>
                                    <span className='choosingSeatInCarriage-content-places-content-title'>Верхние</span> 
                                    <span className='choosingSeatInCarriage-content-places-content'>{GetTopAndBottomSeatsCount(activeCarriage.seats, 'up')}</span>
                                </div>
                                <div className='choosingSeatInCarriage-content-places-content-wrapper'>
                                    <span className='choosingSeatInCarriage-content-places-content-title'>Нижние</span> 
                                    <span className='choosingSeatInCarriage-content-places-content'>{activeCarriage.seats.length - GetTopAndBottomSeatsCount(activeCarriage.seats, 'down')}</span>
                                </div>
                            </>
                            : <></>
                    }
                </div>
                <div className='choosingSeatInCarriage-content-price-wrapper'>
                    <div className='choosingSeatInCarriage-content-price-title-wrapper'>
                        <span className='choosingSeatInCarriage-content-places-title'>Стоимость</span> 
                    </div>

                    <>
                        {
                            activeCarriage.coach.bottom_price && props.carriageType === 'third' || props.carriageType === 'second'
                            ? <>
                                <div className='choosingSeatInCarriage-content-price-min-wrapper'>
                                    <span className='choosingSeatInCarriage-content-price-min'>{activeCarriage.coach.bottom_price}</span>
                                    <span className='choosingSeatInCarriage-content-price-rub'>₽</span>
                                </div>
                            </>
                             : <></>
                        }
                    </>
                    <>
                        {
                            activeCarriage.coach.top_price 
                            ? <>
                                <div className='choosingSeatInCarriage-content-price-max-wrapper'>
                                    <span className='choosingSeatInCarriage-content-price-max'>{activeCarriage.coach.top_price}</span>
                                    <span className='choosingSeatInCarriage-content-price-rub'>₽</span>
                                </div>
                            </>
                             : <></>
                        }
                    </>

                    
                </div>
                <div className='choosingSeatInCarriage-content-service-wrapper'>
                    <div className='choosingSeatInCarriage-content-service-title-wrapper'>
                        <span className='choosingSeatInCarriage-content-places-title'>Обслуживание</span> 
                    </div>
                    <div className='choosingSeatInCarriage-content-serviceBar'>
                        <>{activeCarriage.coach.have_wifi 
                        ? <div 
                            className={`choosingSeatInCarriage-content-service-button choosingSeatInCarriage-content-service-button-wifi${isWifiIncluded ? '_active' : ''}`}
                            onClick={()=> {setWifiIncluded(!isWifiIncluded)}}
                        ></div> 
                        : <></>
                        }</>
                        <>{activeCarriage.coach.is_linens_included
                        ? <div className='choosingSeatInCarriage-content-service-button choosingSeatInCarriage-content-service-button-linens_included'></div>
                        : <div 
                            className={`choosingSeatInCarriage-content-service-button choosingSeatInCarriage-content-service-button-linens${isLinensIncluded ? '_active' : ''}`}
                            onClick={()=> {setLinensIncluded(!isLinensIncluded)}}
                            ></div>
                        }</>
                    </div>
                </div>
            </div>
            {
                activeCarriage
                    ? (props.carriageType === 'fourth'
                        ? <CarriagePlaceFourthClass  seats={activeCarriage.seats} selectedSeats={selectedSeats} selectSeats={selectSeats}></CarriagePlaceFourthClass>
                        : props.carriageType === 'third'
                            ? <CarriagePlaceThirdClass seats={activeCarriage.seats} selectedSeats={selectedSeats} selectSeats={selectSeats}></CarriagePlaceThirdClass>
                            : <CarriagePlaceFirstAndSecondClass seats={activeCarriage.seats} selectedSeats={selectedSeats} carriageType={props.carriageType} selectSeats={selectSeats}></CarriagePlaceFirstAndSecondClass>)
                    : null
            }
            <div className='ChoosingSeatInCarriage-sum-wrapper'>
                {
                    sum 
                        ? <><span className='ChoosingSeatInCarriage-sum'>{sum}</span><span className='ChoosingSeatInCarriage-rub'>₽</span></>
                        : null
                }
            </div>
        </div>
        
    )
}
