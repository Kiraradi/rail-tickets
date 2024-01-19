import React from 'react'
import { useAppSelector } from '../../../hook'
import TrainCard from './TrainCard/TrainCard';

export default function TrainList() {
  const directions = useAppSelector(state => state.directionsResponse.directionsResponse);
  
  if (!directions?.items) {
    return <div>нет</div>
  } 
  
  return (
    <div className='trainList'>
      {
        directions.items.map(train => { 
          return <TrainCard direction={train}/>
        })
      }
    </div>
  )
}
