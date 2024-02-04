import Select, {StylesConfig} from 'react-select';
import { useState } from 'react';
import { ISelectOption } from '../../../Header/SearchTrainsForm/SearchTrainsForm';
import DatePicker from "react-datepicker";
import ru from 'date-fns/locale/ru';
import moment from 'moment';

import './Passenger.css';


export default function Passenger(props: { index: number }) {

    const optionsSelect = [
        { value: 'adult', label: 'Взрослый'},
        { value: 'child', label: 'Детский' }
    ];

    const pessangerDocumentsType = [
        { value: 'passport', label: 'Паспорт РФ'},
        { value: 'birthCertificate', label: 'Свидетельство о рождении' }
    ];
    const initPassengerInfo = {
        name:'',
        lastname:'',
        patronymic: '',
        menGender: false,
        womenGender: false,
        birthDate: null as Date | null,
        limitedMobility: false
    }

    const initDocument = {
        series: '',
        number: ''
    }

    const [isFormOpen, setFormOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(optionsSelect[0]);
    const [documentType, setDocumentType] = useState(pessangerDocumentsType[0]);
    const [passengerInfo,setPassengerInfo] =useState(initPassengerInfo);
    const [document, setDocument] = useState(initDocument)

    const handlerChange = (name: string, value: ISelectOption | Date | string | boolean) => {
        setPassengerInfo({...passengerInfo, [name]: value});
    };

    const changeDocument = (name: string, value: string) => {
        setDocument({...document, [name]: value});
    }

    const colourStyles: StylesConfig<ISelectOption> = {
        control: (styles) => ({ ...styles, height: '50px', fontSize: '24px', border: '1px solid #928F94'}),
    };

    const toggleGender = (type:string) => {
        if (type === 'men') {
            setPassengerInfo({...passengerInfo, menGender: true, womenGender: false })
        }
        else {
            setPassengerInfo({...passengerInfo, menGender: false, womenGender: true })
        }
    } 

    const fieldsForDocuments = () => {
        if (documentType.value === 'passport') {
            return <>
                <div className='fieldForDocument'>
                    <h3 className='field-title'>Серия</h3>
                    <input 
                        className='field-input'
                        type='text'
                        name='series'
                        value={document.series}
                        required
                        onChange={(e) => changeDocument('series', e.target.value)}
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
                        value={document.number}
                        required
                        onChange={(e) => changeDocument('number', e.target.value)}
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
                        value={document.number}
                        required
                        onChange={(e) => changeDocument('number', e.target.value)}
                        placeholder='12 символов'
                        maxLength={12}
                    />
                </div>
    } 

    const customInput = () : React.ReactNode => {
        return <input className="birthDate-custom-input"/>
    }  

    const formCheck = () => {

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
                <button className='passenger-form-header-remove-form'></button>
            </div>
            <>{isFormOpen 
                ? <>
                   <div className='passenger-form-select-wrapper'>
                        <Select 
                        className='passenger-form-select'
                        options={optionsSelect}
                        onChange={(data) => {setSelectedOption(data as ISelectOption)}}
                        value={selectedOption}
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
                                        value={passengerInfo.lastname}
                                        required
                                        onChange={(e) => handlerChange('lastname', e.target.value)}
                                    /> 
                            </div>
                            <div className='passenger-form-passenger-info-input-wrapper'>
                                    <label className='passenger-form-passenger-info-input-label' htmlFor="name">Имя</label>
                                    <input
                                        className='passenger-form-passenger-info-input'
                                        type='text'
                                        name='name'
                                        value={passengerInfo.name}
                                        required
                                        onChange={(e) => handlerChange('name', e.target.value)}
                                    /> 
                            </div>
                            <div className='passenger-form-passenger-info-input-wrapper'>
                                    <label className='passenger-form-passenger-info-input-label' htmlFor="patronymic">Отчество</label>
                                    <input
                                        className='passenger-form-passenger-info-input'
                                        type='text'
                                        name='patronymic'
                                        value={passengerInfo.patronymic}
                                        required
                                        onChange={(e) => handlerChange('patronymic', e.target.value)}
                                    /> 
                            </div>
                        </div>
                        <div className='passenger-form-passenger-info-genderAndBirthDate'>
                            <div className='passenger-form-passenger-info-gender-wrapper'>
                                <h3 className='passenger-form-passenger-info-genderAndBirthDate-title'>Пол</h3>
                                <div className='passenger-form-passenger-info-gender-toggle'>
                                    <div 
                                        className={`passenger-form-passenger-info-gender-menGender ${passengerInfo.menGender ? 'gender-active' : ''}`}
                                        onClick={() => {toggleGender('men')}}
                                    >м</div>
                                    <div className='passenger-form-passenger-info-gender-toggle-border'></div>
                                    <div 
                                        className={`passenger-form-passenger-info-gender-womenGender ${passengerInfo.womenGender ? 'gender-active' : ''}`}
                                        onClick={() => {toggleGender('women')}}
                                    >ж</div>
                                </div>
                            </div>
                            <div className='passenger-form-passenger-info-birthDate-wrapper'>
                                <h3 className='passenger-form-passenger-info-genderAndBirthDate-title'>Дата рождения</h3>
                                <div className='passenger-form-passenger-info-birthDate'>
                                <DatePicker 
                                    selected={passengerInfo.birthDate} 
                                    onChange={(date: Date) => handlerChange('birthDate', date)} 
                                    customInput={customInput()}
                                    dateFormat="dd/MM/yyyy"
                                    locale={ru}
                                    placeholderText='ДД/ММ/ГГ'
                                    required
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
                                options={pessangerDocumentsType}
                                onChange={(data) => {
                                    setDocumentType(data as ISelectOption) 
                                    setDocument(initDocument)
                                }}
                                value={documentType}
                                styles={colourStyles}
                            />
                        </div>
                        {fieldsForDocuments()}
                    </div> 
                    <div className='form-button-wrapper'>
                        <button 
                            className='form-button'
                            onClick={formCheck}
                        >
                            Следующий пассажир
                        </button>
                    </div>
                </>
                : <></>}</>
            

        </div>
    )
}