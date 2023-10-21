import React from 'react';
// import IconsSVG from './Icons.svg';


const Icon = ({ classN, id, size, iconsSvg }) => (
  <svg className={classN} width={size} height={size}>
    <use href={`${iconsSvg}${id}`} />
  </svg>
);



export default Icon;

