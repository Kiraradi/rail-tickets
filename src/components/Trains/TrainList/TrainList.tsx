import { useAppSelector } from '../../../hook'
import TrainCard from './TrainCard/TrainCard';

import './TrainList.css'

export default function TrainList() {
  const directions = useAppSelector(state => state.directionsResponse.directionsResponse);
  
  if (!directions?.items) {
    return <div>Поездов нет</div>
  } 
  
  return (
    <div className='trainList-wrapper'>
      <div className='trainList-header'>
        <span className='totalTrains'>{`найдено ${directions.total_count}`}</span>
        <div className='trainList-filterBar-wrapper'>
          <span>сортировать по:</span>
          <span>показывать по:</span>
        </div>
      </div>
      {
        directions.items.map((train, i) => { 
          return <TrainCard direction={train} key={i} index={i}/>
        })
      }
    </div>
  )
}
