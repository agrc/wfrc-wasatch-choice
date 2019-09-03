import React, { PureComponent } from 'react';
import './Header.scss';
import logo from './logo.jpg';
import config from '../../config';
import Tabs from '../Tabs/Tabs';

export default class Header extends PureComponent {
  render() {
    return (
      <div className="app__header">
        <h4 className="header__heading">
          <span>{this.props.title}</span>
        </h4>
        <Tabs />
        {window.innerWidth >= config.MIN_DESKTOP_WIDTH && <img src={logo} className="heading__img" alt="agrc logo" />}
      </div>
    )
  }
}
