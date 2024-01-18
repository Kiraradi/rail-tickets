import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../hook'
import LoadingPage from './LoadingPage/loadingPage';
import ApiService from '../../services/ApiService';
import FilterMenu from './FilterMenu/FilterMenu';
import LastTickets from './LastTickets/LastTickets';
import Steps from './Steps/Steps';
import TrainList from './TrainList/TrainList';

import './Trains.css';

export default function Trains() {
  const state = useAppSelector(state => state.direction.direction);
  
  const [isLoadingPage, setLoadingPage] = useState(true);
  const direction = useAppSelector(state => state.direction.direction);
  async function getDirections() {
    const data =  await ApiService.getDirections(direction)
    console.log(data)
  }

  useEffect(() => {
    setTimeout(()=> {
      getDirections()
      setLoadingPage(false)
    }, 2000)
    
  }, [direction]);

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
        <TrainList/>
      </div>            
    </div>
  )
}
