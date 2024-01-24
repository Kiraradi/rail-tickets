import { useAppSelector } from '../../../hook'
import TrainCard from './TrainCard/TrainCard';

import './TrainList.css'

export default function TrainList() {
  const directions = useAppSelector(state => state.directionsResponse.directionsResponse);
  
  if (!directions?.items) {
    return <div>Поездов нет</div>
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
