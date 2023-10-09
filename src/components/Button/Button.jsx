import React from 'react';
import './Button.scss';
import { useSelector } from 'react-redux';

const Button = ({ fn, value, text, classN }) => {

    const activeMode =  useSelector(state => state.activeMode)
    const products = useSelector(state => state.products)


    return (
        <button
            onClick={() => fn()}
            disabled={products.loading}
            className={activeMode.mode === 'automat' ?
                `button-control ${classN} main-font` :
                `button-control ${classN} main-font reverse-button`}
            type='button'>
            <div className='button-control-text'>{text}</div>
        </button>
    );
};

export default Button;