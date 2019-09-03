import React from 'react';
import Details from './Details';


export default props => {
  return (
    <div>
      { props.graphics.map((graphic, index) => <Details key={index} feature={graphic} />) }
    </div>
  );
};
