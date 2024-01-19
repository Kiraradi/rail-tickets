import {useState} from 'react'

import './CheckboxFilter.css';

export interface ICheckboxFilter {
    imgURL: string
    title: string
    type: string
}

export default function CheckboxFilter(props: ICheckboxFilter) {

    const [checked, setChecked] = useState(false);

   function chengeCheckbox() {
      setChecked(!checked);
   }

    return (
        <div className='checkboxFilter-wrapper'>
            <img className='checkboxFilter-icon' src={props.imgURL} alt={'checkboxFilter-icon'}/>
            <h2 className='checkboxFilter-title'>{props.title}</h2>
            <div className='checkboxFilter'>
                <input
                    checked = {checked}
                    onChange={chengeCheckbox}
                    className="react-switch-checkbox"
                    id={`react-switch-new`}
                    type="checkbox"
                />
                <label
                    className="react-switch-label"
                    htmlFor={`react-switch-new`}
                >
                    <span className={`react-switch-button`} />
                </label>
            </div>
        </div>
    )
}
