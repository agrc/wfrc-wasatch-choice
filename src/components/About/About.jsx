import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Oval } from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { useCurrentTabConfig } from '../../config';
import './About.scss';

export default ({ version, testTabId }) => {
  const [content, setContent] = useState();
  const currentTabConfig = useCurrentTabConfig();
  const currentTabId = currentTabConfig ? currentTabConfig.id : testTabId;
  const { i18n } = useTranslation();

  const language = i18n.language.split('-')[0];

  useEffect(() => {
    console.log('fetching about config json');

    fetch(`/about/${language}/${currentTabId}.html`)
      .then((response) => {
        if (response.ok) {
          return response.text();
        }

        const errorMessage = `Unable to find about content for tab: ${currentTabId}. Current locale: ${language}`;
        setContent(errorMessage);

        throw errorMessage;
      })
      .then((contentText) => {
        setContent(contentText);
      });
  }, [language, currentTabId]);

  return (
    <>
      {content ? (
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      ) : (
        <div className="about__loader">
          <Oval />
        </div>
      )}
      <a
        className="about__version"
        href="https://github.com/agrc/wfrc/blob/main/CHANGELOG.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        <small>App Version: {version}</small>
      </a>
    </>
  );
};
