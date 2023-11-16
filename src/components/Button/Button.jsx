import React from 'react';
import './Button.scss';
import { useSelector } from 'react-redux';

const Button = ({ fn, text, classN }) => {

    const clientInfo =  useSelector(state => state.clientInfo)
    const products = useSelector(state => state.products)


    return (
        <button
            onClick={(e) => fn(e)}
            disabled={products.loading}
            className={clientInfo.mode==='AUTO' ?
                `button-control ${classN} main-font` :
                `button-control ${classN} main-font reverse-button`}
            type='button'>
            <div className='button-control-text'>{text}</div>
        </button>
    );
};

export default Button;