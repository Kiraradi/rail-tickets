import { IArrivalAndDeparture } from "../../../../interfaces/IDirectionsResponse";
import { useNavigate } from "react-router-dom";
import { TimeAndStationInfo } from "../../TrainList/TrainCard/TrainCard";
import { makeATimeLine } from "../../../../services/makeATimeLine";
import ApiService from "../../../../services/ApiService";
import { makeFirstLetterUppercase } from "../../../../services/makeFirstLetterUppercase";
import { useEffect, useState } from "react";
import ChoosingSeatInCarriage from "./ChoosingSeatInCarriage/ChoosingSeatInCarriage";

import './SeatsCard.css';
import { ISeatsRequest } from "../../../../interfaces/ISeatsRequest";
import { ISeat, ISeatsResponse } from "../../../../interfaces/ISeatsResponse";

export interface ISeatsCard {
    isDirectionForward: boolean
    trainInfo: IArrivalAndDeparture | undefined
}

export function SeatsCardMainInfo(info :IArrivalAndDeparture) {
    if (!info) {
        return <></>
    }

    return <div className="seatsCardMainInfo-wrapper">
        <img className="seatsCardMainInfo-icon" src="/images/seatsCardMainInfoIcon.png" alt="icon"/>
        <div className="seatsCardMainInfo-content-wrapper">
            <h2 className="seatsCardMainInfo-content-title">{ info.train?.name }</h2>
            <div className="seatsCardMainInfo-content">
                <p>
                        <>{makeFirstLetterUppercase(info.from?.city?.name)}</>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
                            <path d="M13.3536 4.35355C13.5488 4.15829 13.5488 3.84171 13.3536 3.64645L10.1716 0.464466C9.97631 0.269204 9.65973 0.269204 9.46447 0.464466C9.2692 0.659728 9.2692 0.976311 9.46447 1.17157L12.2929 4L9.46447 6.82843C9.2692 7.02369 9.2692 7.34027 9.46447 7.53553C9.65973 7.7308 9.97631 7.7308 10.1716 7.53553L13.3536 4.35355ZM0 4.5L13 4.5V3.5L0 3.5L0 4.5Z" fill="#292929"/>
                        </svg>
                    </p>
                <p>{makeFirstLetterUppercase(info.to?.city?.name)}</p>
            </div>
        </div>
    </div>

}

export function SeatsCardDirectionInfo(info :IArrivalAndDeparture | undefined, isDirectionForward: boolean) {
    if (!info) {
        return <></>
    }

    return <div className="seatsCardDirectionInfo-wrapper">
        <>{SeatsCardMainInfo(info)}</>
        <div className="seatsCardDirectionInfo">
            <>{TimeAndStationInfo(info.to)}</>
            <div className="seatsCardDirectionInfo-img-wrapper">
                <img className="seatsCardDirectionInfo-img" src={`/images/vector${isDirectionForward? 'to' : 'from'}.png`}/>
            </div>
            
            <>{TimeAndStationInfo(info.from)}</>
        </div>
        <div className="seatsCardDirectionTime-wrapper">
            <img className="seatsCardDirectionTime-icon" src="/images/seatsCardDirectionTime.png" alt="icon"/>
            <div className="seatsCardDirectionTime">
                <p className="seatsCardDirectionTime-hours">
                    {
                        `${Math.floor(Number(info.duration) / 3600)} ${makeATimeLine(Math.floor(Number(info.duration) / 3600),['час','часа','часов'])}`
                    }
                </p>
                <p className="seatsCardDirectionTime-minutes">
                    {
                        `${Math.floor(Number(info.duration) % 3600 / 60)} ${makeATimeLine(Math.floor(Number(info.duration) / 3600 /60),['минута','минуты','минут'])}`
                    }
                </p>
            </div>
        </div>
    </div>
}

export default function SeatsCard(props: ISeatsCard ) {
    const navigator = useNavigate();

    const carriageTypes = [
        { type:'fourth_class', text:'Сидячий' },
        { type:'third_class', text:'Плацкарт' },
        { type:'second_class', text: 'Купе' },
        { type:'first_class', text: 'Люкс' }
    ];

    

    const [selectedCarriageType, setSelectedCarriageType] = useState<string | null>(null);
    const [carriages, setCarriages] =useState([] as ISeatsResponse []);

    const getCarriages = async () => {
        if (props.trainInfo?._id) {
            const request: ISeatsRequest = {
                id: props.trainInfo?._id
            };

            const carriages = await ApiService.getCarriages(request);

            if (carriages) {
                setCarriages(carriages);
            }
        }
    }

    useEffect(()=> {
        getCarriages();
    },[])
    
    const carriagesType = () => {
        
        return <div  className="carriageTypes-wrapper">
            <h2 className="carriageTypes-title">Тип вагона</h2>
            <ul className="carriageTypeList">
                {
                    carriageTypes.map((type, i) => {
                        return <div className="carriageType" key={i} onClick={
                                    ()=>{setSelectedCarriageType(type.type)}
                                }>
                            <img className="carriageType-img" src={`/images/${selectedCarriageType === type.type ? 'selected_' : ''}carriageType_${type.type}.png`} alt="icon"/>
                            <p className={`carriageType-title ${selectedCarriageType === type.type ? 'carriageType-title-selected' : ''}`}>{type.text}</p>
                        </div>
                    })
                }
            </ul>
        </div>
    }
    

    const Carriages = () => {
        if (!carriages || !carriages.length || !selectedCarriageType) {
            return <></>;
        }

        const carriageType = selectedCarriageType === carriageTypes[0].type
            ? 'fourth'
            : selectedCarriageType === carriageTypes[1].type
                ? 'third'
                : selectedCarriageType === carriageTypes[2].type
                    ? 'second'
                    : 'first';

        const filteredCarriages = carriages.filter(c => c.coach.class_type === carriageType);

        if (!filteredCarriages.length) {
            return <></>;
        }

        return <ChoosingSeatInCarriage filteredCarriages={filteredCarriages} carriageType={carriageType}/>
    }

    if (!props?.trainInfo) {
        return <></>
    }
    

    return (
        <div className="SeatsCard">
            <div className={`seatsCard-header-button-wrapper ${props.isDirectionForward? 'seatsCard-header-button-wrapper-to': ''}`}>
                <img 
                    className='seatsCard-header-button-icon'
                    src={props.isDirectionForward? '/images/seatsCard-header-button-iconTo.png' : '/images/seatsCard-header-button-iconFrom.png'}
                    alt="seats Card header button icon"
                />
                <button 
                    onClick={()=> {navigator('/trains')}} 
                    className="seatsCard-header-button"
                >
                    Выбрать другой поезд
                </button>
            </div>
            
            {SeatsCardDirectionInfo(props.trainInfo, props.isDirectionForward)}
            {carriagesType()}
            {Carriages()}
        </div>
  )
}
