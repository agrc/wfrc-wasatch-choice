import React from 'react';
import 'typeface-montserrat';
import config from '../../config';
import { useWindowWidth } from '../../hooks';
import { useSpecialTranslation } from '../../i18n';
import Tabs from '../Tabs/Tabs';
import './Header.scss';
import logoSmall from './logo-small.jpg';
import logo from './logo.png';

export default (props) => {
  const tabsContainer = React.useRef();
  const logoContainer = React.useRef();
  const t = useSpecialTranslation();
  const largeLogoWidth = 200;

  const windowWidth = useWindowWidth();
  const useLargeLogo = tabsContainer.current ? windowWidth - tabsContainer.current.offsetWidth >= largeLogoWidth : true;

  return (
    <div className="app__header">
      <h4 className="header__heading">
        <span>{t(props.title)}</span>
        {windowWidth >= 410 &&
          (config.links.tagLine.length > 0 ? (
            <a className="heading__tag-line" href={config.links.tagLine}>
              {t('trans:tagLine')}
            </a>
          ) : (
            <span className="heading__tag-line">{t('trans:tagLine')}</span>
          ))}
      </h4>
      <Tabs innerRef={tabsContainer} />
      <a href={config.links.landingPage} className="heading__img" ref={logoContainer}>
        <img
          src={useLargeLogo ? logo : logoSmall}
          className={useLargeLogo ? null : 'heading__img__small'}
          alt="agrc logo"
        />
      </a>
    </div>
  );
};
