import Select, {StylesConfig} from 'react-select';
import { useEffect, useState } from 'react';
import { ISelectOption } from '../../../Header/SearchTrainsForm/SearchTrainsForm';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import { useAppDispatch, useAppSelector } from '../../../../hook';
import { cleanErrorsByIndex, setPersonInfo } from '../../../../store/orderFormSlice';
import { IPersonInfo } from '../../../../interfaces/IOrderRequest';
import moment from "moment";

import './Passenger.css';

export interface ISelectOptionForm {
    value: string,
    label: string
}

export interface IPassengerForm {
    is_adult: ISelectOptionForm
    first_name: string
    last_name: string
    patronymic?: string
    gender: boolean
    birthday: Date | null
    document_type: ISelectOptionForm
    document_data: {
        series: string,
        number: string
    },
    limitedMobility: boolean
}

export default function Passenger(props: { index: number }) {

    const ages = [
        { value: 'true', label: 'Взрослый'},
        { value: 'false', label: 'Детский' }
    ];

    const documentTypes = [
        { value: 'passport', label: 'Паспорт РФ'},
        { value: 'birthCertificate', label: 'Свидетельство о рождении' }
    ];
    
    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const errors = useAppSelector(state => state.orderForm.errors)
        .filter(error => error.index === props.index);
    const dispatch = useAppDispatch();

    const [isFormOpen, setFormOpen] = useState(false);
    const [passengerInfo, setPassengerInfo] = useState<IPassengerForm | null>();

    useEffect(() => {
        if (!passengerInfo) {
            const person_info = orderForm.arrival?.seats[props.index].person_info;
            let document_data = [] as string[];

            if (person_info?.document_data) {
                document_data = person_info?.document_data.split(' ');
            }

            setPassengerInfo({
                is_adult: person_info?.is_adult 
                    ? (ages.find(age => age.value == person_info?.is_adult.toString()) ?? ages[0])
                    : ages[0],
                first_name: person_info?.first_name ?? '',
                last_name: person_info?.last_name ?? '',
                patronymic: person_info?.patronymic ?? '',
                gender: person_info?.gender ?? false,
                birthday: person_info?.birthday ? new Date(person_info?.birthday) : null,
                document_type: person_info?.document_type
                    ? (documentTypes.find(docType => docType.value === person_info?.document_type) ?? documentTypes[0])
                    : documentTypes[0],
                document_data: document_data && document_data.length === 2 
                    ? {
                        series: document_data[0],
                        number: document_data[1]
                    }
                    : document_data && document_data.length === 1
                    ? {
                        series: '',
                        number: document_data[0]
                    }
                    : {
                        series: '',
                        number: ''
                    },
                limitedMobility: false
            });    
        }
    }, [ orderForm ])

    useEffect(() => {
        if (passengerInfo) {
            const document_data = passengerInfo.document_type.value ===documentTypes[0].value
            ? `${passengerInfo.document_data.series} ${passengerInfo.document_data.number}`
            : passengerInfo.document_data.number;

            const personInfo: IPersonInfo = {
                is_adult: Boolean(passengerInfo.is_adult.value),
                first_name: passengerInfo.first_name,
                last_name: passengerInfo.last_name,
                patronymic: passengerInfo.patronymic,
                gender: passengerInfo.gender,
                birthday: passengerInfo.birthday ? moment(passengerInfo.birthday).format('YYYY-MM-DD') : '',
                document_type: passengerInfo.document_type.value,
                document_data: document_data
            }
        
            dispatch(setPersonInfo({ index: props.index, personInfo: personInfo }))
        }
    }, [ passengerInfo ])
    
    const handlerChange = (name: string, value: ISelectOption | Date | string | boolean) => {
        if (passengerInfo) {
            setPassengerInfo({...passengerInfo, [name]: value});
        }
    };

    const handlerDocumentChange = (name: string, value: string) => {
        if (passengerInfo && passengerInfo.document_data) {
            const document_data = {...passengerInfo.document_data, [name]: value };
            setPassengerInfo({...passengerInfo, ['document_data']: document_data});
        }
    };

    const colourStyles: StylesConfig<ISelectOption> = {
        control: (styles) => ({ ...styles, height: '50px', fontSize: '24px', border: '1px solid #928F94'}),
    };

    const fieldsForDocuments = () => {
        if (!passengerInfo) {
            return <></>;
        }

        if (passengerInfo.document_type?.value === 'passport') {
            return <>
                <div className='fieldForDocument'>
                    <h3 className='field-title'>Серия</h3>
                    <input 
                        className='field-input'
                        type='text'
                        name='series'
                        value={passengerInfo.document_data.series}
                        onChange={(e) => handlerDocumentChange('series', e.target.value)}
                        placeholder='_ _ _ _'
                        maxLength={4}
                    />
                </div>
                <div className='fieldForDocument'>
                    <h3 className='field-title'>Номер</h3>
                    <input 
                        className='field-input'
                        type='text'
                        name='number'
                        value={passengerInfo.document_data.number}
                        onChange={(e) => handlerDocumentChange('number', e.target.value)}
                        placeholder='_ _ _ _ _ _'
                        maxLength={6}
                    />
                </div>
            </>
        }

        return <div className='fieldForDocument'>
            <h3 className='field-title'>Номер</h3>
            <input 
                className='field-input'
                type='text'
                name='number'
                value={passengerInfo.document_data.number}
                onChange={(e) => handlerDocumentChange('number', e.target.value)}
                placeholder='12 символов'
                maxLength={12}
            />
        </div>
    } 

    const customInput = () : React.ReactNode => {
        return <input className="birthDate-custom-input"/>
    }

    if (!passengerInfo) {
        return <></>;
    }

    return (
        <div className="passenger-form-wrapper">
            <div className='passenger-form-header'>
                <button 
                    className={`passenger-form-header-button-${isFormOpen ? 'close' : 'open'}`}
                    onClick={()=> setFormOpen(!isFormOpen)}
                >
                    {isFormOpen ? '-' : '+'}
                </button>
                <h2 className='passenger-form-header-title'>{`Пассажир ${props.index + 1}`}</h2>
            </div>
            <>{isFormOpen 
                ? <>
                   <div className='passenger-form-select-wrapper'>
                        <Select 
                            className='passenger-form-select'
                            options={ages}
                            onChange={(data) => {handlerChange('is_adult', data as ISelectOption) }}
                            value={passengerInfo.is_adult}
                            styles={colourStyles}
                    />
                    </div>
                    <div className='passenger-form-passenger-info'>
                        <div className='passenger-form-passenger-info-fullName'>
                            <div className='passenger-form-passenger-info-input-wrapper'>
                                    <label className='passenger-form-passenger-info-input-label' htmlFor="lastname">Фамилия</label>
                                    <input
                                        className='passenger-form-passenger-info-input'
                                        type='text'
                                        name='lastname'
                                        value={passengerInfo.last_name}
                                        onChange={(e) => handlerChange('last_name', e.target.value)}
                                    /> 
                            </div>
                            <div className='passenger-form-passenger-info-input-wrapper'>
                                    <label className='passenger-form-passenger-info-input-label' htmlFor="name">Имя</label>
                                    <input
                                        className='passenger-form-passenger-info-input'
                                        type='text'
                                        name='name'
                                        value={passengerInfo.first_name}
                                        onChange={(e) => handlerChange('first_name', e.target.value)}
                                    /> 
                            </div>
                            <div className='passenger-form-passenger-info-input-wrapper'>
                                    <label className='passenger-form-passenger-info-input-label' htmlFor="patronymic">Отчество</label>
                                    <input
                                        className='passenger-form-passenger-info-input'
                                        type='text'
                                        name='patronymic'
                                        value={passengerInfo.patronymic}
                                        onChange={(e) => handlerChange('patronymic', e.target.value)}
                                    /> 
                            </div>
                        </div>
                        <div className='passenger-form-passenger-info-genderAndBirthDate'>
                            <div className='passenger-form-passenger-info-gender-wrapper'>
                                <h3 className='passenger-form-passenger-info-genderAndBirthDate-title'>Пол</h3>
                                <div className='passenger-form-passenger-info-gender-toggle'>
                                    <div 
                                        className={`passenger-form-passenger-info-gender-menGender ${passengerInfo.gender ? 'gender-active' : ''}`}
                                        onClick={() => {handlerChange('gender', true)}}
                                    >м</div>
                                    <div className='passenger-form-passenger-info-gender-toggle-border'></div>
                                    <div 
                                        className={`passenger-form-passenger-info-gender-womenGender ${!passengerInfo.gender ? 'gender-active' : ''}`}
                                        onClick={() => {handlerChange('gender', false)}}
                                    >ж</div>
                                </div>
                            </div>
                            <div className='passenger-form-passenger-info-birthDate-wrapper'>
                                <h3 className='passenger-form-passenger-info-genderAndBirthDate-title'>Дата рождения</h3>
                                <div className='passenger-form-passenger-info-birthDate'>
                                <DatePicker 
                                    selected={passengerInfo.birthday} 
                                    onChange={(date: Date) => handlerChange('birthday', date)} 
                                    customInput={customInput()}
                                    dateFormat="dd/MM/yyyy"
                                    locale={ru}
                                    placeholderText='ДД/ММ/ГГ'
                                />    
                            </div>
                            </div>
                        </div> 
                        <div className='passenger-form-passenger-info-limitedMobility'>
                            <input 
                                type="checkbox" 
                                className='passenger-form-passenger-info-limitedMobility-checkbox'
                                checked={passengerInfo.limitedMobility}
                                onChange={() => handlerChange('limitedMobility', !passengerInfo.limitedMobility)}
                            />
                            <span className='passenger-form-passenger-info-limitedMobility-text'>ограниченная подвижность</span>
                        </div>         
                    </div>
                    <div className='passenger-form-passenger-documents'>
                        <div className={`passenger-form-passenger-documents-select-wrapper`}>
                            <h3 className='passenger-form-passenger-documents-title'>Тип документа</h3>
                            <Select 
                                className='passenger-form-passenger-documents-select'
                                options={documentTypes}
                                onChange={(data) => { handlerChange('document_type', data as ISelectOption) }}
                                value={passengerInfo.document_type}
                                styles={colourStyles}
                            />
                        </div>
                        {fieldsForDocuments()}
                    </div> 
                    {   errors.length
                        ? <div className='form-result-wrapper'>
                            <div>
                                <img src='/images/close-errors.png' onClick={() => {dispatch(cleanErrorsByIndex(props.index))}}/>
                            </div>
                            <div className='errors-wrapper'>
                                {
                                    errors?.map(error => <div className='error'>{error.message}</div>)
                                }    
                            </div>
                        </div>  
                        : null  
                    }
                    
                </>
                : <></>}</>
        </div>
    )
}