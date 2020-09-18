import React, { useState, useEffect, createRef } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './About.scss';
import { Modal, ModalBody } from 'reactstrap';
import { useCurrentTabConfig } from '../../config';
import { useTranslation } from 'react-i18next';


export default props => {
  const [ content, setContent ] = useState();
  const [ modalState, setModalState ] = useState({
    isOpen: false,
    content: null
  });
  const [ imagesHaveBeenProcessed, setImagesHaveBeenProcessed ] = useState(false);
  const currentTabConfig = useCurrentTabConfig();
  const { i18n } = useTranslation();

  const language = i18n.language.split('-')[0];

  const dialogitizeImages = parentNode => {
    console.log('adding dialogs to images');

    const getShowDialogFunctionForImage = image => {
      return () => {
        setModalState({
          isOpen: true,
          content: image
        });
      };
    };

    Array.from(parentNode.getElementsByTagName('img')).forEach(img => {
      img.addEventListener('click', getShowDialogFunctionForImage(img.src));
      img.style.cursor = 'pointer';
    });

    setImagesHaveBeenProcessed(true);
  };

  useEffect(() => {
    console.log('fetching about config json');

    fetch(`about-${language}.json?rel=${process.env.REACT_APP_VERSION}`)
      .then(response => response.json())
      .then(configJson => setContent(configJson))
    ;
  }, [language]);

  let containerRef = createRef();
  useEffect(() => {
    if (!imagesHaveBeenProcessed && containerRef.current) {
      dialogitizeImages(containerRef.current);
    }
  }, [imagesHaveBeenProcessed, containerRef]);

  const toggleModal = () => {
    setModalState({
      isOpen: !modalState.isOpen
    });
  };

  return (
    <>
      { (content) ? <div ref={containerRef} dangerouslySetInnerHTML={{__html: content[currentTabConfig.id]}}></div> :
        <Loader type='Oval' className='about__loader' /> }
      <a className="about__version"
        href="https://github.com/agrc/wfrc/blob/master/CHANGELOG.md"
        target="_blank"
        rel="noopener noreferrer">
        <small>
          App Version: {props.version}
        </small>
      </a>
      <Modal isOpen={modalState.isOpen} size='xl' toggle={toggleModal}>
        <ModalBody>
          <button onClick={toggleModal} className='close'>&times;</button>
          <img src={modalState.content} alt='' className='about__modal__image' />
        </ModalBody>
      </Modal>
    </>
  );
}
