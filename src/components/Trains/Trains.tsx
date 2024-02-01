import { useAppSelector } from '../../hook'
import LoadingPage from './LoadingPage/loadingPage';
import FilterMenu from './FilterMenu/FilterMenu';
import LastTickets from './LastTickets/LastTickets';
import Steps from './Steps/Steps';
import { Outlet } from 'react-router-dom';

import './Trains.css';

export default function Trains() {
  
  const loading = useAppSelector(state => state.loading.loading);

  return (
    <div className='trains'>
      <Steps/>
      <div className='trains-main'>
        <div className='trains-sidebar'>
          <FilterMenu/>
          <LastTickets/>
        </div>
        
        <Outlet/>
      </div>  
      { loading ? <LoadingPage/> : null }    
    </div>
  )
}
