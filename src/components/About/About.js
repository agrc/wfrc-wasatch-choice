import React, { useState, useEffect, createRef } from 'react';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import './About.css';
import { Modal, ModalBody } from 'reactstrap';


export default props => {
  const [ content, setContent ] = useState();
  const [ modalState, setModalState ] = useState({
    isOpen: false,
    content: null
  });
  const [ imagesHaveBeenProcessed, setImagesHaveBeenProcessed ] = useState(false);

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

    fetch('about.json')
      .then(response => response.json())
      .then(configJson => setContent(configJson.about.aboutContent))
    ;
  }, []);

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
      { (content) ? <div ref={containerRef} dangerouslySetInnerHTML={{__html: content}}></div> :
        <Loader type='Oval' className='about__loader' /> }
      <Modal isOpen={modalState.isOpen} size='xl' toggle={toggleModal}>
        <ModalBody>
          <button onClick={toggleModal} className='close'>&times;</button>
          <img src={modalState.content} alt='' className='about__modal__image' />
        </ModalBody>
      </Modal>
    </>
  );
}
