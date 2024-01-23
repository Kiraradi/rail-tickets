import { IDirectionsRequest } from '../../../../interfaces/IDirectionsRequest';

import './CheckboxFilter.css';

export interface ICheckboxFilter {
    checked: boolean | null | undefined
    imgURL: string
    title: string
    type: keyof IDirectionsRequest
    onChenge: (arg: keyof IDirectionsRequest) => void 
}

export default function CheckboxFilter(props: ICheckboxFilter) {

    return (
        <div className='checkboxFilter-wrapper'>
            <img className='checkboxFilter-icon' src={props.imgURL} alt={'checkboxFilter-icon'}/>
            <div className='checkboxFilter-title-wrapper'>
                <h2 className='checkboxFilter-title'>{props.title}</h2> 
            </div>
            <div className='checkboxFilter'>
                <input
                    checked = {Boolean(props.checked)}
                    onChange={()=> {props.onChenge(props.type)}}
                    className={`react-switch-checkbox`}
                    id={`react-switch-new_${props.type}`}
                    type="checkbox"
                />
                <label
                    className="react-switch-label"
                    htmlFor={`react-switch-new_${props.type}`}
                >
                    <span className={`react-switch-button`} />
                </label>
            </div>
        </div>
    )
}
