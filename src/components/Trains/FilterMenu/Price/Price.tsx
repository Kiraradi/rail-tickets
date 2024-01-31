import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import { useAppDispatch, useAppSelector} from '../../../../hook';
import { changeDirectionSearch } from '../../../../store/directionSearchSlice';
import { changeDirections } from '../../../../store/directionsSlice';
import ApiService from '../../../../services/ApiService';

import './Price.css';
import 'rc-slider/assets/index.css';

export interface IPrice { 
    price_from: number
    price_to: number
}
export default function Price() {
    const dispatch = useAppDispatch();
    const directionSearch = useAppSelector(state => state.directionSearch.directionSearch);

    const initPrise: IPrice = {
        price_from: directionSearch.price_from ? directionSearch.price_from : 0,
        price_to: directionSearch.price_to ? directionSearch.price_to : 10000
    };

    const [price, setPrice] = useState(initPrise);

    const changePrice = (data: number[] | number) => {
        let newPrice :IPrice;

        if (typeof(data) === 'number') {
            newPrice = {
                price_from: data,
                price_to: 10000
            }
        } else {
            newPrice = {
                price_from: data[0],
                price_to: data[1]
            }
        }
        
        setPrice(newPrice);
    }

    const getDirections = async() => {
        dispatch(changeDirectionSearch({...directionSearch, price_from: price.price_from, price_to: price.price_to}));
        const response = await ApiService.getDirections(directionSearch);
        dispatch(changeDirections(response));
    }

    useEffect(()=> {
        let timer: any
        if (price.price_from !== 0 || price.price_to !== 10000) {
            timer = setTimeout(()=> {
                getDirections();
            }, 1000)
        }

        return () => clearTimeout(timer);
    }, [price])

    return (
        <div className='price-wrapper'>
            <h2 className='price-title'>Стоимость</h2>
            <div className='slider-wrapper'>
                <div className='slider-titleBar'>
                    <span className='slider-title'>от</span>
                    <span className='slider-title'>до</span>
                </div>
                <Slider
                    trackStyle={{ backgroundColor: "#FFA800", height: 20, border: '1px solid #C4C4C4', borderRadius: '10px' }}
                    railStyle={{ backgroundColor: "#3E3C41", height: 20, border: '1px solid #C4C4C4',borderRadius: '10px' }}
                    handleStyle={{
                        height: 24,
                        width: 24,
                        top: '8px', 
                      }}
                    className='price-slider'
                    allowCross={false}
                    onChange={changePrice}
                    range={true}
                    pushable
                    value={[price.price_from, price.price_to]}
                    max={10000}
                />
                <div className='slider-bottomBar'>
                    <span className='slider-bottom'>{price.price_from}</span>
                    <span className='slider-bottom'>{price.price_to}</span>
                </div>
            </div>
            
        </div>
    )
}



