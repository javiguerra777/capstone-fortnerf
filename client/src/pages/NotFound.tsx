import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiLeftArrowCircle } from 'react-icons/bi';
import NotFoundWrapper from '../styles/NotFound';

function NotFound() {
  const navigate = useNavigate();
  const toPrevPage = () => {
    navigate(-1);
  };
  return (
    <NotFoundWrapper>
      <header>
        <h1>Error 404: Not Found</h1>
        <p>
          To return to previous page click:{' '}
          <button type="button" onClick={toPrevPage}>
            <BiLeftArrowCircle size={25} />
          </button>
        </p>
      </header>
    </NotFoundWrapper>
  );
}

export default NotFound;
