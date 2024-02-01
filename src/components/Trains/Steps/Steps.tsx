import { useAppSelector } from '../../../hook';

import './Steps.css';

export default function Steps() {
  const currentStep = useAppSelector(state => state.step.step);
  
  const steps = [ 'Билеты', 'Пассажиры', 'Оплата', 'Проверка']

  return (
    <div className='steps-wrapper'>
      {
        steps.map((step, index) => {
          return <div className={`step-wrapper ${ index < currentStep ? 'previous' : '' }`}>
            <div className={`step ${ index <= currentStep ? 'selected' : '' }`}>
              <div className='step-text step-number'>{index + 1}</div>
              <div className='step-text'>{step}</div>  
            </div>
            <div className={`triangle-right ${ index <= currentStep ? 'selected' : '' }`}></div>
            { index === steps.length - 1 ? null : <img className='arrow-img' src="/images/vector.png" alt='icon'/>}
          </div>
          }
        )
      }
      </div>
  )
}
