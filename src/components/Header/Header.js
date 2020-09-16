import React from 'react';
import './Header.scss';
import logo from './logo.jpg';
import logoSmall from './logo-small.jpg';
import config from '../../config';
import Tabs from '../Tabs/Tabs';
import 'typeface-montserrat';
import { useWindowWidth } from '../../hooks';
import { useSpecialTranslation } from '../../i18n';


export default props => {
  const t = useSpecialTranslation();

  const windowWidth = useWindowWidth();

  return (
    <div className="app__header">
      <h4 className="header__heading">
        <span>{t(props.title)}</span>
        { windowWidth >= 410 && ((config.links.tagLine.length > 0) ?
          <a className="heading__tag-line" href={config.links.tagLine}>{t('trans:tagLine')}</a> :
          <span className="heading__tag-line">{t('trans:tagLine')}</span>) }
      </h4>
      <Tabs />
      <a href={config.links.landingPage} className="heading__img">
        <img src={(windowWidth >= 1000) ? logo : logoSmall}
          alt="agrc logo" />
      </a>
    </div>
  );
}
