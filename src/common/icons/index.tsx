import React from 'react';
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
} from 'react-icons/bs';

function LeftArrow({ className = '' }) {
  return <BsArrowLeftSquareFill className={className} />;
}
export function RightArrow({ className = '' }) {
  return <BsArrowRightSquareFill className={className} />;
}
export default LeftArrow;
