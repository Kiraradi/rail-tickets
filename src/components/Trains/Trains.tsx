import { useAppSelector } from '../../hook'
import LoadingPage from './LoadingPage/loadingPage';
import FilterMenu from './FilterMenu/FilterMenu';
import LastTickets from './LastTickets/LastTickets';
import Steps from './Steps/Steps';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderMainInfo from './OrderMainInfo/OrderMainInfo';

import './Trains.css';

export default function Trains() {
  
  let location = useLocation();
  const [showFilterAndLastTickets, setShowFilterAndLastTickets ] = useState(true);

  useEffect(() => {
    const conditionToNotShowFilterAndLastTickets = location.pathname.includes('/passengers') 
      || location.pathname.includes('/payment')
      || location.pathname.includes('/checking');

    setShowFilterAndLastTickets(!conditionToNotShowFilterAndLastTickets);
  }, [location]);
    
  const loading = useAppSelector(state => state.loading.loading);

  return (
    <div className='trains'>
      <Steps/>
      <div className='trains-main'>
        <div className='trains-sidebar'>
          {
            showFilterAndLastTickets
              ? <>
                <FilterMenu/>
                <LastTickets/>
              </>
              : <OrderMainInfo></OrderMainInfo>
          }
        </div>
        
        <Outlet/>
      </div>  
      { loading ? <LoadingPage/> : null }    
    </div>
  )
}
