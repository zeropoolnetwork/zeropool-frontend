import React from 'react';
import { cn } from '@bem-react/classname';

import './AboutPage.scss';

const css = cn('AboutPage');

interface AboutPageProps { }

export const AboutPage: React.FC<AboutPageProps> = () => {

  return (
    <div className={css()} data-testid="AboutPage">
      <h1> AboutPage </h1>
    </div>
  )
};