import React from 'react';
import { cn } from '@bem-react/classname';
import { useSelector } from 'react-redux';

import './loading-bar.component.scss';

import { showLoadingBar } from 'shared/loading-bar/state/loading-bar.selectors';

const css = cn('LoadingBar');

export const LoadingBar: React.FC = () => {
  const show = useSelector(showLoadingBar);

  return show ? (
    <>
      <div className={css()}></div>
      <div className={css('SpinnerContainer')}>
        <div className={css('Spinner')}></div>
      </div>
    </>
  ) : null;
};
