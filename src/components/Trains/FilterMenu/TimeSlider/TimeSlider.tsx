import { IDirectionsRequest } from '../../../../interfaces/IDirectionsRequest';
import Slider from 'rc-slider';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { changeDirectionSearch } from '../../../../store/directionSearchSlice';
import { changeDirections } from '../../../../store/directionsSlice';
import { useState, useEffect } from 'react';

import './TimeSlider.css';
import 'rc-slider/assets/index.css';
import ApiService from '../../../../services/ApiService';


export interface ITimeSlider {
    firstKey: keyof IDirectionsRequest 
    secondKey: keyof IDirectionsRequest
    direction: string
    title: string
}

export interface ITime {
    hour_from: number
    hour_to: number
}

export default function TimeSlider(props: ITimeSlider) {
    const dispatch = useAppDispatch();
    const directionSearch = useAppSelector(state => state.directionSearch.directionSearch);

    const initTime: ITime = {
        hour_from: 0,
        hour_to: 24
    }
    const [time, setTime] = useState(initTime);

    const changeTime = (data: number[] | number) => {
        let newTime :ITime;

        if (typeof(data) === 'number') {
            newTime = {
                hour_from: data,
                hour_to: 24
            }
        } else {
            newTime = {
                hour_from: data[0],
                hour_to: data[1]
            }
        }
        
        setTime(newTime);
    }

    const getDirections = async() => {
        dispatch(changeDirectionSearch({...directionSearch, [props.firstKey]: time.hour_from, [props.secondKey]: time.hour_to}));
        const response = await ApiService.getDirections(directionSearch);
        dispatch(changeDirections(response));
    }

    useEffect(()=> {
        let timer: any
        if (time.hour_from !== 0 || time.hour_to !== 10000) {
            timer = setTimeout(()=> {
                getDirections();
            }, 1000)
        }

        return () => clearTimeout(timer);
    }, [time])

    return (
        <div className='timeSlider-wrapper'>
            <div className={`timeSlider-title-wrapper ${props.direction === "departure"?'timeSlider-title-wrapper-departure':'timeSlider-title-wrapper-arrival'}`}>
                <h2 className={`timeSlider-title`}>
                    {props.title}
                </h2>
            </div>
            <Slider
                trackStyle={{ backgroundColor: "#FFA800", height: 10, border: '1px solid #C4C4C4', borderRadius: '10px' }}
                railStyle={{ backgroundColor: "#3E3C41", height: 10, border: '1px solid #C4C4C4',borderRadius: '10px' }}
                handleStyle={{
                    height: 20,
                    width: 20,
                    top: '5px', 
                }}
                onChange={changeTime}
                className='slider'
                allowCross={false}
                range={true}
                pushable
                value={[time.hour_from, time.hour_to]}
                step={1}
                max={24}
            />
            <div className='slider-bottomBar'>
                <span className='slider-bottom'>{`От ${time.hour_from}:00`}</span>
                <span className='slider-bottom'>{`До ${time.hour_to}:00`}</span>
            </div>
            
        </div>
    )
}
