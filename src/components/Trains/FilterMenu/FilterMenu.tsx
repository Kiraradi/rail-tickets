import React, { useState } from 'react';
import { useAppSelector } from '../../../hook';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';

import './FilterMenu.css';

export default function FilterMenu() {

    const direction = useAppSelector(state => state.direction.direction);

    const initFormData = {...direction, date_start: direction.date_start ? new Date(direction.date_start) : null, 
        date_end: direction.date_end ? new Date(direction.date_end) : null}
    
    const [formData, setFormData] = useState(initFormData);

    const handlerChange = (name: string, value: any) => {
        setFormData({...formData, [name]: value});
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

    const Options = () => {
        return <></>
    }

    const Price = () => {
        return <></>
    }

    const FromAndTo = (title: string) => {
        return <></>
    }

    return (
        <div className='filterMenu'>
            <form>
              {DateFilter()} 
              {Options()}
              {Price()}
              {FromAndTo('Туда')}
              {FromAndTo('Обратно')}
            </form>
        </div>
    )
}
