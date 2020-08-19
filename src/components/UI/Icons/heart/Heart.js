import React from 'react';
import { ReactComponent as HeartSelected } from '../../../../images/heart.svg';

//Style 
import './  Heart.scss';

const Heart = (props) => {
  return (
    <div className="Heart">
      <HeartSelected/>
    </div>
  )
}

export default Heart;