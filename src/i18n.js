import { useTranslation } from 'react-i18next';

export const generateTranslatorFunction = (translator) => {
  // wrap i18next translate with our own function that searches
  // for the "trans:" prefix
  // this is so that we can refer to translation keys from other parts of the config file
  return (value) => {
    if (value.startsWith('trans:')) {
      return translator(value.split(':')[1]);
    }

    return value;
  };
};

export const useSpecialTranslation = () => {
  const { t } = useTranslation();

  return generateTranslatorFunction(t);
};
