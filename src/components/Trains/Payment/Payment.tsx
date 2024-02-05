import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hook";
import { IUser, PaymentMethod } from "../../../interfaces/IOrderRequest";

import './Payment.css';
import { setUser } from "../../../store/orderFormSlice";

export interface IUserForm {
    first_name: string
    last_name: string
    patronymic: string
    phone: string
    email: string
    payByCash: boolean
}

export default function Payment() {

    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const dispatch = useAppDispatch();
    const [userForm, setUserForm] = useState<IUserForm | null>();
    
    useEffect(() => {
        if (!userForm) {
            setUserForm({
                first_name: orderForm.user?.first_name ?? '',
                last_name: orderForm.user?.last_name ?? '',
                patronymic: orderForm.user?.patronymic ?? '',
                phone: orderForm.user?.phone ?? '',
                email: orderForm.user?.email ?? '',
                payByCash: orderForm.user?.payment_method === PaymentMethod.cash
            });
        }
    }, [ orderForm ]);

    useEffect(() => {
        if (userForm) {
            const user: IUser = {
                first_name: userForm.first_name,
                last_name: userForm.last_name,
                patronymic: userForm.patronymic,
                phone: userForm.phone,
                email: userForm.email,
                payment_method: userForm.payByCash ? PaymentMethod.cash : PaymentMethod.online
            }
        
            dispatch(setUser(user));
        }
    }, [ userForm ])
    
    const handlerChange = (name: string, value: string | boolean) => {
        if (userForm) {
            setUserForm({...userForm, [name]: value});
        }
    };

    const UserInfoForm = () => {
        if (!userForm) {
            return <></>
        }

        return <div className="payment-form-wrapper">
            <div className='payment-form-header'>
                <h2 className='payment-form-header-title'>Персональные данные</h2>
            </div>
            <div className='payment-form-passenger-info'>
                <div className='payment-form-passenger-info-fullName'>
                    <div className='payment-form-passenger-info-input-wrapper'>
                        <label className='payment-form-passenger-info-input-label' htmlFor="lastname">Фамилия</label>
                        <input
                            className='payment-form-passenger-info-input'
                            type='text'
                            name='lastname'
                            value={userForm.last_name}
                            onChange={(e) => handlerChange('last_name', e.target.value)}
                        /> 
                    </div>
                    <div className='payment-form-passenger-info-input-wrapper'>
                        <label className='payment-form-passenger-info-input-label' htmlFor="name">Имя</label>
                        <input
                            className='payment-form-passenger-info-input'
                            type='text'
                            name='name'
                            value={userForm.first_name}
                            onChange={(e) => handlerChange('first_name', e.target.value)}
                        /> 
                    </div>
                    <div className='payment-form-passenger-info-input-wrapper'>
                        <label className='payment-form-passenger-info-input-label' htmlFor="patronymic">Отчество</label>
                        <input
                            className='payment-form-passenger-info-input'
                            type='text'
                            name='patronymic'
                            value={userForm.patronymic}
                            onChange={(e) => handlerChange('patronymic', e.target.value)}
                        /> 
                    </div>
                </div>
                <div className='payment-form-passenger-info-genderAndBirthDate'>
                    <div className='payment-form-passenger-info-input-wrapper'>
                        <label className='payment-form-passenger-info-input-label' htmlFor="patronymic">Контактный телефон</label>
                        <input
                            className='payment-form-passenger-info-input'
                            type='text'
                            name='patronymic'
                            value={userForm.phone}
                            onChange={(e) => handlerChange('phone', e.target.value)}
                        /> 
                    </div>
                </div> 
                <div className='payment-form-passenger-info-genderAndBirthDate'>
                <div className='payment-form-passenger-info-input-wrapper'>
                    <label className='payment-form-passenger-info-input-label' htmlFor="patronymic">E-mail</label>
                    <input
                        className='payment-form-passenger-info-input'
                        type='text'
                        name='patronymic'
                        value={userForm.email}
                        onChange={(e) => handlerChange('email', e.target.value)}
                    /> 
                </div>       
            </div>
            </div>
        </div>
    }

    const PaymentMethodForm = () => {
        if (!userForm) {
            return <></>
        }

        return <div className="payment-form-wrapper">
            <div className='payment-form-header'>
                <h2 className='payment-form-header-title'>Способ оплаты</h2>
            </div>
            <div className='payment-form-passenger-info'>
                <div className='payment-form-passenger-info-limitedMobility'>
                    {/*<input 
                        type="checkbox" 
                        className='payment-form-passenger-info-limitedMobility-checkbox'
                        checked={userForm.limitedMobility}
                        onChange={() => handlerChange('limitedMobility', !userForm.limitedMobility)}
                    />
    <span className='payment-form-passenger-info-limitedMobility-text'>ограниченная подвижность</span>*/}
                </div>         
            </div>
        </div>
    }

    return <div className="Payment">
        {UserInfoForm()}
        {PaymentMethodForm()}
    </div>
}