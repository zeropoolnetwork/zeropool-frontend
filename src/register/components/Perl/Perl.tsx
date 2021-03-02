import React from 'react';

import './Perl.scss';

export type PerlProps = {
  classes: string[]
  number: number
  isActive: boolean
}

export const Perl = (props: PerlProps) => {
  return(
    <div className={'Perl' + (props.isActive ? ' Perl_Active ' : ' ') + props.classes.join(' ')}>
      <div className="Perl-Number">
        {props.number}
      </div>
    </div>
  )
}
