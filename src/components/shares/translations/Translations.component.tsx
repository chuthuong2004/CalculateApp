import React from 'react';
import {useTranslation} from 'react-i18next';

type Props = {
  text: string;
  options?: object;
};
const Translations: React.FC<Props> = ({text, options}) => {
  const {t} = useTranslation();
  return <>{t(text || '', options)}</>;
};

export default Translations;
