import React from 'react';
import './Header.scss';
import logo from './logo.jpg';
import logoSmall from './logo-small.jpg';
import config from '../../config';
import Tabs from '../Tabs/Tabs';
import 'typeface-montserrat';
import { useWindowWidth } from '../../hooks';


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
