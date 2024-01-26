import {useState, useEffect} from 'react'
import { Routes, Route, useLocation} from "react-router-dom";
import Navigation from './Navigation/Navigation';
import SearchTrainsForm from './SearchTrainsForm/SearchTrainsForm';

import './Header.css';

export default function Header() {
    let location = useLocation();
    const defaultClass = 'header-main';
    const [className, setClassName] = useState(defaultClass);

    useEffect(() => {
        if (location.pathname !== '/') {
            setClassName('header-trains');
        } else {
            setClassName(defaultClass)
        }
      }, [location]);

    return (
        <header className={`header ${className}`}>
            <>
                <Navigation></Navigation>
                <div className={`searchTrainsForm-${className}`}>
                    <Routes>
                        <Route path="/" element={<h1 className='header-title'>Вся жизнь - <p className='header-title-p'>путешествие!</p></h1>}/>
                    </Routes>
                    <SearchTrainsForm class={className}></SearchTrainsForm>
                </div>
                
            </>
        </header>
    )
}



