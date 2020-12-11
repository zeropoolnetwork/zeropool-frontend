import React from 'react';
import { cn } from '@bem-react/classname';

import './SeedTag.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { shuffleString } from 'shared/util/shuffle';

export const componentId = 'SeedTag';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface SeedTagProps {
  text: string;
  number: number;
  hidden?: boolean;
  hideNumber?: boolean;
  onClick?: (number: number) => void;
}

export const SeedTag: React.FC<SeedTagProps> = ({ text, number, hidden, hideNumber, onClick }) => {

  const clickHandler = () => onClick && !hidden ? onClick(number) : null;

  return (
    <div className={css({ Placeholder: hidden })} data-testid={test()} onClick={clickHandler}>
      { hidden || hideNumber ? null :
        <div className={css('Number')}>
          {number + 1}
        </div>
      }

      <div className={css('Text')}>
        {hidden ? shuffleString(text) : text}
      </div>
    </div>
  )
};