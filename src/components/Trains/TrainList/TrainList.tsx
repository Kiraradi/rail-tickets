import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hook'
import TrainCard from './TrainCard/TrainCard';
import { stopLoading } from '../../../store/loadingSlice';
import ApiService from '../../../services/ApiService';
import { changeDirections } from '../../../store/directionsSlice';
import { useNavigate } from 'react-router-dom';

import './TrainList.css'

export default function TrainList() {
  const directionSearch = useAppSelector(state => state.directionSearch.directionSearch);
  const directions = useAppSelector(state => state.directions.directions);
  const dispatch = useAppDispatch();
  const navigator = useNavigate();

  async function getDirections() {
    if (directionSearch.from_city_id && directionSearch.to_city_id
      && directionSearch.date_start && directionSearch.date_end) {

      const data =  await ApiService.getDirections(directionSearch);
      dispatch(changeDirections(data));
      dispatch(stopLoading());      
    }
  }

  useEffect(() => {
    setTimeout(()=> {
      getDirections()
    }, 2000)
  }, [directionSearch]);

  useEffect(() => {
    if (directions.error) {
      dispatch(stopLoading());
      navigator('/');
    }
  }, [directions])

  if (!directions || !directions.items) {
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
