import React from 'react'

import './DescriptionWork.css';


export default function DescriptionWork() {
  return (
    <div className='descriptionWork'>
        <h2 className='descriptionWork-title'>Как это работает</h2>
        <button className='descriptionWork-button'>Узнать больше</button>
        <ul className='descriptionWork-list'>
            <li className='descriptionWork-item'>
                <img className='descriptionWork-item-img' src="/images/group-1.png" alt="icon" />
                <p className='descriptionWork-item-p'>Удобный заказ на сайте</p>
            </li>
            <li className='descriptionWork-item'>
                <img className='descriptionWork-item-img' src="/images/group-2.png" alt="icon" />
                <p className='descriptionWork-item-p'>Нет необходимости ехать в офис</p>
            </li>
            <li className='descriptionWork-item'>
                <img className='descriptionWork-item-img' src="/images/group-3.png" alt="icon" />
                <p className='descriptionWork-item-p'>Огромный выбор направлений</p>
            </li>
        </ul>
    </div>
  )
}