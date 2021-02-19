import { cn } from '@bem-react/classname';
import { Paper } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import './SeedPanel.scss';

import { testIdBuilder } from 'shared/helpers/test/test-id-builder.helper';
import { shuffleArray } from 'shared/util/shuffle';

import { SeedTag } from 'register/components/SeedTag/SeedTag';

export const componentId = 'SeedPanel';

const css = cn(componentId);
const test = testIdBuilder(componentId);

export interface SeedPanelProps {
  classes?: string[];
  seed: string[];
  check?: boolean;
  onCheck?: (checked: boolean) => void;
}

export const SeedPanel: React.FC<SeedPanelProps> = ({ classes = [], seed, check, onCheck }) => {
  const [confirmedSeed, setConfirmedSeed] = useState([] as string[]);
  const [success, setSuccess] = useState(false);
  const [shuffledSeed, setShuffledSeed] = useState([] as string[]);

  useEffect(() => {
    if (!shuffledSeed.length && check) {
      setShuffledSeed(shuffleArray([...seed]))
    }
  }, [shuffledSeed.length, check, seed]);

  useEffect(() => {
    const same = JSON.stringify(seed) === JSON.stringify(confirmedSeed)
    setSuccess(same);
    if (onCheck) {
      onCheck(same);
    }
  }, [success, confirmedSeed, seed, onCheck])

  const bodyTagClickHandler = (index: number) => {
    confirmedSeed.splice(index, 1);
    setConfirmedSeed([...confirmedSeed]);
    setSuccess(false);
  };
  const footerTagClickHandler = (index: number) => {
    setConfirmedSeed([...confirmedSeed, seed[index]]);
  };

  return (
    <Paper className={css('', classes)} data-testid={test()}>
      <div className={css('Body')} data-testid={test('Body')}>
        {check ?
          confirmedSeed.map((tag: string, index: number) => (
            <SeedTag text={tag} number={index} key={index} onClick={bodyTagClickHandler} />
          ))
          :
          seed.map((tag: string, index: number) => (
            <SeedTag text={tag} number={index} key={index} />
          ))
        }
      </div>

      <div className={css('Footer')} data-testid={test('Footer')}>
        {check ?
          shuffledSeed.map((tag: string, index: number) => (
            <SeedTag
              text={tag}
              number={seed.findIndex(str => str === tag)}
              hidden={confirmedSeed.includes(tag)}
              hideNumber
              key={seed.findIndex(str => str === tag)}
              onClick={footerTagClickHandler}
            />
          )) : null}
        {confirmedSeed.length === seed.length && !success ?
          <div className={css('Warning')} data-testid={test('Warning')}>
            The phrases do not match!
          </div>
          : null}
      </div>
    </Paper >
  )
};
