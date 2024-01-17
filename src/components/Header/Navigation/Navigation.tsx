import React from 'react'
import {Link } from "react-router-dom";

import './Navigation.css';

export default function Navigation() {

    const navigationList = ['О нас', 'Как это работает', 'Отзывы','Контакты',];
    return (
        <div className='navigation-wrapper'>
            <div className='logo'>Лого</div>
            <nav className='menu'>
                {
                    navigationList.map((item, i) => { 
                        return <Link className='menu__item' to='/' key={i}>{item}</Link>
                    })
                }
            </nav>
        </div>
    )
}
