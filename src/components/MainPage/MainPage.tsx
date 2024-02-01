import { useEffect } from 'react';
import DescriptionSite from './DescriptionSite/DescriptionSite';
import DescriptionWork from './DescriptionWork/DescriptionWork';
import { useAppDispatch } from '../../hook';
import { init } from '../../store/stepSlice';

import './MainPage.css';

export default function MainPage() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(init());
  });

  return (
    <div className='MainPag'>
      <DescriptionSite></DescriptionSite>
      <DescriptionWork></DescriptionWork>
    </div>
  )
}
