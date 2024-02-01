import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import ApiService from '../../../services/ApiService';
import AsyncSelect from 'react-select/async';
import { ActionMeta, GroupBase, StylesConfig } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../hook';
import { changeDirectionSearch } from '../../../store/directionSearchSlice';
import moment from 'moment';
import { IndicatorsContainerProps } from 'react-select';
import Select from 'react-select/dist/declarations/src/Select';
import { IDirectionsRequest } from '../../../interfaces/IDirectionsRequest';
import { goToFirstPage } from '../../../store/stepSlice';

import './SearchTrainsForm.css';
import "react-datepicker/dist/react-datepicker.css";
import './DatePicker.css';

export interface ISearchTrainsForm {
    class: string
}

export interface ISelectOption {
    value: string;
    label: string;
}

export default function SearchTrainsForm(props: ISearchTrainsForm) {
    const dispatch = useAppDispatch()

    const initFormData = {
        directionFrom: null as ISelectOption | null,
        directionTo: null as ISelectOption | null,
        dateFrom: null as Date | null,
        dateTo: null as Date | null
    }

    const navigate = useNavigate();

    const [formData, setFormData] = useState(initFormData);

    const loadSelectOptions = (inputValue: string) => {
        return new Promise<ISelectOption[]>((resolve) => {
            setTimeout(async() => {
                const res = await ApiService.getCities(inputValue);
                const options = res.map(item => ({ value: item._id, label: item.name } as ISelectOption));
                resolve(options);
            }, 1000);    
        });
    };

    const handlerChange = (name: string, value: ISelectOption | Date) => {
        setFormData({...formData, [name]: value});
    };

    const searchTrains = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.directionFrom != null && formData.directionTo != null) {
            const request: IDirectionsRequest = {
                from_city_id: formData.directionFrom.value,
                to_city_id: formData.directionTo?.value,
                date_start: moment(formData.dateFrom).format('YYYY-MM-DD'),
                date_end: moment(formData.dateTo).format('YYYY-MM-DD') 
            };
            
            dispatch(changeDirectionSearch(request));
            dispatch(goToFirstPage());
            setFormData(initFormData);
            navigate('/trains')
        }
    }

    const customInput = () : React.ReactNode => {
        return <input className="example-custom-input"/>
    }

    let fromDirectionRef: Select<ISelectOption, false, GroupBase<ISelectOption>> | null = null;

    const onReverse = () => {
        const directionTo = formData.directionTo;
        formData.directionTo = formData.directionFrom;
        setFormData(formData);
        fromDirectionRef?.onChange(directionTo, {} as ActionMeta<ISelectOption>);
    }

    const IndicatorsContainer = (props: IndicatorsContainerProps<ISelectOption, false>) => {
        return (<div></div>);
    };

    const colourStyles: StylesConfig<ISelectOption> = {
        control: (styles) => ({ ...styles, height: '60px'}),
    };

    return (
        <form className={`searchTrainsForm ${props.class}-form`} onSubmit={searchTrains}>
            <div className='direction'>
                <h2 className='direction-title'>Направление</h2>
                <div className='direction-input-bar'>
                    <AsyncSelect 
                        ref={(ref => fromDirectionRef = ref)}
                        className='searchTrainsForm-input direction-input'
                        value={formData.directionFrom} 
                        loadOptions={loadSelectOptions}
                        onChange={(option) => {handlerChange('directionFrom', option as ISelectOption)}}
                        required
                        placeholder='Откуда'
                        components={{ IndicatorsContainer }}
                        styles={colourStyles}
                    />
                    <div className='reverse-direction' onClick={onReverse}></div>
                    <AsyncSelect 
                        className='searchTrainsForm-input direction-input'
                        value={formData.directionTo} 
                        loadOptions={loadSelectOptions}
                        onChange={(option) => handlerChange('directionTo', option as ISelectOption)}
                        required
                        placeholder='Куда'
                        components={{ IndicatorsContainer }}
                        styles={colourStyles}
                    />
                </div> 
            </div>
            <div className='date'>
                <h2 className='date-title'>Дата</h2>
                <div className='date-input-bar'>
                    <div className='datePicker-wrapper'>
                        <DatePicker 
                            selected={formData.dateFrom} 
                            onChange={(date: Date) => handlerChange('dateFrom', date)} 
                            customInput={customInput()}
                            dateFormat="dd/MM/yyyy"
                            locale={ru}
                            placeholderText='ДД/ММ/ГГ'
                            required
                        />    
                    </div>
                    
                    <div className='datePicker-wrapper'>
                        <DatePicker 
                            selected={formData.dateTo} 
                            onChange={(date: Date) => handlerChange('dateTo', date)} 
                            customInput={customInput()}
                            dateFormat="dd/MM/yyyy"
                            locale={ru}
                            placeholderText='ДД/ММ/ГГ'
                            required
                        />    
                    </div>
                    
                </div>
            </div>
            
            <div className='searchTrainsForm-button-bar'>
                <button className={`searchTrainsForm-button button-${props.class}`}>найти билеты</button>
            </div>
        </form>
    )
}
