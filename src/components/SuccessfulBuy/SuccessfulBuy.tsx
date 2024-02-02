
import { useNavigate } from 'react-router-dom';

import './SuccessfulBuy.css';
import { useAppDispatch, useAppSelector } from '../../hook';
import { initDirectionSearch } from '../../store/directionSearchSlice';
import { initDirections } from '../../store/directionsSlice';
import { cleanOrderForm } from '../../store/orderFormSlice';
import { useEffect } from 'react';

export default function SuccessfulBuy() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const step = useAppSelector(state => state.step.step);

    useEffect(() => {
        if (step !== 4) {
            goToMainPage();
        }
    }, [step]);

    const goToMainPage = () => {
        dispatch(initDirectionSearch());
        dispatch(initDirections());
        dispatch(cleanOrderForm());
        navigate('/');
    }

    return (
    <div className='SuccessfulBuy'>
        <div className='SuccessfulBuy-wrapper'>
            <h2 className="SuccessfulBuy-title">Благодарим Вас за заказ!</h2>
            <div className='SuccessfulBuy-mainInfo'>
                <div className='SuccessfulBuy-mainInfo-header'>
                    <h2 className='SuccessfulBuy-mainInfo-header-first'>№Заказа 285АА</h2>
                    <div className='SuccessfulBuy-mainInfo-header-sum'>
                        <h2 className='SuccessfulBuy-mainInfo-header-second'>сумма</h2>
                        <h2 className='SuccessfulBuy-mainInfo-header-first'>7 760</h2>
                        <img src='/images/rubles.png'/>
                    </div>
                </div>
                <div className='SuccessfulBuy-mainInfo-ticket-info'>
                    <div className='SuccessfulBuy-mainInfo-ticket-info-item'>
                        <img className='SuccessfulBuy-mainInfo-ticket-info-item-img' src='/images/tickets-on-email.png'/>
                        <span>билеты будут отправлены на ваш e-mail</span>
                    </div>
                    <div className='SuccessfulBuy-mainInfo-ticket-info-item'>
                        <img className='SuccessfulBuy-mainInfo-ticket-info-item-img' src='/images/print-tickets.png'/>
                        <span>распечатайте и сохраняйте билеты до даты поездки</span>
                    </div>
                    <div className='SuccessfulBuy-mainInfo-ticket-info-item'>
                        <img className='SuccessfulBuy-mainInfo-ticket-info-item-img' src='/images/show-tickets.png'/>
                        <span className='SuccessfulBuy-mainInfo-ticket-info-item-text'>предьявите распечатанные билеты при посадке</span>
                    </div>
                </div>
                <div className='SuccessfulBuy-mainInfo-ticket-body'>
                    <h2 className='SuccessfulBuy-mainInfo-ticket-body-title'>Ирина Эдуардовна!</h2>
                    <p className='SuccessfulBuy-mainInfo-ticket-body-text'>Ваш заказ успешно оформлен.</p>
                    <p className='SuccessfulBuy-mainInfo-ticket-body-text'>В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                    <p className='SuccessfulBuy-mainInfo-ticket-body-text SuccessfulBuy-text-strong'>Благодарим Вас за оказанное доверие и желаем приятного путешествия!</p>
                </div>
                <div className='SuccessfulBuy-mainInfo-footer'>
                    <div className='SuccessfulBuy-mainInfo-footer-grade'>
                        <p className='SuccessfulBuy-mainInfo-footer-text'>Оценить сервис</p>
                        <img src='/images/Star.png'/>
                        <img src='/images/Star.png'/>
                        <img src='/images/Star.png'/>
                        <img src='/images/Star.png'/>
                        <img src='/images/Star.png'/>
                    </div>
                    <button className='SuccessfulBuy-mainInfo-footer-button' onClick={() => goToMainPage()}>
                        ВЕРНУТЬСЯ НА ГЛАВНУЮ
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}