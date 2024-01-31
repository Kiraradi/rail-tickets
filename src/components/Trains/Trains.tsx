import { useEffect, useState } from 'react'
import { useAppSelector } from '../../hook'
import LoadingPage from './LoadingPage/loadingPage';
import ApiService from '../../services/ApiService';
import FilterMenu from './FilterMenu/FilterMenu';
import LastTickets from './LastTickets/LastTickets';
import Steps from './Steps/Steps';
import { changeDirections } from '../../store/directionsSlice';
import { useAppDispatch } from '../../hook';
import { Outlet } from 'react-router-dom';

import './Trains.css';

export default function Trains() {
  const dispatch = useAppDispatch()
  
  const [isLoadingPage, setLoadingPage] = useState(true);
  const directionSearch = useAppSelector(state => state.directionSearch.directionSearch);
  
  async function getDirections() {
    const data =  await ApiService.getDirections(directionSearch);
    dispatch(changeDirections(data));
  }

  useEffect(() => {
    setTimeout(()=> {
      getDirections()
      setLoadingPage(false)
    }, 2000)
    
  }, [directionSearch]);

  if (isLoadingPage) {
    return <LoadingPage/>;
  }

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
    </div>
  )
}
