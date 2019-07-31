import React, { useState, useEffect } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './About.css';


export default props => {
  const [ content, setContent ] = useState();

  useEffect(() => {
    console.log('fetching about');

    fetch('about.json')
      .then(response => response.json())
      .then(configJson => setContent(configJson.about.aboutContent))
    ;
  }, []);

  return (content) ? <div dangerouslySetInnerHTML={{__html: content}}></div> :
    <Loader type='Oval' className='about__loader' />;
}
