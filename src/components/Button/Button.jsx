import React from 'react';
import './Button.scss';
import { useSelector } from 'react-redux';

const Button = ({ fn, value, text, classN }) => {

    const { activeStrategy, products } = useSelector(state => state);

    return (
        <button
            onClick={() => fn(value)}
            disabled={products.loading}
            className={activeStrategy.strategy === 'automat' ?
                `button-control ${classN} main-font` :
                `button-control ${classN} main-font reverse-button`}
            type='button'>
            <div className='button-control-text'>{text}</div>
        </button>
    );
};

export default Button;