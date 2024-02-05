import { useAppDispatch, useAppSelector } from "../../../hook";
import { IError, setErrors } from "../../../store/orderFormSlice";
import { goAhead } from "../../../store/stepSlice";
import Passenger from "./Passenger/Passenger";
import { IArrivalAndDepartureOrder } from "../../../interfaces/IOrderRequest";
import { useNavigate, useParams } from "react-router-dom";

import './Passengers.css';

export default function Passengers() {
    const orderForm = useAppSelector(state => state.orderForm.orderForm);
    const errors = useAppSelector(state => state.orderForm.errors);
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const { index } = useParams();

    const validateDirection = (direction: IArrivalAndDepartureOrder): IError[] => {
        let errors = [] as IError[];

        if (direction?.seats?.length) {
            errors = direction.seats.map((seat, index) => {
                const errors = [] as IError[];

                if (!seat.person_info?.birthday) {
                    errors.push({ index : index, message: 'Дата рождения обязательна для заполнения' })
                }
                else {
                    const now = new Date();
                    const birthday = new Date(seat.person_info.birthday);

                    if (birthday > now) {
                        errors.push({ index : index, message: 'Дата рождения не должна превышать текущую дату' })
                    }
                }

                if (!seat.person_info?.first_name) {
                    errors.push({ index : index, message: 'Имя обязательно для заполнения' })
                }

                if (!seat.person_info?.last_name) {
                    errors.push({ index : index, message: 'Фамилия обязательна для заполнения' })
                }

                if (!seat.person_info?.document_data) {
                    errors.push({ index : index, message: 'Данные о документе обязательны для заполнения' })
                }

                return errors;
            })
            .reduce((acc, currValue) => acc = acc.concat(currValue), []);
        }

        return errors;
    }

    const validate = () : boolean => {
        if (!orderForm) {
            return false;
        }

        let errors = [] as IError[];

        if (orderForm.arrival) {
            errors = errors.concat(validateDirection(orderForm.arrival));
        }

        if (errors.length) {
            dispatch(setErrors(errors));
        }
        
        return errors.length === 0;
    }

    if (!orderForm) {
        return <></>
    }

    return (
        <div className="passengers-form">
            {
                orderForm.arrival && orderForm.arrival.seats && orderForm.arrival.seats.length > 0
                    ? orderForm.arrival.seats.map((seat, index) => <Passenger index={index}></Passenger>)
                    : null
            }
            
            <div className="passengers-form-buttons-wrapper">
                <button
                    className={!errors.length ? "passengers-form-button" : "passengers-form-button-blocked"}
                    onClick={()=> {
                        if (validate()) {
                            dispatch(goAhead());
                            navigator(`/trains/${index}/payment`);
                        }
                    }}
                    >
                    Далее
                </button>     
            </div>
        </div>
    )
}
