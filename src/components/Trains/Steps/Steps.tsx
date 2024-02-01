import { useAppSelector } from '../../../hook';

import './Steps.css';

export default function Steps() {
  const step = useAppSelector(state => state.step.step);
  
  return (
    <div className='steps-wrapper'>{step}</div>
  )
}
