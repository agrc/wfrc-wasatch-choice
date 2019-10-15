import React, { useState, useEffect } from 'react';
import './Header.scss';
import logo from './logo.jpg';
import logoSmall from './logo-small.jpg';
import config from '../../config';
import Tabs from '../Tabs/Tabs';
import 'typeface-montserrat';


// writing this as a custom hook just to learn about how to do it
// this could just be done within the component otherwise
const useWindowWidth = () => {
  const [ width, setWidth ] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return width;
};

export default props => {
  const windowWidth = useWindowWidth();

  return (
    <div className="app__header">
      <h4 className="header__heading">
        <span>{props.title}</span>
      </h4>
      <Tabs />
      <a href={config.links.landingPage} className="heading__img">
        <img src={(windowWidth >= config.MIN_DESKTOP_WIDTH) ? logo : logoSmall}
          alt="agrc logo" />
      </a>
    </div>
  );
}
