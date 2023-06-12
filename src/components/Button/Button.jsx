import React from 'react';
import './Button.scss';
import { useSelector } from 'react-redux';

const Button = ({ fn, value, text, classN}) => {

    const { activeStrategy } = useSelector(state => state);

    return (
        <button
            onClick={() => fn(value)}
            className={activeStrategy.strategy === 'automat' ?
                `button-control ${classN} main-font` :
                `button-control ${classN} main-font reverse-button`}
            type='button'>
            <span className='button-control-text'>{text}</span>
        </button>
    );
};

export default Button;