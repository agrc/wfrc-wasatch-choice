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
          { !(process.env.NODE_ENV === 'production') && <a className="heading__version"
            href="https://github.com/agrc/wfrc/blob/master/CHANGELOG.md"
            target="_blank"
            rel="noopener noreferrer">
            {this.props.version}
          </a> }
        </h4>
        <Tabs />
        {window.innerWidth >= config.MIN_DESKTOP_WIDTH && <img src={logo} className="heading__img" alt="agrc logo" />}
      </div>
    )
  }
}
