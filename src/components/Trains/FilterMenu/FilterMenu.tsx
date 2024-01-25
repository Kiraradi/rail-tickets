import React, { useState } from 'react';
import { useAppSelector, useAppDispatch} from '../../../hook';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import CheckboxFilter from './checkbox/CheckboxFilter';
import Price from './Price/Price';
import FromAndTo from './FromAndTo/FromAndTo';
import moment from 'moment';
import { IDirectionsRequest } from '../../../interfaces/IDirectionsRequest';
import { changeDirection } from '../../../store/directionSlice';
import { ChangeDirectionsResponse } from '../../../store/directionsResponseSlice';
import ApiService from '../../../services/ApiService';

import './FilterMenu.css';


export default function FilterMenu() {

    const direction = useAppSelector(state => state.direction.direction);
    const dispatch = useAppDispatch();

    const initFormData = {...direction, date_start: direction.date_start ? new Date(direction.date_start) : null, 
        date_end: direction.date_end ? new Date(direction.date_end) : null}
    
    const [formData, setFormData] = useState(initFormData);

    const handlerChange = async(name: keyof IDirectionsRequest, value: any) => {
        setFormData({...formData, [name]: value});

        dispatch(changeDirection({... direction , [name]: moment(value).format('YYYY-MM-DD')}))

        const request = await ApiService.getDirections(direction);
        dispatch(ChangeDirectionsResponse(request));
    };

    const customInput = () : React.ReactNode => {
        return <input className="example-custom-input"/>
    }
    
    const DateFilter = () => {
        return <div className='DateFilter'>
            <div className='DateFilter-date'>
                <h2 className='DateFilter-date-title'>Дата поездки</h2>
                <div className='datePicker-wrapper'>
                    <DatePicker 
                        selected={formData.date_start} 
                        onChange={(date: Date) => handlerChange('date_start', date)} 
                        customInput={customInput()}
                        dateFormat="dd/MM/yyyy"
                        locale={ru}
                        placeholderText='ДД/ММ/ГГ'
                        required
                    />    
                </div>
            </div>
            <div className='DateFilter-date'>
                <h2 className='DateFilter-date-title'>Дата возвращения</h2>
                <div className='datePicker-wrapper'>
                    <DatePicker 
                        selected={formData.date_end} 
                        onChange={(date: Date) => handlerChange('date_end', date)} 
                        customInput={customInput()}
                        dateFormat="dd/MM/yyyy"
                        locale={ru}
                        placeholderText='ДД/ММ/ГГ'
                        required
                    />    
                </div>
            </div>
        </div>
        
        
    }

    const chengeCheckbox = async (type: keyof IDirectionsRequest) => {
        dispatch(changeDirection({... direction , [type]: !direction[type]}))

        const request = await ApiService.getDirections(direction);
        dispatch(ChangeDirectionsResponse(request));

    }

    const Options = () => {
        return <div className='options'>
            <CheckboxFilter checked={direction.have_second_class} imgURL='/images/secondClassIcon.png' title='Купе' type='have_second_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={direction.have_third_class} imgURL='/images/thirdClassIcon.png' title='Плацкарт' type='have_third_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={direction.have_fourth_class} imgURL='/images/fourthClassIcon.png' title='Сидячий' type='have_fourth_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={direction.have_first_class}imgURL='/images/firstClassIcon.png' title='Люкс' type='have_first_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={direction.have_wifi} imgURL='/images/wifiIcon.png' title='Wi-Fi' type='have_wifi' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={direction.have_express} imgURL='/images/expressIcon.png' title='Экспресс' type='have_express' onChenge={chengeCheckbox}/>
        </div>
    }


    return (
        <div className='filterMenu'>
            <form>
              {DateFilter()} 
              {Options()}
              <Price/>
              <FromAndTo type={'to'}/>
              <FromAndTo type={'from'}/>
            </form>
        </div>
    )
}
