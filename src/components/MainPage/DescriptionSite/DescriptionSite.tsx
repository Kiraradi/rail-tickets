import React from 'react'
import './DescriptionSite.css';

export default function DescriptionSite() {
  return (
    <div className='description-site' id='descriptionSite'>
        <h2 className='description-site-title'>о нас</h2>
        <div className='description-site-content-wrapper'>
            <p className='description-site-content'>Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы наблюдаем, как с каждым днем все больше людей заказывают жд билеты через интернет.</p>
            <p className='description-site-content'>Сегодня можно заказать железнодорожные билеты онлайн всего в 2 клика, но стоит ли это делать? Мы расскажем о преимуществах заказа через интернет.</p>
            <p className='description-site-content bold'>Покупать жд билеты дешево можно за 90 суток до отправления поезда. Благодаря динамическому ценообразованию цена на билеты в это время самая низкая.</p>
        </div>
    </div>
  )
}
