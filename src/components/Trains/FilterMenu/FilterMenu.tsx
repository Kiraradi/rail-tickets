import React, { useState } from 'react';
import { useAppSelector, useAppDispatch} from '../../../hook';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import CheckboxFilter from './checkbox/CheckboxFilter';
import Price from './Price/Price';
import FromAndTo from './FromAndTo/FromAndTo';
import moment from 'moment';
import { IDirectionsRequest } from '../../../interfaces/IDirectionsRequest';
import { changeDirectionSearch } from '../../../store/directionSearchSlice';
import { changeDirections } from '../../../store/directionsSlice';
import ApiService from '../../../services/ApiService';

import './FilterMenu.css';


export default function FilterMenu() {

    const directionSearch = useAppSelector(state => state.directionSearch.directionSearch);
    const dispatch = useAppDispatch();

    const initFormData = {...directionSearch, date_start: directionSearch.date_start ? new Date(directionSearch.date_start) : null, 
        date_end: directionSearch.date_end ? new Date(directionSearch.date_end) : null}
    
    const [formData, setFormData] = useState(initFormData);

    const handlerChange = async(name: keyof IDirectionsRequest, value: any) => {
        setFormData({...formData, [name]: value});

        dispatch(changeDirectionSearch({... directionSearch , [name]: moment(value).format('YYYY-MM-DD')}))

        const request = await ApiService.getDirections(directionSearch);
        dispatch(changeDirections(request));
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
        dispatch(changeDirectionSearch({... directionSearch , [type]: !directionSearch[type]}))

        const request = await ApiService.getDirections(directionSearch);
        dispatch(changeDirections(request));
    }

    const Options = () => {
        return <div className='options'>
            <CheckboxFilter checked={directionSearch.have_second_class} imgURL='/images/secondClassIcon.png' title='Купе' type='have_second_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={directionSearch.have_third_class} imgURL='/images/thirdClassIcon.png' title='Плацкарт' type='have_third_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={directionSearch.have_fourth_class} imgURL='/images/fourthClassIcon.png' title='Сидячий' type='have_fourth_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={directionSearch.have_first_class}imgURL='/images/firstClassIcon.png' title='Люкс' type='have_first_class' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={directionSearch.have_wifi} imgURL='/images/wifiIcon.png' title='Wi-Fi' type='have_wifi' onChenge={chengeCheckbox}/>
            <CheckboxFilter checked={directionSearch.have_express} imgURL='/images/expressIcon.png' title='Экспресс' type='have_express' onChenge={chengeCheckbox}/>
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
